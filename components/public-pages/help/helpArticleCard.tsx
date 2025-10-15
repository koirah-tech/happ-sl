"use client";

import Link from "next/link";

import type { HelpArticleMeta } from "@/lib/helpArticles";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HelpArticleCardProps = {
  article: HelpArticleMeta;
  className?: string;
};

export default function HelpArticleCard({ article, className }: HelpArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/help/${article.slug}`}
      className={cn(
        "group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary",
        className
      )}
    >
      <div className="space-y-4">
        <Badge variant="secondary" className="w-fit bg-secondary/15 text-secondary dark:bg-accent/50 dark:text-accent-foreground">
          {article.category}
        </Badge>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground">{article.excerpt}</p>
        </div>
      </div>
      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Updated {formattedDate}
      </p>
    </Link>
  );
}
