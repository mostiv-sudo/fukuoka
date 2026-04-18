"use client"

import { useEffect, useMemo, useState } from "react"
import getData from "@/lib/dataLocalOrServer"
import Link from "next/link"
import clsx from "clsx"
import { Search, X } from "lucide-react";


interface SearchItem {
  title: string
  description?: string
  href: string
  type: "article" | "section"
}

interface Article {
  title: string
  description: string
  slug: string
  section: string
}

interface Section {
  title: string
  description?: string
  slug: string
}

interface PagesSearchProps {
  isSmall?: boolean;
  placeholder: string;
  classMore?: string;
};

function toArray<T>(data: T[] | Record<string, T>) {
  return Array.isArray(data) ? data : Object.values(data)
}

export default function PagesSearch({ 
    isSmall = false,
    placeholder, 
    classMore = "",
 }: PagesSearchProps) {

  const [serverData, setServerData] = useState<{ articles: Article[]; sections: Section[] } | null>(null)

  const [query, setQuery] = useState("") 

  const results = useMemo(() => {
    const clearQuery = query.trim().toLowerCase()
    if (!clearQuery) return []

    const articles = toArray<Article>(serverData?.articles as Article[])
    const sections = toArray<Section>(serverData?.sections as Section[])

    const items: SearchItem[] = [
      ...articles.map((article) => ({
        title: article.title,
        description: article.description,
        href: `/${article.section}/${article.slug}`,
        type: "article" as const,
      })),
      ...sections.map((section) => ({
        title: section.title,
        description: section.description,
        href: `/${section.slug}`,
        type: "section" as const,
      })),
    ]

    return items.filter((item) =>
      `${item.title} ${item.description ?? ""}`.toLowerCase().includes(clearQuery)
    )
  }, [query])

  useEffect(() => {
    getData('all')
      .then(data => setServerData(data))
  }, [])

  const showDropdown = query.trim().length > 0

  const classForSize = clsx(
    isSmall 
    ? "h-8 pl-8 min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
    : "w-full h-14 pl-12 pr-4 rounded-2xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    classMore
  )
  return (
    <div className="relative flex items-center">

    {/* Иконка поиска */}
      {isSmall ? <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
      : <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />}
      
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={classForSize}
      />

    {/* кнопка очистки */}
      {query && (
        <button 
            onClick={() => setQuery("")}
            className="absolute right-4 text-muted-foreground cursor-pointer"
        >
            <X className={isSmall ? "h-4 w-4" : undefined} />
        </button>
      )}

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={`${item.type}-${item.href}`}
                  href={item.href}
                  className="block border-b border-zinc-100 px-4 py-3 last:border-b-0 hover:bg-zinc-50 text-left"
                  onClick={() => setQuery("")}
                >
                    <div className="text-xs text-zinc-500">
                        {item.type === "article" ? "Статья" : "Раздел"}
                    </div>
                    
                    <div className={`font-medium text-zinc-950 ${isSmall ? "text-sm" : ""}`}>
                        {item.title}
                    </div>
                
                    <p className={` text-zinc-600 ${isSmall ? "text-xs" : "text-sm"}`}>
                        {item.description}
                    </p>
                  
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-zinc-500">
                Ничего не найдено
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}