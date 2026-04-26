export interface SearchItem {
  title: string
  description?: string
  href: string
  type: "article" | "section"
  searchText: string
}

export interface Article {
  title: string
  description: string
  slug: string
  section: string
}

export interface Section {
  title: string
  description?: string
  slug: string
}

export interface PagesSearchProps {
  isSmall?: boolean;
  placeholder: string;
  classMore?: string;
  arrTags?: string[];
};