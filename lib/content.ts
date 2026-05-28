import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Note, NoteFrontmatter } from "@/lib/types";

const NOTES_PATH = path.join(process.cwd(), "content", "notes");
const PROTOCOL_PATH = path.join(process.cwd(), "content", "protocol", "protocol.mdx");

function parseNote(fileName: string): Note {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(NOTES_PATH, fileName);
  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);
  const frontmatter = data as NoteFrontmatter;

  return {
    slug,
    content,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text,
  };
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_PATH)) return [];

  return fs
    .readdirSync(NOTES_PATH)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parseNote)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): Note | null {
  const fullPath = path.join(NOTES_PATH, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return parseNote(`${slug}.mdx`);
}

export function getProtocolPost() {
  const source = fs.readFileSync(PROTOCOL_PATH, "utf-8");
  const { data, content } = matter(source);
  return {
    frontmatter: data as {
      title: string;
      subtitle: string;
      updated: string;
    },
    content,
  };
}
