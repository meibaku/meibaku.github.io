import type { GitHubRepo } from "@/lib/types";

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-violet/20 bg-surface/70 p-4 transition-all duration-500 hover:border-violet/60 hover:shadow-[0_0_20px_#7F77DD44]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-base text-violet">{repo.name}</h3>
        <span className="text-xs text-muted">★ {repo.stargazers_count}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{repo.description ?? "No description provided."}</p>
      {repo.language ? (
        <span className="mt-3 inline-block rounded-full border border-teal/40 px-2 py-1 text-[11px] text-teal">
          {repo.language}
        </span>
      ) : null}
    </a>
  );
}
