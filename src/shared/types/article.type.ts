export interface ContentBlockText {
  type: 'text'
  text: string
}

export interface ContentBlockList {
  type: 'list'
  items?: string[]
}

export interface ContentBlockTips {
  type: 'tips'
  title: string
  text: string
}

export type ContentBlock = ContentBlockText | ContentBlockList | ContentBlockTips

export interface Article {
  id: string
  title: string
  slug: string
  section: string
  subsection: string
  description: string
  content_blocks: ContentBlock[]
  related_collections: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface ArticlePageProps {
  params: Promise<{ section: string; slug: string }>
}