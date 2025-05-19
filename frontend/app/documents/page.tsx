import { NavigationBar } from '../components/navigation-bar'
import { SearchForm } from '../components/search-form'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, FileSignature, FileClock, FileCheck } from 'lucide-react'
import { Footer } from '../components/footer'

export default function DocumentsPage() {
  const documentCategories = [
    { icon: FileText, title: "Personal Identification", description: "ID cards, passports, birth certificates" },
    { icon: FileSignature, title: "Legal Documents", description: "Contracts, affidavits, power of attorney" },
    { icon: FileClock, title: "Time-Sensitive Documents", description: "Visas, work permits, temporary licenses" },
    { icon: FileCheck, title: "Certifications", description: "Academic degrees, professional certifications" },
  ]

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <section className="bg-[#0B2644] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Document Services</h1>
          <p className="text-xl text-gray-300">Find and process all your important documents in one place</p>
          <SearchForm />
        </div>
      </section>
      <main className="container mx-auto max-w-6xl px-4 py-8 space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Document Categories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {documentCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 flex items-start space-x-4">
                  <category.icon className="w-8 h-8 text-[#006CE4]" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    <Button variant="outline">Explore Documents</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Popular Document Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Passport Renewal",
              "Driver's License Application",
              "Birth Certificate Request",
              "Marriage Certificate",
              "Criminal Record Check",
              "Property Deed Registration",
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">{service}</h3>
                  <Button className="w-full">Start Process</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

