'use client'

import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserRound, Heart, Briefcase, Home, Globe, Car, GraduationCap, Stethoscope, Wallet, Scale, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Map of icon names to their components
const iconMap = {
  'user-round': UserRound,
  'heart': Heart,
  'briefcase': Briefcase,
  'home': Home,
  'globe': Globe,
  'car': Car,
  'graduation-cap': GraduationCap,
  'stethoscope': Stethoscope,
  'wallet': Wallet,
  'scale': Scale,
  'trash-2': Trash2,
}

// Color mapping for categories
const colorMap = {
  'blue': { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-600' },
  'red': { bg: 'bg-red-50', hover: 'hover:bg-red-100', text: 'text-red-600' },
  'amber': { bg: 'bg-amber-50', hover: 'hover:bg-amber-100', text: 'text-amber-600' },
  'green': { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-600' },
  'purple': { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'text-purple-600' },
  'indigo': { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'text-indigo-600' },
  'cyan': { bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', text: 'text-cyan-600' },
  'teal': { bg: 'bg-teal-50', hover: 'hover:bg-teal-100', text: 'text-teal-600' },
  'emerald': { bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', text: 'text-emerald-600' },
  'rose': { bg: 'bg-rose-50', hover: 'hover:bg-rose-100', text: 'text-rose-600' },
  'yellow': { bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', text: 'text-yellow-600' },
}

// Add type for API response
interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  icon_name: string;
}

interface TransformedCategory {
  id: number;
  icon: any; // Lucide icon component
  title: string;
  description: string;
  color: string;
  hover: string;
  iconColor: string;
}

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<TransformedCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/procedures/categories/')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        
        // Debug the response
        console.log('API Response:', data)

        // Check if data is an array, if not, handle accordingly
        const categoriesArray = Array.isArray(data) ? data : data.results || []
        
        const transformedCategories = categoriesArray.map((category: CategoryResponse) => {
          const colorKeys = Object.keys(colorMap) as Array<keyof typeof colorMap>
          const colorKey = colorKeys[categoriesArray.indexOf(category) % colorKeys.length]
          const colors = colorMap[colorKey]
          
          return {
            icon: iconMap[category.icon_name as keyof typeof iconMap] || UserRound,
            title: category.name,
            description: category.description,
            color: colors.bg,
            hover: colors.hover,
            iconColor: colors.text,
            id: category.id
          }
        })
        
        setCategories(transformedCategories)
      } catch (err) {
        console.error('Error details:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">جاري تحميل الفئات...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-600">خطأ في تحميل الفئات: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">فئات الخدمات</h1>
          <p className="text-gray-600">تصفح مجموعة شاملة من الخدمات الإدارية والحكومية</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: TransformedCategory) => {
            const Icon = category.icon
            return (
              <Card 
                key={category.id} 
                className={`transition-colors ${category.hover} cursor-pointer`}
                onClick={() => router.push(`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <CardContent className="p-6">
                  <div className={`rounded-lg ${category.color} p-6 space-y-4`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{category.title}</h3>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                      <Icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`);
                      }}
                    >
                      استكشاف الخدمات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

