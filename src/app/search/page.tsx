import { useState } from 'react';
import articlesJson from '../../data/articles.json';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  section: string;
  subsection: string;
  description: string;
  content_blocks: any[]; // Для поиска контента достаточно any[], можно уточнить позже
  related_collections: string[];
}

const articles: Article[] = articlesJson as Article[];

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Article[]>([]);

  const handleSearch = () => {
    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div>
      <h1>Поиск</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Введите запрос..."
      />
      <button onClick={handleSearch}>Найти</button>

      <ul>
        {results.map(a => (
          <li key={a.id}>
            <Link href={`/content/${a.section}/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
