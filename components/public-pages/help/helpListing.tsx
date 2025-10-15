"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HelpArticleCard from "./helpArticleCard";
import type { HelpArticleMeta } from "@/lib/helpArticles";

const ARTICLES_PER_PAGE = 6;

type HelpListingProps = {
  articles: HelpArticleMeta[];
};

export default function HelpListing({ articles }: HelpListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    articles.forEach((article) => unique.add(article.category));
    return ["All", ...Array.from(unique)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        article.title.toLowerCase().includes(normalizedSearch) ||
        article.excerpt.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const visibleArticles = filteredArticles.slice(start, start + ARTICLES_PER_PAGE);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <header className="space-y-6 text-center">
        <h1 className="h2-bold font-bold text-secondary md:h1-bold dark:text-stone-100">
          How Can We Help You?
        </h1>
        <div className="mx-auto max-w-2xl">
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search articles by title or keywords..."
            className="h-12 rounded-full border-secondary/40 px-6 focus-visible:ring-secondary"
            aria-label="Search help articles"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Button
                key={category}
                type="button"
                variant={isActive ? "default" : "outline"}
                className={isActive ? "bg-secondary hover:bg-secondary/90 dark:bg-primary" : ""}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleArticles.map((article) => (
          <HelpArticleCard key={article.slug} article={article} />
        ))}
        {visibleArticles.length === 0 && (
          <p className="col-span-full rounded-2xl border border-border bg-muted/40 p-10 text-center text-muted-foreground">
            No articles found. Try adjusting your search or selecting a different category.
          </p>
        )}
      </div>

      {filteredArticles.length > ARTICLES_PER_PAGE && (
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Help article pagination"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrent = pageNumber === page;
            return (
              <Button
                key={pageNumber}
                type="button"
                size="sm"
                variant={isCurrent ? "default" : "outline"}
                className={isCurrent ? "bg-secondary hover:bg-secondary/90" : ""}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goToPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </nav>
      )}
    </section>
  );
}
