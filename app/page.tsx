import { HomeClient } from "@/components/home/HomeClient";
import { getAllNotes } from "@/lib/content";
import { getGitHubSnapshot } from "@/lib/github";
import { LAB_EXPERIMENTS } from "@/lib/lab";

export default async function Home() {
  const notes = getAllNotes();
  const github = await getGitHubSnapshot();

  return (
    <HomeClient
      notes={notes}
      labs={LAB_EXPERIMENTS}
      heatmap={github.heatmap}
      repos={github.pinnedRepos}
      commits={github.recentCommits}
      commitCount={github.commitCount}
      currentStreak={github.currentStreak}
    />
  );
}
