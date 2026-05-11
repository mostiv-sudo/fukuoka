'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import SearchInput from '@/components/ui/SearchInput';
import HeaderNavButton from "@/components/ui/HeaderNavButton"
import { useScrollHeader } from "@/hooks/useScrollHeader";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  LifeBuoy ,
  Search ,
  Menu,
  Plane,
  Hotel,
  UtensilsCrossed,
  MapPin,
  Car,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Map as MapIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "../ui/Logo"


/**
 * Основные пункты меню
 * label — текст
 * path — ссылка
 * icon — иконка lucide
 */
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

  return (
    <header 
      className={cn(
        "border-b border-black/5 sticky z-50 bg-[var(--background-main)] transition-all duration-300 ", 
        showHeader ? "top-0" : "-top-20",
      )}
    >
      <div className="px-4 h-20 flex items-center justify-between max-w-7xl mx-auto">

        {/* ========================= */}
        {/* Logo */} 
        {/* ========================= */}
        <Logo/>


        {/* ========================= */}
        {/* Desktop navigation */}
        {/* ========================= */}
        <nav className="hidden xl:flex items-center">
          {menuItems.map((item) => {
            const Icon = item.icon

            const currentSegment = pathname.split('/').filter(Boolean).pop()
            const itemSegment = item.path.split('/').filter(Boolean).pop()

            const active = currentSegment === itemSegment
                        
            
            return (
              <HeaderNavButton
                key={item.path}
                active={active}
              >
                <Link 
                  href={item.path} 
                  className={cn(
                    "hover-underline center flex items-center gap-1 font-medium leading-5 text-[#314158]  transition-all duration-300",
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


        {/* ========================= */}
        {/* Right side */}
        {/* ========================= */}
        <div className="flex items-center gap-2">

          {/* ========================= */}
          {/* Search input (desktop) */}
          {/* ========================= */}
          <div className="hidden sm:flex gap-6 items-center relative">

            {/* <SearchInput 
              placeholder="Поиск..."
              isSmall={true}
            /> */}

            <Search className="text-[#45556C]"/>
            <button className="
              w-[166px] h-[40px] rounded-2xl bg-[var(--color-main)] 
              shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)] 
              text-white hover:opacity-90 active:scale-[0.98] transition-300
              font-medium leading-5 flex items-center gap-[17px] pl-6 
            ">
              <LifeBuoy size={18} />
              Помощь
            </button>
          </div>


          {/* ========================= */}
          {/* Mobile menu */}
          {/* ========================= */}
          <Sheet open={open} onOpenChange={setOpen}>

            {/* кнопка открытия */}
            <SheetTrigger asChild className="xl:hidden">
              {/* <Button variant="ghost" size="icon">
                <Menu className="w-10 h-10" />
              </Button> */}
            </SheetTrigger>

            {/* ========================= */}
            {/* Mobile sidebar */}
            {/* ========================= */}
            <SheetContent side="left" className="w-[300px]">

              {/* REQUIRED для accessibility */}
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 mt-6">

                {/* mobile search button */}
                <SearchInput 
                  placeholder="Поиск..." 
                  isSmall={true} 
                  classMore="w-full"
                />

                {/* mobile menu items */}
                {/* {menuItems.map((item) => {
                  const Icon = item.icon
                  const active = pathname.startsWith(item.path)

                  return (
                    <Button
                      key={item.path}
                      variant={active ? "secondary" : "ghost"}
                      className="justify-start"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href={item.path}>
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Link>
                    </Button>
                  )
                })} */}

                
                

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
