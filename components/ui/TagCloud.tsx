"use client";

const tags = [
  "Three.js",
  "R3F",
  "GSAP",
  "Framer Motion",
  "Next.js",
  "SQLite WASM",
  "CRDTs",
  "TypeScript",
  "FIDO2",
  "DIDs",
  "MDX",
  "Tailwind",
];

export function TagCloud() {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span
          key={tag}
          style={{
            animationDuration: `${4 + (index % 6)}s`,
            animationDelay: `${(index % 5) * 0.2}s`,
          }}
          className="tag-float rounded-full border border-teal/40 bg-surface px-3 py-1 text-xs tracking-wide text-teal"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
