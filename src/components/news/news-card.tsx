import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import type { Post } from "@/lib/news";
import { formatDate } from "@/lib/format";

export function NewsCard({
  post,
  headingLevel: Heading = "h3",
  priority = false,
}: {
  post: Omit<Post, "body">;
  headingLevel?: "h2" | "h3";
  /** Load eagerly — for the first card when it is likely the largest element on screen. */
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-brand-300">
            <Newspaper className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-slate-muted">
          <span className="font-semibold text-warm-700">{post.category}</span> · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <Heading className="mt-2 font-sans text-lg leading-snug font-bold text-brand-900">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 hover:underline">
            {post.title}
          </Link>
        </Heading>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-slate-muted">{post.excerpt}</p>}
      </div>
    </article>
  );
}
