export type NoteFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Note = NoteFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

export type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  repository?: {
    name: string;
  };
};

export type HeatmapCell = {
  date: string;
  count: number;
};
