import articlesLocal from "@/shared/data/articles.json";
import sectionsLocal from "@/shared/data/sections.json";

const isLocal = process.env.NEXT_PUBLIC_STATIC_BACKEND === "true";

type DataType = "articles" | "sections" | "all";

export default async function getData(type: DataType = "all") {
  console.log(`[getData] called with type="${type}" | isLocal=${isLocal}`);

  if (isLocal) {
    if (type === "articles") return articlesLocal;
    if (type === "sections") return sectionsLocal;
    if (type === "all") {
      return {
        articles: articlesLocal,
        sections: sectionsLocal,
      };
    }
    throw new Error(`Unknown type: ${type}`);
  }

  // Серверный режим (fetch)
  const base = "http://localhost:3000";

  if (type === "articles") {
    return fetch(`${base}/articles`).then(r => r.json());
  }
  if (type === "sections") {
    return fetch(`${base}/sections`).then(r => r.json());
  }
  if (type === "all") {
    const [articles, sections] = await Promise.all([
      fetch(`${base}/articles`).then(r => r.json()),
      fetch(`${base}/sections`).then(r => r.json()),
    ]);
    return { articles, sections };
  }

  throw new Error(`Unknown type: ${type}`);
}