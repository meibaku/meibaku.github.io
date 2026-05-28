import { MdxContent } from "@/components/mdx/MdxContent";
import { getProtocolPost } from "@/lib/content";

export const metadata = {
  title: "Protocol · meibaku",
};

export default function ProtocolPage() {
  const { frontmatter, content } = getProtocolPost();

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-16 md:px-8">
      <p className="text-sm text-muted">{frontmatter.updated}</p>
      <h1 className="mt-2 font-display text-4xl text-violet">{frontmatter.title}</h1>
      <p className="mt-4 text-zinc-300">{frontmatter.subtitle}</p>

      <div className="mt-8 rounded-xl border border-violet/20 bg-surface/60 p-6">
        <svg viewBox="0 0 820 260" className="w-full">
          <circle cx="100" cy="130" r="40" className="fill-none stroke-violet stroke-2" />
          <rect x="310" y="90" width="200" height="80" rx="16" className="fill-none stroke-teal stroke-2" />
          <circle cx="720" cy="130" r="40" className="fill-none stroke-violet stroke-2" />
          <path d="M140 130 H310" className="protocol-path stroke-violet stroke-2" />
          <path d="M510 130 H680" className="protocol-path stroke-teal stroke-2" />
          <text x="100" y="136" textAnchor="middle" className="fill-zinc-300 text-xs">Node</text>
          <text x="410" y="136" textAnchor="middle" className="fill-zinc-300 text-xs">Token Layer</text>
          <text x="720" y="136" textAnchor="middle" className="fill-zinc-300 text-xs">Communication</text>
        </svg>
      </div>

      <div className="mt-8">
        <MdxContent source={content} />
      </div>
    </main>
  );
}
