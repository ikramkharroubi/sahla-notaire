import { Users, Heart, Briefcase, Home, Globe, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

// Map of category names to icons
const iconMap: { [key: string]: any } = {
  'الهوية والوثائق': Users,
  'التعليم': Globe,
  'الصحة': Heart,
  'العقارات': Home,
  'المركبات': Briefcase,
  'الخدمات المالية': Briefcase,
}

export function CategoryMenu() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/top-categories/')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = iconMap[category.name] || MoreHorizontal
          return (
            <Link
              key={category.id}
              href={`/services/${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#F9F9F9] flex items-center justify-center mb-3">
                <Icon className="w-7 h-7 text-[#022840] group-hover:text-[#037F8C] transition-colors" />
              </div>
              <span className="text-sm font-medium text-[#022840] text-center group-hover:text-[#037F8C] transition-colors">{category.name}</span>
            </Link>
          )
        })}
        <Link
          href="/categories"
          className="flex flex-col items-center p-4 bg-[#F9F9F9] rounded-xl shadow-sm hover:shadow transition-shadow group"
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3">
            <MoreHorizontal className="w-7 h-7 text-[#037F8C]" />
          </div>
          <span className="text-sm font-medium text-[#037F8C] text-center">المزيد من الخدمات</span>
        </Link>
      </div>
    </div>
  )
}

