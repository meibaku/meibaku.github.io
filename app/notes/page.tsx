import { NotesFilter } from "@/components/notes/NotesFilter";
import { getAllNotes } from "@/lib/content";

export const metadata = {
  title: "Notes · meibaku",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-8">
      <h1 className="font-display text-4xl text-violet">Notes</h1>
      <p className="mt-3 text-muted">MDX posts cached for offline reading.</p>
      <section className="mt-8">
        <NotesFilter notes={notes} />
      </section>
    </main>
  );
}
