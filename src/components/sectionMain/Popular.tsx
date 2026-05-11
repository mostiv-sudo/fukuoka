import Link from "next/link";
import { cn } from '@/lib/utils';
import { ArticlesCollectionCard } from "../ui/InfoCard";

export default function Popular({
    className = "" 
}: {
    className?: string 
} ) {

  return (
    <section className={cn("px-4 py-20", className)}>
      <h2 className="title">Популярные</h2>
      <ArticlesCollectionCard/>
    </section>
  );
}