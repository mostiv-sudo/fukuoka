'use client'

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import SearchInput from '@/components/ui/SearchInput';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  Search,
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



/**
 * Основные пункты меню
 * label — текст
 * path — ссылка
 * icon — иконка lucide
 */
const menuItems = [
  { label: "Перед поездкой", path: "/before-trip", icon: Plane },
  { label: "Жильё", path: "/accommodation", icon: Hotel },
  { label: "Еда", path: "/food", icon: UtensilsCrossed },
  { label: "Что посмотреть", path: "/on-island/sights", icon: MapPin },
  { label: "Транспорт", path: "/transport", icon: Car },
  { label: "Цены", path: "/prices", icon: DollarSign },
  { label: "Советы", path: "/tips", icon: Lightbulb },
  { label: "Маршруты", path: "/trip-plan", icon: MapIcon },
  { label: "Срочно", path: "/practical", icon: AlertCircle },
]

export function Header() {
  // текущий путь (для active menu)
  const pathname = usePathname()

  // состояние мобильного меню
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* ========================= */}
        {/* Logo */} 
        {/* ========================= */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          🏝️ Фукуок.Гид
        </Link>


        {/* ========================= */}
        {/* Desktop navigation */}
        {/* ========================= */}
        <nav className="hidden xl:flex items-center gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            // проверка активной страницы
            const active = pathname.startsWith(item.path)

            return (
              <Button
                key={item.path}
                variant={active ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link href={item.path} className="flex items-center gap-1">
                  <Icon size={16} />
                  {item.label}
                </Link>
              </Button>
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
          <div className="hidden sm:flex items-center relative">
            

            <SearchInput 
              placeholder="Поиск..."
              isSmall={true}
            />
          </div>


          {/* ========================= */}
          {/* Mobile menu */}
          {/* ========================= */}
          <Sheet open={open} onOpenChange={setOpen}>

            {/* кнопка открытия */}
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
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
                {menuItems.map((item) => {
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
                })}

                
                

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
