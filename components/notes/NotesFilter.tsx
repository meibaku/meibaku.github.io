"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Note } from "@/lib/types";

export function NotesFilter({ notes }: { notes: Note[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const tags = useMemo(
    () => ["All", ...new Set(notes.flatMap((note) => note.tags).sort((a, b) => a.localeCompare(b)))],
    [notes],
  );

  const filtered = useMemo(() => {
    if (activeTag === "All") return notes;
    return notes.filter((note) => note.tags.includes(activeTag));
  }, [activeTag, notes]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              tag === activeTag
                ? "border-violet bg-violet/10 text-violet"
                : "border-violet/20 bg-surface text-muted hover:border-violet/40 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="rounded-xl border border-violet/20 bg-surface/70 p-5 transition-all hover:border-violet/60 hover:shadow-[0_0_20px_#7F77DD44]"
          >
            <p className="text-xs text-muted">{note.date}</p>
            <h3 className="mt-2 font-display text-xl text-violet">{note.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{note.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-teal/40 px-2 py-1 text-[11px] text-teal">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
