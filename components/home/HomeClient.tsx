"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TagCloud } from "@/components/ui/TagCloud";
import { TypewriterLoop } from "@/components/ui/TypewriterLoop";
import { Reveal } from "@/components/ui/Reveal";
import { ContribHeatmap } from "@/components/github/ContribHeatmap";
import { RepoCard } from "@/components/github/RepoCard";
import type { Note, GitHubCommit, GitHubRepo, HeatmapCell } from "@/lib/types";
import type { LabExperiment } from "@/lib/lab";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });
const LabScene = dynamic(() => import("@/components/3d/LabScene"), { ssr: false });

type Props = {
  notes: Note[];
  labs: LabExperiment[];
  heatmap: HeatmapCell[];
  repos: GitHubRepo[];
  commits: GitHubCommit[];
  commitCount: number;
  currentStreak: number;
};

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HomeClient({
  notes,
  labs,
  heatmap,
  repos,
  commits,
  commitCount,
  currentStreak,
}: Props) {
  const labTrackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasMotion = !prefersReducedMotion;

  useEffect(() => {
    if (!hasMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const track = labTrackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    cards.forEach((card) => {
      gsap.to(card, {
        y: -10,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [hasMotion]);

  return (
    <main className="px-4 pt-20 pb-16 md:px-8">
      <section className="relative isolate flex min-h-[92vh] items-center">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <HeroScene />
        </div>

        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: hasMotion ? 0.15 : 0 }} className="mx-auto w-full max-w-6xl">
          <motion.p variants={heroVariants} transition={{ duration: 0.65 }} className="font-display text-[clamp(3rem,12vw,8rem)] leading-none text-violet">
            meibaku
          </motion.p>
          <motion.p variants={heroVariants} transition={{ duration: 0.65 }} className="mt-2 text-sm text-muted md:text-base">
            Patrick · Dar es Salaam
          </motion.p>
          <motion.div variants={heroVariants} transition={{ duration: 0.65 }} className="mt-4">
            <TypewriterLoop />
          </motion.div>
        </motion.div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-violet ${hasMotion ? "animate-bounce" : ""}`}>↓</div>
      </section>

      <Reveal className="mx-auto mt-24 grid max-w-6xl gap-8 md:grid-cols-2" >
        <div>
          <h2 className="font-display text-2xl text-violet">About</h2>
          <p className="mt-4 text-zinc-300">
            I build at the edge of screen and space — interactive 3D, motion-driven interfaces, and apps that work
            without a server. I think in protocols. I believe identity should be sovereign and software should feel
            alive.
          </p>
        </div>
        <TagCloud />
      </Reveal>

      <Reveal className="mx-auto mt-24 max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl text-violet">3D Lab</h2>
          <Link href="/lab" className="text-sm text-teal hover:text-violet">
            view all →
          </Link>
        </div>
        <div ref={labTrackRef} className="grid gap-4 md:grid-cols-2">
          {labs.slice(0, 4).map((lab) => (
            <article
              key={lab.slug}
              className="lab-tilt rounded-xl border border-violet/20 bg-surface/80 p-4 transition-all duration-500 hover:border-violet/60 hover:shadow-[0_0_20px_#7F77DD44]"
            >
              <div className="h-40 overflow-hidden rounded-lg border border-violet/20 bg-void/80">
                <LabScene />
              </div>
              <h3 className="mt-4 font-display text-lg text-violet">{lab.title}</h3>
              <p className="mt-2 text-sm text-muted">{lab.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lab.tech.map((item) => (
                  <span key={item} className="rounded-full border border-teal/40 px-2 py-1 text-[11px] text-teal">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-24 max-w-6xl rounded-xl border border-violet/20 bg-surface/60 p-6">
        <h2 className="font-display text-2xl text-violet">Identity Protocol</h2>
        <div className="mt-6">
          <svg viewBox="0 0 800 220" className="w-full">
            <circle cx="90" cy="110" r="36" className="fill-none stroke-violet stroke-2" />
            <rect x="300" y="75" width="200" height="70" rx="14" className="fill-none stroke-teal stroke-2" />
            <circle cx="700" cy="110" r="36" className="fill-none stroke-violet stroke-2" />
            <path d="M126 110 H300" className="protocol-path stroke-violet stroke-2" />
            <path d="M500 110 H664" className="protocol-path stroke-teal stroke-2" />
            <text x="90" y="116" textAnchor="middle" className="fill-zinc-300 text-xs">Node</text>
            <text x="400" y="116" textAnchor="middle" className="fill-zinc-300 text-xs">Token Layer</text>
            <text x="700" y="116" textAnchor="middle" className="fill-zinc-300 text-xs">Communication</text>
          </svg>
        </div>
        <p className="mt-4 max-w-3xl text-zinc-300">
          A decentralized identity and communication design that replaces phone numbers with scoped, revocable tokens
          backed by FIDO2, eSIM anchoring, and W3C DIDs.
        </p>
        <Link href="/protocol" className="mt-4 inline-block text-sm text-teal hover:text-violet">
          open protocol write-up →
        </Link>
      </Reveal>

      <Reveal className="mx-auto mt-24 max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl text-violet">Blog / Notes</h2>
          <Link href="/notes" className="text-sm text-teal hover:text-violet">
            all notes →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {notes.slice(0, 3).map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="rounded-xl border border-violet/20 bg-surface/70 p-4 transition-all hover:border-violet/60 hover:shadow-[0_0_20px_#7F77DD44]"
            >
              <p className="text-xs text-muted">{note.date}</p>
              <h3 className="mt-2 font-display text-lg text-violet">{note.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{note.excerpt}</p>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-24 max-w-6xl">
        <h2 className="font-display text-2xl text-violet">GitHub Activity</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-violet/20 bg-surface/70 p-4">
            <p className="text-xs text-muted">Recent commit count</p>
            <p className="mt-1 font-display text-3xl text-violet">{commitCount}</p>
          </div>
          <div className="rounded-xl border border-violet/20 bg-surface/70 p-4">
            <p className="text-xs text-muted">Current streak</p>
            <p className="mt-1 font-display text-3xl text-violet">{currentStreak} days</p>
          </div>
          <div className="rounded-xl border border-violet/20 bg-surface/70 p-4">
            <p className="text-xs text-muted">Data source</p>
            <p className="mt-1 text-sm text-zinc-300">GitHub REST API at build time</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-violet/20 bg-surface/70 p-4">
          <ContribHeatmap cells={heatmap} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-violet/20 bg-surface/70 p-4">
          <h3 className="font-display text-lg text-violet">Recent commits</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {commits.map((commit) => (
              <li key={commit.sha} className="text-zinc-300">
                <a href={commit.html_url} target="_blank" rel="noreferrer" className="hover:text-violet">
                  {commit.repository?.name ?? "repo"} · {commit.commit.message.split("\n")[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <footer className="mx-auto mt-28 max-w-6xl border-t border-violet/20 pt-8 text-sm text-muted">
        <p>@meibaku · Dar es Salaam</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <a href="https://meibaku.github.io" target="_blank" rel="noreferrer" className="hover:text-violet">
            site
          </a>
          <a href="mailto:hello@meibaku.dev" className="hover:text-violet">
            email
          </a>
        </div>
        <p className="mt-3">rendered in the browser · works offline · ships on principle</p>
      </footer>
    </main>
  );
}
