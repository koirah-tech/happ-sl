import HelpListing from "@/components/public-pages/help/helpListing";
import { getAllHelpArticles } from "@/lib/helpArticles";

export const revalidate = false;

export default async function HelpPage() {
  const articles = await getAllHelpArticles();

  return (
    <main className="relative flex min-h-[70vh] items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-muted/30" aria-hidden />
      <div className="relative z-10 w-full">
        <HelpListing articles={articles} />
      </div>
    </main>
  );
}
