import { Users, Heart, Briefcase, Home, Globe, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export function CategoryMenu() {
  const categories = [
    { icon: Users, label: "Civil Status & Identity", href: "/services/civil-status" },
    { icon: Heart, label: "Family & Marital Affairs", href: "/services/family" },
    { icon: Briefcase, label: "Employment & Labor", href: "/services/employment" },
    { icon: Home, label: "Real Estate & Housing", href: "/services/real-estate" },
    { icon: Globe, label: "Immigration & Nationality", href: "/services/immigration" },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-full bg-[#F9F9F9] flex items-center justify-center mb-3">
              <category.icon className="w-7 h-7 text-[#022840] group-hover:text-[#037F8C] transition-colors" />
            </div>
            <span className="text-sm font-medium text-[#022840] text-center group-hover:text-[#037F8C] transition-colors">{category.label}</span>
          </Link>
        ))}
        <Link
          href="/categories"
          className="flex flex-col items-center p-4 bg-[#F9F9F9] rounded-xl shadow-sm hover:shadow transition-shadow group"
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3">
            <MoreHorizontal className="w-7 h-7 text-[#037F8C]" />
          </div>
          <span className="text-sm font-medium text-[#037F8C] text-center">Plus de services</span>
        </Link>
      </div>
    </div>
  )
}

