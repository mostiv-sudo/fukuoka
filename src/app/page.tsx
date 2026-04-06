import Link from "next/link"
import {
  Search,
  UtensilsCrossed,
  MapPin,
  Waves,
  Car,
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  Plane,
  Hotel,
  Heart,
  Phone,
  Wifi,
  ShoppingBag,
} from "lucide-react"

export default function Home() {
  const quickActions = [
    { icon: UtensilsCrossed, label: "Где поесть", path: "/food" },
    { icon: MapPin, label: "Что посмотреть", path: "/sights" },
    { icon: Waves, label: "Пляжи", path: "/beaches" },
    { icon: Car, label: "Транспорт", path: "/transport" },
    { icon: DollarSign, label: "Цены", path: "/prices" },
    { icon: FileText, label: "Виза", path: "/before-trip/visa" },
    { icon: AlertCircle, label: "Помощь", path: "/help" },
  ]

  const urgentNeeds = [
    { icon: Phone, label: "Такси", path: "/taxi" },
    { icon: AlertCircle, label: "Аптека", path: "/pharmacy" },
    { icon: Wifi, label: "Интернет", path: "/internet" },
    { icon: ShoppingBag, label: "Магазины", path: "/shops" },
  ]

  return (
    <div className="bg-zinc-50 min-h-screen">

      {/* HERO */}
      <section className="px-4 pt-16 pb-24">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Гид по Фукуоку
          </h1>

          <p className="text-muted-foreground mt-3 text-lg">
            Всё что нужно туристу — быстро и без воды
          </p>

          {/* Search */}
          <div className="relative mt-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <input
              placeholder="Где поесть, пляжи, цены, виза..."
              className="
                w-full 
                h-14 
                pl-12 
                pr-4 
                rounded-2xl 
                border 
                bg-white 
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
              "
            />
          </div>

          {/* tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["где поесть", "пляжи", "виза", "цены"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white shadow-sm text-sm hover:bg-zinc-100"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* QUICK ACTIONS FLOAT */}
      <section className="px-4 -mt-16">
        <div className="
          max-w-6xl 
          mx-auto 
          bg-white 
          rounded-3xl 
          shadow-lg 
          p-6
        ">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">

            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.path}
                className="
                  flex flex-col 
                  items-center 
                  gap-2 
                  p-4 
                  rounded-2xl 
                  hover:bg-zinc-50 
                  transition
                  group
                "
              >
                <div className="
                  p-3 
                  rounded-2xl 
                  bg-blue-50 
                  group-hover:bg-blue-100
                ">
                  <action.icon size={22} className="text-blue-600" />
                </div>

                <span className="text-sm text-center">
                  {action.label}
                </span>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-orange-500" />
          <h2 className="text-2xl font-semibold">Популярные</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {[1,2,3].map((i)=>(
            <Link
              key={i}
              href="/"
              className="
                bg-white 
                rounded-3xl 
                shadow-sm 
                hover:shadow-md 
                transition 
                overflow-hidden
              "
            >
              <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600" />

              <div className="p-5">
                <div className="text-sm text-blue-600 mb-1">
                  Транспорт
                </div>

                <h3 className="font-semibold">
                  Как арендовать байк на Фукуоке
                </h3>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* PLANNING */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          Планируете поездку
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {[Plane,Hotel,DollarSign,FileText].map((Icon,i)=>(
            <Link
              key={i}
              href="/"
              className="
                bg-white 
                rounded-2xl 
                p-6 
                shadow-sm 
                hover:shadow-md 
                transition
                flex 
                flex-col 
                items-center 
                gap-3
              "
            >
              <div className="p-3 rounded-2xl bg-green-50">
                <Icon className="text-green-600" />
              </div>

              <span className="text-sm font-medium">
                Раздел
              </span>
            </Link>
          ))}

        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="px-4 mt-16">
        <div className="
          max-w-6xl 
          mx-auto 
          bg-gradient-to-br 
          from-orange-50 
          to-yellow-50 
          rounded-3xl 
          p-8
        ">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="text-red-500" />
            <h2 className="text-2xl font-semibold">
              Подборки
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {["ТОП рестораны","Лучшие пляжи","Маршруты"].map((title)=>(
              <Link
                key={title}
                href="/"
                className="
                  bg-white 
                  rounded-2xl 
                  p-6 
                  shadow-sm 
                  hover:shadow-lg 
                  transition
                "
              >
                <div className="text-4xl mb-3">🔥</div>

                <h3 className="font-semibold text-lg">
                  {title}
                </h3>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* URGENT */}
      <section className="max-w-6xl mx-auto px-4 mt-16 pb-16">
        <div className="bg-red-50 rounded-3xl p-6">

          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-600" />
            <h2 className="text-xl font-semibold">
              Срочно нужно
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {urgentNeeds.map((need)=>(
              <Link
                key={need.label}
                href={need.path}
                className="
                  bg-white 
                  rounded-2xl 
                  p-4 
                  flex 
                  items-center 
                  gap-2 
                  hover:bg-red-100 
                  transition
                "
              >
                <need.icon size={18} className="text-red-600"/>
                <span>{need.label}</span>
              </Link>
            ))}

          </div>

        </div>
      </section>

    </div>
  )
}
