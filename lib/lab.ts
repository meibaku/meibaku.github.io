export type LabExperiment = {
  slug: string;
  title: string;
  tech: string[];
  summary: string;
  href: string;
};

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    slug: "violet-core",
    title: "Violet Core",
    tech: ["R3F", "Postprocessing", "TypeScript"],
    summary: "Wireframe geometry study with soft bloom and orbital drift.",
    href: "https://github.com/meibaku",
  },
  {
    slug: "teal-drift",
    title: "Teal Drift",
    tech: ["Three.js", "GSAP", "Shaders"],
    summary: "Motion sequencing experiment for subtle, immersive depth.",
    href: "https://github.com/meibaku",
  },
  {
    slug: "token-atlas",
    title: "Token Atlas",
    tech: ["DIDs", "Protocol Design", "Viz"],
    summary: "Graph surface concept for scoped and revocable identity tokens.",
    href: "https://github.com/meibaku",
  },
  {
    slug: "offline-echo",
    title: "Offline Echo",
    tech: ["IndexedDB", "CRDTs", "Local-first"],
    summary: "Data sync prototype where notes survive complete disconnection.",
    href: "https://github.com/meibaku",
  },
];

export function getLabBySlug(slug: string) {
  return LAB_EXPERIMENTS.find((item) => item.slug === slug) ?? null;
}
