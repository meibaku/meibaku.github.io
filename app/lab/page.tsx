import Link from "next/link";
import LabScene from "@/components/3d/LabScene";
import { LAB_EXPERIMENTS } from "@/lib/lab";

export const metadata = {
  title: "Lab · meibaku",
};

export default function LabPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-8">
      <h1 className="font-display text-4xl text-violet">3D experiments</h1>
      <p className="mt-3 text-muted">A gallery of sketches, motion systems, and geometry studies.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {LAB_EXPERIMENTS.map((item) => (
          <Link
            key={item.slug}
            href={`/lab/${item.slug}`}
            className="lab-tilt rounded-xl border border-violet/20 bg-surface/80 p-4 transition-all duration-500 hover:border-violet/60 hover:shadow-[0_0_20px_#7F77DD44]"
          >
            <div className="h-48 overflow-hidden rounded-lg border border-violet/20">
              <LabScene />
            </div>
            <h2 className="mt-4 font-display text-xl text-violet">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
