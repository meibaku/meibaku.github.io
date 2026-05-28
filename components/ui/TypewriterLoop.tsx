"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = ["3D web", "local-first", "protocols", "motion"];

export function TypewriterLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden text-sm text-teal md:text-base">
      <AnimatePresence mode="wait">
        <motion.p
          key={items[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display tracking-wide"
        >
          {items[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
