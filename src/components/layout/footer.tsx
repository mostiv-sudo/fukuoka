import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* =============================== */}
        {/* Top */}
        {/* =============================== */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-bold text-lg text-white flex items-center gap-2"
            >
              🏝️ Фукуок.Гид
            </Link>

            <p className="mt-3 text-sm text-gray-400">
              Полный гид по острову Фукуок: жильё, еда, транспорт,
              маршруты и практические советы.
            </p>
          </div>

          {/* Планирование */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Планирование
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/before-trip/when-to-go" className="hover:text-white">
                  Когда ехать
                </Link>
              </li>
              <li>
                <Link href="/before-trip/visa" className="hover:text-white">
                  Виза
                </Link>
              </li>
              <li>
                <Link href="/before-trip/prices" className="hover:text-white">
                  Бюджет
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-white">
                  Где жить
                </Link>
              </li>
            </ul>
          </div>

          {/* На острове */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              На острове
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/food" className="hover:text-white">
                  Где поесть
                </Link>
              </li>
              <li>
                <Link href="/on-island/sights" className="hover:text-white">
                  Достопримечательности
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:text-white">
                  Транспорт
                </Link>
              </li>
              <li>
                <Link href="/on-island/beaches" className="hover:text-white">
                  Пляжи
                </Link>
              </li>
            </ul>
          </div>

          {/* Практика */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Практика
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/practical/sim-card" className="hover:text-white">
                  SIM-карта
                </Link>
              </li>
              <li>
                <Link href="/practical/pharmacy" className="hover:text-white">
                  Аптека
                </Link>
              </li>
              <li>
                <Link href="/practical/emergency" className="hover:text-white">
                  Скорая помощь
                </Link>
              </li>
              <li>
                <Link href="/tips/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Маршруты */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Маршруты
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/trip-plan/routes/1-day" className="hover:text-white">
                  1 день
                </Link>
              </li>
              <li>
                <Link href="/trip-plan/routes/3-days" className="hover:text-white">
                  3 дня
                </Link>
              </li>
              <li>
                <Link href="/trip-plan/routes/5-days" className="hover:text-white">
                  5 дней
                </Link>
              </li>
              <li>
                <Link href="/trip-plan/routes/7-days" className="hover:text-white">
                  7+ дней
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* =============================== */}
        {/* Divider */}
        {/* =============================== */}
        <div className="border-t border-gray-800 my-8" />

        {/* =============================== */}
        {/* Bottom */}
        {/* =============================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-gray-400 text-center md:text-left">
            © 2026 Фукуок.Гид — Полный информационный портал
          </p>

          <div className="flex items-center gap-4 text-gray-500">
            <Link href="/about" className="hover:text-white">
              О проекте
            </Link>

            <Link href="/contacts" className="hover:text-white">
              Контакты
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>

        </div>

      </div>
    </footer>
  )
}
