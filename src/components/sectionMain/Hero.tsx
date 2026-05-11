import Image from 'next/image';
import SearchInput from "../ui/SearchInput"
import { cn } from '@/lib/utils';


export default function Hero({
    className = "" 
}: {
    className?: string 
} ) {

    return (
        <section className={cn(
            "flex px-4 pt-16 pb-24 items-center justify-between gap-12",
            className
        )}>
            <div>
                <h1 className="font-medium text-[76px] tracking-tight">
                    Гид по Фукуоку
                </h1>

                <p className=" mt-4 font-normal text-2xl leading-snug text-[#45556C]">
                    Всё что нужно туристу - быстро и понятно
                </p>

                {/* Search */}
                <div className="mt-8">
                    <SearchInput 
                        placeholder="Поиск по сайту: пляжи, отели, еда, транспорт..."
                    />
                </div>   
            </div>

            <div>
                <Image 
                src="/hero-image.png" 
                alt="Hero"
                width={640} height={520} 
                className="rounded-4xl"
                />
            </div>
            
        </section>
    )
}