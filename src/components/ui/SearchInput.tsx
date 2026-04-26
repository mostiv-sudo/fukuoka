"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import getData from "@/lib/dataLocalOrServer"
import Link from "next/link"
import clsx from "clsx"
import { Search, X } from "lucide-react";
import type { Article, Section, SearchItem, PagesSearchProps } from "@/shared/types/serchInput.type"

function toArray<T>(data?: T[] | Record<string, T> | null): T[] {
  if (!data) return []
  return Array.isArray(data) ? data : Object.values(data)
}

export default function PagesSearch({ 
    isSmall = false,
    placeholder, 
    classMore = "",
    arrTags,
 }: PagesSearchProps) {

  const [serverData, setServerData] = useState<{ articles: Article[]; sections: Section[] } | null>(null)
  const [query, setQuery] = useState("") 

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const searchItems: SearchItem[] = useMemo(() => {
    if (!serverData) return []

    const articles = toArray<Article>(serverData.articles)
    const sections = toArray<Section>(serverData.sections)

    return [
      ...articles.map((article) => ({
        title: article.title,
        description: article.description,
        href: `/${article.section}/${article.slug}`,
        type: "article" as const,
        searchText: `${article.title} ${article.description}`.toLowerCase(),
      })),
      ...sections.map((section) => ({
        title: section.title,
        description: section.description,
        href: `/${section.slug}`,
        type: "section" as const,
        searchText: `${section.title} ${section.description ?? ""}`.toLowerCase(),
      })),
    ]
  }, [serverData])
  
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    
    return searchItems.filter(item => item.searchText.includes(q))
  }, [query, searchItems])

  const showDropdown = query.trim().length > 0
  
  const classForSize = clsx(
    isSmall 
    ? "h-8 pl-8 min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40" 
    : "w-full h-14 pl-12 pr-4 rounded-2xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    classMore
  )

  useEffect(() => {
    getData('all')
      .then(data => setServerData(data))
  }, [])

  useEffect(() => {
    
    if (!showDropdown) return

    function handleClickOutside(event: MouseEvent) {
      
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <>  
      <div ref={wrapperRef} className="relative flex items-center">

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
        {showDropdown && (
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
      {arrTags?.length && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {arrTags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-1.5 rounded-full bg-white shadow-sm text-sm hover:bg-zinc-100"
              onClick={() => {setQuery(tag)}}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </>
  )
}