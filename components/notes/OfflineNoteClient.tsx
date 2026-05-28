"use client";

import { useEffect } from "react";

type Payload = {
  slug: string;
  title: string;
  content: string;
};

const DB_NAME = "meibaku-notes";
const STORE_NAME = "notes";

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME, { keyPath: "slug" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function persist(payload: Payload) {
  const db = await openDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(payload);
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export function OfflineNoteClient({ slug, title, content }: Payload) {
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recent-notes") ?? "[]") as string[];
    const next = [slug, ...recent.filter((item) => item !== slug)].slice(0, 20);
    localStorage.setItem("recent-notes", JSON.stringify(next));

    persist({ slug, title, content }).catch(() => {
      // IndexedDB may be unavailable in private contexts.
    });
  }, [slug, title, content]);

  return null;
}
