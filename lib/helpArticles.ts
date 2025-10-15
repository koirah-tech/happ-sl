import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const HELP_DIR = path.join(process.cwd(), "content/help-articles");

export type HelpArticleMeta = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
};

export type HelpArticle = HelpArticleMeta & {
  contentHtml: string;
};

async function readArticleFile(slug: string) {
  const filePath = path.join(HELP_DIR, `${slug}.md`);
  const file = await fs.readFile(filePath, "utf8");
  return file;
}

function sortByDateDescending(items: HelpArticleMeta[]) {
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllHelpArticles(): Promise<HelpArticleMeta[]> {
  const fileNames = await fs.readdir(HELP_DIR);
  const articles: HelpArticleMeta[] = [];

  await Promise.all(
    fileNames.map(async (fileName) => {
      if (!fileName.endsWith(".md")) return;
      const slug = fileName.replace(/\.md$/, "");
      const fileContents = await readArticleFile(slug);
      const { data } = matter(fileContents);

      if (
        typeof data.title !== "string" ||
        typeof data.category !== "string" ||
        typeof data.excerpt !== "string" ||
        typeof data.date !== "string"
      ) {
        throw new Error(`Help article ${fileName} is missing required frontmatter.`);
      }

      articles.push({
        slug,
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        date: data.date,
      });
    })
  );

  return sortByDateDescending(articles);
}

export async function getHelpArticle(slug: string): Promise<HelpArticle> {
  const fileContents = await readArticleFile(slug);
  const { data, content } = matter(fileContents);

  if (
    typeof data.title !== "string" ||
    typeof data.category !== "string" ||
    typeof data.excerpt !== "string" ||
    typeof data.date !== "string"
  ) {
    throw new Error(`Help article ${slug} is missing required frontmatter.`);
  }

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    date: data.date,
    contentHtml,
  };
}

export async function getHelpArticleSlugs(): Promise<string[]> {
  const fileNames = await fs.readdir(HELP_DIR);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getRelatedHelpArticles(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<HelpArticleMeta[]> {
  const all = await getAllHelpArticles();
  return all.filter((article) => article.category === category && article.slug !== currentSlug).slice(0, limit);
}
