import Link from "next/link";
import { notFound } from "next/navigation";

import HelpArticleCard from "@/components/public-pages/help/helpArticleCard";
import {
  getHelpArticle,
  getHelpArticleSlugs,
  getRelatedHelpArticles,
} from "@/lib/helpArticles";

export const revalidate = false;

type HelpArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getHelpArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params;

  try {
    const article = await getHelpArticle(slug);
    const related = await getRelatedHelpArticles(article.category, article.slug, 3);
    const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <main className="min-h-[70vh] bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl space-y-8 p-8 ">
          <Link
            href="/help"
            className="inline-flex items-center text-sm font-medium text-secondary underline decoration-dotted underline-offset-4 hover:text-secondary/80 dark:bg-accent/50 dark:text-accent-foreground"
          >
            ← Back to Help Center
          </Link>

          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary dark:bg-accent/50 dark:text-accent-foreground">
              {article.category}
            </span>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">{article.title}</h1>
            <p className="text-sm text-muted-foreground">Updated {formattedDate}</p>
          </div>

          <div
            className="help-article-content"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-5xl space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <HelpArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
