import sections from '../../../data/sections.json'
import Link from 'next/link'
import {
  FileText,
  Calendar,
  DollarSign,
  Plane,
  MapPin,
  Package,
  CheckSquare,
  HelpCircle
} from "lucide-react"

interface Subsection {
  title: string
  slug: string
  description?: string
  icon?: string
}

interface Section {
  title: string
  slug: string
  description?: string
  subsections: Subsection[]
}

interface SectionPageProps {
  params: Promise<{ section: string }>
}

const icons = {
  worth: HelpCircle,
  when: Calendar,
  prices: DollarSign,
  visa: FileText,
  flights: Plane,
  accommodation: MapPin,
  know: CheckSquare,
  packing: Package
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: sectionParam } = await params

  const section = Object.values(sections).find(
    s => s.slug === sectionParam
  ) as Section | undefined

  if (!section) {
    return (
      <div className="p-10 text-center">
        Раздел не найден
      </div>
    )
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {section.title}
          </h1>

          {section.description && (
            <p className="text-xl text-muted-foreground">
              {section.description}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {section.subsections.map((sub) => {
            const Icon =
              icons[sub.slug as keyof typeof icons] || FileText

            return (
              <Link
                key={sub.slug}
                href={`/${section.slug}/${sub.slug}`}
                className="
                  group
                  bg-white
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  border
                  hover:-translate-y-1
                "
              >
                <div className="
                  w-14 h-14
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  mb-4
                  group-hover:bg-blue-600
                  group-hover:text-white
                  transition
                ">
                  <Icon size={26} />
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  {sub.title}
                </h2>

                {sub.description && (
                  <p className="text-muted-foreground text-sm">
                    {sub.description}
                  </p>
                )}
              </Link>
            )
          })}

        </div>

        {/* Quick Start */}
        <div className="
          mt-14
          bg-gradient-to-br
          from-blue-600
          to-indigo-700
          rounded-2xl
          p-8
          text-white
        ">
          <h2 className="text-2xl font-semibold mb-6">
            С чего начать?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {section.subsections.slice(0,4).map((sub, i) => (
              <div key={sub.slug} className="flex gap-3">

                <div className="
                  w-8 h-8
                  rounded-full
                  bg-white
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  font-bold
                ">
                  {i + 1}
                </div>

                <div>
                  <div className="font-medium">
                    {sub.title}
                  </div>

                  <div className="text-sm text-blue-100">
                    Подробнее
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}
