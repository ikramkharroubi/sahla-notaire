import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star } from 'lucide-react'

export function PopularServices() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#022840]">Popular Services</h2>
        <Button variant="link" className="text-[#A66C4B] hover:text-[#025373]">View all services</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Passport Renewal",
            processing: "2-3 days",
            rating: "4.8",
            reviews: "2,421",
            image: "/placeholder.svg?height=200&width=280",
          },
          {
            title: "Business Registration",
            processing: "1-2 days",
            rating: "4.9",
            reviews: "1,832",
            image: "/placeholder.svg?height=200&width=280",
          },
          {
            title: "Driver's License",
            processing: "Same day",
            rating: "4.7",
            reviews: "3,140",
            image: "/placeholder.svg?height=200&width=280",
          },
          {
            title: "Property Deed",
            processing: "3-4 days",
            rating: "4.6",
            reviews: "956",
            image: "/placeholder.svg?height=200&width=280",
          },
        ].map((service, index) => (
          <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-4">
                <h3 className="font-bold text-lg text-[#022840]">{service.title}</h3>
                <div className="flex items-center justify-between text-sm text-[#025373]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.processing}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#A66C4B] text-[#A66C4B]" />
                    <span>{service.rating}</span>
                    <span className="text-[#025E73]">({service.reviews})</span>
                  </div>
                </div>
                <Button 
                  className={`w-full text-white transition-colors ${
                    index % 2 === 0 ? 'bg-[#037F8C] hover:bg-[#025373]' : 'bg-[#025373] hover:bg-[#037F8C]'
                  }`}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

