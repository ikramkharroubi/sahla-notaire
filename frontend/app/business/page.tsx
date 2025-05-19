import { NavigationBar } from '../components/navigation-bar'
import { SearchForm } from '../components/search-form'
import { Footer } from '../components/footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, FileText, Briefcase, Scale, Coins, Users } from 'lucide-react'

export default function BusinessPage() {
  const businessServices = [
    { icon: Building2, title: "Business Registration", description: "Register your company or organization" },
    { icon: FileText, title: "Licenses & Permits", description: "Apply for necessary business licenses and permits" },
    { icon: Briefcase, title: "Tax Registration", description: "Register for business taxes and get your tax ID" },
    { icon: Scale, title: "Legal Compliance", description: "Ensure your business meets all legal requirements" },
    { icon: Coins, title: "Financial Services", description: "Access financial resources and support" },
    { icon: Users, title: "Employment Services", description: "Register as an employer and manage employee documents" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <section className="bg-[#0B2644] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Business Services</h1>
          <p className="text-xl text-gray-300">Start, manage, and grow your business with ease</p>
          <SearchForm />
        </div>
      </section>
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8 space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businessServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <service.icon className="w-12 h-12 text-[#006CE4] mb-4" />
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <Button className="mt-auto">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-4">Our team of experts is here to guide you through every step of your business journey.</p>
          <Button>Schedule a Consultation</Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

