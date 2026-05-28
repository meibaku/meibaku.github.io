"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/lab", label: "Lab" },
  { href: "/notes", label: "Notes" },
  { href: "/protocol", label: "Protocol" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        "ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-b border-violet/20 bg-void/55 backdrop-blur-[12px]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.24em] text-violet uppercase"
        >
          meibaku
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-violet"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
