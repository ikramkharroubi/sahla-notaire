import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'
import { SearchForm } from '../components/search-form'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: "تجديد جواز السفر",
      category: "وثائق شخصية",
      processing: "2-3 أيام",
      rating: "4.8",
      reviews: "2,421",
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      title: "تسجيل الأعمال",
      category: "خدمات الأعمال",
      processing: "1-2 يوم",
      rating: "4.9",
      reviews: "1,832",
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      title: "تجديد رخصة القيادة",
      category: "النقل",
      processing: "نفس اليوم",
      rating: "4.7",
      reviews: "3,140",
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      title: "تسجيل سند الملكية",
      category: "الإسكان",
      processing: "3-4 أيام",
      rating: "4.6",
      reviews: "956",
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      title: "شهادة الزواج",
      category: "وثائق شخصية",
      processing: "1-2 يوم",
      rating: "4.8",
      reviews: "1,245",
      image: "/placeholder.svg?height=200&width=280",
    },
    {
      title: "مساعدة في تقديم الضرائب",
      category: "خدمات الأعمال",
      processing: "2-3 أيام",
      rating: "4.7",
      reviews: "2,890",
      image: "/placeholder.svg?height=200&width=280",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <section className="bg-[#0B2644] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">خدماتنا</h1>
          <p className="text-xl text-gray-300">ابحث وقم بمعالجة جميع وثائقك المهمة في مكان واحد</p>
          <SearchForm />
        </div>
      </section>
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="p-4 space-y-4">
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.category}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.processing}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                      <span className="text-gray-400">({service.reviews})</span>
                    </div>
                  </div>
                  <Button className="w-full">عرض التفاصيل</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

