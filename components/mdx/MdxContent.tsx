import { MDXRemote } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 font-display text-3xl text-violet md:text-4xl" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 font-display text-2xl text-violet md:text-3xl" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-8 text-zinc-300" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300" {...props} />,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-teal underline decoration-teal/40 underline-offset-4" target="_blank" rel="noreferrer" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
