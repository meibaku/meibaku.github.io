import type { GitHubCommit, GitHubRepo, HeatmapCell } from "@/lib/types";

const GITHUB_USER = "meibaku";
const API_BASE = "https://api.github.com";
const token = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

type PushEvent = {
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
};

async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function getRecentDateMap(days: number) {
  const now = new Date();
  const map = new Map<string, number>();
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    map.set(date.toISOString().slice(0, 10), 0);
  }
  return map;
}

function computeStreak(cells: HeatmapCell[]) {
  let currentStreak = 0;
  let longestStreak = 0;

  for (const cell of cells) {
    if (cell.count > 0) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

export async function getGitHubSnapshot() {
  const [repos, events] = await Promise.all([
    fetchJson<GitHubRepo[]>(
      `${API_BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      [],
    ),
    fetchJson<PushEvent[]>(
      `${API_BASE}/users/${GITHUB_USER}/events/public?per_page=100`,
      [],
    ),
  ]);

  const contributionMap = getRecentDateMap(140);
  const commits: GitHubCommit[] = [];

  for (const event of events) {
    if (!event.payload.commits?.length) continue;
    const eventDate = new Date(event.created_at).toISOString().slice(0, 10);
    if (contributionMap.has(eventDate)) {
      contributionMap.set(
        eventDate,
        (contributionMap.get(eventDate) ?? 0) + event.payload.commits.length,
      );
    }

    for (const commit of event.payload.commits) {
      commits.push({
        sha: commit.sha,
        html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        commit: {
          message: commit.message,
          author: { date: event.created_at },
        },
        repository: { name: event.repo.name },
      });
    }
  }

  const heatmap = Array.from(contributionMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  const nonForkRepos = repos.filter((repo) => !repo.fork);
  const pinnedRepos = [...nonForkRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const recentCommits = commits
    .sort((a, b) => (a.commit.author.date < b.commit.author.date ? 1 : -1))
    .slice(0, 5);

  const commitCount = heatmap.reduce((sum, cell) => sum + cell.count, 0);
  const streak = computeStreak(heatmap);

  return {
    username: GITHUB_USER,
    heatmap,
    pinnedRepos,
    recentCommits,
    commitCount,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
  };
}
