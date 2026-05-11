'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import SearchInput from '@/components/ui/SearchInput';
import HeaderNavButton from "@/components/ui/HeaderNavButton"
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { cn } from "@/lib/utils"
import Logo from "../ui/Logo"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  LifeBuoy,
  Search,
  Menu,
  Plane,
  Hotel,
  UtensilsCrossed,
  MapPin,
  Car,
  DollarSign,
  Lightbulb,
  Map as MapIcon
} from "lucide-react"


const menuItems = [
  { label: "На острове", path: "/on-island", icon: Plane },
  { label: "Жильё", path: "/accommodation", icon: Hotel },
  { label: "Еда", path: "/food", icon: UtensilsCrossed },
  { label: "Что посмотреть", path: "/on-island/sights", icon: MapPin },
  { label: "Транспорт", path: "/transport", icon: Car },
  { label: "Цены", path: "/prices", icon: DollarSign },
  { label: "Советы", path: "/tips", icon: Lightbulb },
  { label: "Маршруты", path: "/catalog", icon: MapIcon },
]

export function Header() {
  const { showHeader } = useScrollHeader();  
  const pathname = usePathname();
  
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // для анимации

  // Открытие поиска
  const openSearch = () => {
    setIsSearchOpen(true);
    // Небольшая задержка для запуска анимации
    setTimeout(() => setIsSearchVisible(true), 10);
  };

  // Закрытие поиска с анимацией
  const closeSearch = () => {
    setIsSearchVisible(false);
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 300);
  };

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen]);

  return (
    <header 
      className={cn(
        "border-b border-black/5 sticky z-50 bg-[var(--background-main)] transition-all duration-300 ", 
        showHeader ? "top-0" : "-top-20",
      )}
    >
      <div className="px-4 h-20 flex items-center justify-between max-w-7xl mx-auto">

        <Logo />

        <nav className="hidden xl:flex items-center">
          {menuItems.map((item) => {
            const Icon = item.icon
            const currentSegment = pathname.split('/').filter(Boolean).pop()
            const itemSegment = item.path.split('/').filter(Boolean).pop()
            const active = currentSegment === itemSegment

            return (
              <HeaderNavButton key={item.path} active={active}>
                <Link 
                  href={item.path} 
                  className={cn(
                    "hover-underline center flex items-center gap-1 font-medium leading-5 text-[#314158] transition-all duration-300",
                    active ? "text-black active" : "hover:text-black"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </HeaderNavButton>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className=" flex gap-6 items-center relative max-[500px]:gap-2">
            <button 
              onClick={openSearch}
              className="p-2 hover:bg-[#004E4A33] rounded-xl transition-colors duration-300 max-[500px]:hidden"
            >
              <Search className="text-[#45556C]" />
            </button>

            <button 
              onClick={() => setOpen(true)}
              className="xl:hidden"
            >
              <Menu className="text-[#45556C]" />
            </button>

            <button className="
              w-[166px] h-[40px] rounded-2xl bg-[var(--color-main)] 
              shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)] 
              text-white hover:opacity-90 active:scale-[0.98] transition-all
              font-medium leading-5 flex items-center gap-[17px] 
              sm:pl-6 max-sm:w-[110px] max-sm:justify-center max-sm:text-sm max-sm:gap-2.5 
            ">
              <LifeBuoy size={18}/>
              Помощь
            </button>
          </div>

        </div>
      </div>

      {isSearchOpen && (
        <div 
          className={cn(
            "fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-start justify-center pt-28 px-4 transition-opacity duration-300",
            isSearchVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={closeSearch}
        >
          <div 
            className={cn(
              "w-full max-w-2xl transition-all duration-300",
              isSearchVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            )}
            onClick={e => e.stopPropagation()}
          >
            <SearchInput 
              placeholder="Поиск..." 
              classMore="shadow-2xl"
            />

            <p className="text-center text-white/70 text-sm mt-6">
              Нажмите ESC или кликните по тёмному фону чтобы закрыть
            </p>
          </div>
        </div>
      )}
    </header>
  )
}