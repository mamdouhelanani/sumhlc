import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { NewsList } from "@/components/news/news-list";
import { getPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, op-eds, legislative updates and press from the Substance Use and Mental Health Leadership Council of RI.",
};

export default function NewsPage() {
  // Bodies stay on the server; the list only needs card data.
  const posts = getPosts().map(({ body, ...summary }) => summary);
  return (
    <>
      <PageHeader
        eyebrow="News & Perspectives"
        title="News from SUMHLC"
        intro="Announcements, advocacy, awards and op-eds from Rhode Island's behavioral health network."
      />
      <Container className="py-12 sm:py-16">
        <NewsList posts={posts} />
      </Container>
    </>
  );
}
