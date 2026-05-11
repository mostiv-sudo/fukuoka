import { cn } from '@/lib/utils';
import { CollectionsCard } from "../ui/InfoCard";


export default function Collections({
    className = "" 
}: {
    className?: string 
} ) {

  return (
    <section className={cn("rounded-3xl py-20 px-4", className)}>
      <div className="">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="title">Подборки</h2>
        </div>

        <CollectionsCard/>
      </div>
    </section>
  );
}