import getData from '@/lib/dataLocalOrServer'
import Link from 'next/link'
// вынес типы в отделный файл
import type {ContentBlock, Article , ArticlePageProps, } from '@/shared/types/article.type' 
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import type { Metadata } from 'next'


async function getArticles(): Promise<Article[]> {
  const articlesData = await getData('articles')
  return articlesData as Article[]
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    section: article.section,  
    slug: article.slug,        
  }))
}

export async function generateMetadata(
  { params }: ArticlePageProps
): Promise<Metadata> {
  const { slug } = await params
  const articles = await getArticles()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return {
      title: 'Статья не найдена',
      description: 'Запрошенная статья не существует',
    }
  }

  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.description ?? '',
    keywords: [
      'путешествия',
      'виза',
      'билеты',
      ...(article.seo?.keywords ?? [])
    ],
  }
}

function isContentBlock(block: unknown): block is ContentBlock {
  if (typeof block !== 'object' || block === null) return false
  const b = block as Record<string, unknown>
  if (b.type === 'text' && typeof b.text === 'string') return true
  if (b.type === 'list' && (b.items === undefined || Array.isArray(b.items))) return true
  if (b.type === 'tips' && typeof b.title === 'string' && typeof b.text === 'string') return true
  return false
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { section, slug } = await params
  const articles = await getArticles()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="p-10 text-center text-2xl">
        Статья не найдена
      </div>
    )
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Back */}
        <Link
          href={`/${section}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={18} />
          Назад
        </Link>

        <article>

          {/* Header */}
          <div className="mb-8">

            <div className="text-sm text-muted-foreground mb-2">
              <Link href={`/${article.section}`} className="hover:underline">
                {article.section}
              </Link>
              / 
              <Link href={`/${article.section}/${article.subsection}`} className="hover:underline">
                {article.subsection}
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p>

            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>1 апреля 2026</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>5 мин чтения</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="h-80 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-10" />

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-zinc-700">

            {article.content_blocks.map((block, i) => {
              if (!isContentBlock(block)) return null

              if (block.type === 'text') {
                return <p key={i}>{block.text}</p>
              }

              if (block.type === 'list' && block.items?.length) {
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )
              }

              if (block.type === 'tips') {
                return (
                  <div
                    key={i}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8"
                  >
                    <div className="font-semibold mb-2">
                      💡 {block.title}
                    </div>
                    <p className="mb-0">{block.text}</p>
                  </div>
                )
              }

              return null
            })}
          </div>

          {/* Related */}
          {article.related_collections.length > 0 && (
            <div className="mt-14 pt-10 border-t">

              <h3 className="text-2xl font-semibold mb-6">
                Подборки
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {article.related_collections.map(slug => (
                  <Link
                    key={slug}
                    href={`/collections/${slug}`}
                    className="p-5 bg-white rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      Подборка
                    </div>

                    <div className="font-semibold">
                      {slug.replace(/-/g, ' ')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </div>
    </div>
  )
}
