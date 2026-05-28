import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl text-violet">404</p>
      <h1 className="mt-4 font-display text-2xl text-white">Signal not found</h1>
      <p className="mt-2 text-muted">The path does not exist in this space.</p>
      <Link href="/" className="mt-6 text-teal hover:text-violet">
        return home →
      </Link>
    </main>
  );
}
