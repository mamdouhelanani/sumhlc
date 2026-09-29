import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NewsCard } from "@/components/news/news-card";
import { formatDate } from "@/lib/format";
import { getPost, getPosts, renderMarkdown } from "@/lib/news";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { type: "article", publishedTime: post.date, images: post.image ? [post.image] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<"/news/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = getPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white">
          <Container className="max-w-4xl py-10 sm:py-14">
            <Link href="/news" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> All news
            </Link>
            <p className="mt-6 text-sm text-slate-muted">
              <span className="font-semibold text-warm-700">{post.category === "Perspectives" ? "Op-ed & perspectives" : "News"}</span> ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          </Container>
        </header>
        <Container className="max-w-4xl py-10 sm:py-14">
          {post.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-50">
              <Image src={post.image} alt={post.imageAlt ?? ""} fill loading="eager" fetchPriority="high" sizes="(min-width: 896px) 832px, 100vw" className="object-contain" />
            </div>
          )}
          {post.body ? (
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-brand-900 prose-a:text-brand-700 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
            />
          ) : (
            post.excerpt && <p className="text-lg">{post.excerpt}</p>
          )}
        </Container>
      </article>
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-border bg-sand-50 py-14">
          <Container>
            <h2 id="related-heading" className="mb-6 text-2xl font-bold">
              More {post.category === "Perspectives" ? "perspectives" : "news"}
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <NewsCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
