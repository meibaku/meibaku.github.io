import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { OfflineNoteClient } from "@/components/notes/OfflineNoteClient";
import { getAllNotes, getNoteBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 md:px-8">
      <p className="text-sm text-muted">{note.date}</p>
      <h1 className="mt-2 font-display text-4xl text-violet">{note.title}</h1>
      <p className="mt-2 text-sm text-muted">{note.readingTime}</p>
      <div className="mt-8">
        <MdxContent source={note.content} />
      </div>
      <OfflineNoteClient slug={note.slug} title={note.title} content={note.content} />
    </main>
  );
}
