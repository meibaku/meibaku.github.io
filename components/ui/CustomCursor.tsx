"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x - 4}px, ${current.current.y - 4}px, 0)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-2 w-2 rounded-full bg-violet shadow-[0_0_14px_#7F77DDCC] md:block"
    />
  );
}
