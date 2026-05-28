import { notFound } from "next/navigation";
import LabScene from "@/components/3d/LabScene";
import { LAB_EXPERIMENTS, getLabBySlug } from "@/lib/lab";

export async function generateStaticParams() {
  return LAB_EXPERIMENTS.map((item) => ({ slug: item.slug }));
}

export default async function LabSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  if (!lab) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-8">
      <h1 className="font-display text-4xl text-violet">{lab.title}</h1>
      <p className="mt-3 text-muted">{lab.summary}</p>
      <div className="mt-6 h-[60vh] overflow-hidden rounded-xl border border-violet/30 bg-void">
        <LabScene />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {lab.tech.map((item) => (
          <span key={item} className="rounded-full border border-teal/40 px-3 py-1 text-xs text-teal">
            {item}
          </span>
        ))}
      </div>
      <a href={lab.href} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm text-teal hover:text-violet">
        open source reference →
      </a>
    </main>
  );
}
