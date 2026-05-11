import Link from "next/link"
import { type LucideIcon, ArrowRight, Clock , UtensilsCrossed } from "lucide-react"
import Image from 'next/image';

interface InfoCardProps {
  arr: {
    icon: LucideIcon
    title: string
    description: string
    href: string
    titleLink?: string
  }[]
}

function InfoCard({
   arr 
}: InfoCardProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-6">
      {arr.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.href}
            className="flex flex-col p-6 rounded-[22px] h-[210px] shadow-[0_4px_24px_0_rgba(0,0,0,0.03)] bg-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center bg-[#004E4A0D] rounded-[14px] px-3 w-12 h-12">
                <Icon size={24} />
              </span>

              <h3 className="font-bold text-[22px] leading-[1.16667]">
                {item.title}
              </h3>
            </div>

            <p className="text-sm text-[var(--color-paragraph)]">
              {item.description}
            </p>

            <Link
              href={item.href}
              className="font-semibold flex items-center gap-1 group mt-auto"
            >
              {item.titleLink ?? "Подробнее"}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

function ArticlesCollectionCard() {
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
            {[1,2,3].map((i) => (
            <div key={i} className="flex gap-6 p-3 justify-between items-center bg-white rounded-[20px] w-[50wv] shadow-[0_4px_24px_0_rgba(0,0,0,0.04)]">
                <div className='p-3 pr-0 flex flex-col h-full'>
                    <span className='text-[var(--color-accent)] font-bold text-xs leading-snug tracking-wider mb-3'>
                        ТРАНСПОРТ
                    </span>
                    <h3 className='font-bold text-xl leading-tight mb-2'>
                        Как арендовать байк на Фукуоке
                    </h3>
                    <p 
                        className="
                            text-[var(--color-paragraph)] max-h-[60px] overflow-y-auto 
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-2
                        "
                    >
                        Условия аренды, цены, документы и важные советы для безопасной езды.
                    </p>
                    <span className='flex gap-1.5 text-[#90A1B9] font-medium text-xs leading-[1.33333] mt-auto'>
                        <Clock size={14}/>6 мин чтения
                    </span>
                </div>
                <div className="relative w-[90px] h-[120px] sm:w-[110px] sm:h-[196px] shrink-0">
                  <Image
                    src="/ImageWithFallback.png"
                    alt="WithFallback"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
            </div>
            ))}
        </div>
      </div>
    )
}

function CollectionsCard() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
      {[1,2,3].map((i) => (
        <div key={i} className="group relative rounded-[22px] p-6 h-[250px] overflow-hidden  ">
          <Image
            src="/collection.png"
            alt="Collection"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          <div className="relative z-10 flex h-full flex-col justify-between text-white">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-full text-xs font-semibold uppercase text-white flex items-center gap-x-1 bg-[#3c383d79] backdrop-blur-sm border border-white/20">
                <UtensilsCrossed size={20}/>
              </div>

              <span className="font-bold text-xl leading-[1.4] text-white/50">01</span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div >
                <h3 className="font-bold text-2xl leading-[1.33333] mb-2">
                  Топ рестораны
                </h3>
                <p className="text-sm leading-[1.42857] opacity-80">
                  Лучшие места от локальной кухни до изысканных ресторанов.
                </p>
              </div>

                <Link 
                  href="/" 
                  className="flex flex-shrink-0 items-center justify-center h-11 w-11 rounded-full bg-white text-black group/btn"
                >
                  <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export {
  InfoCard,
  ArticlesCollectionCard,
  CollectionsCard
}