import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Building2, ScrollText, Heart, Users, Scale, FileCodeIcon as FileContract, File, MessageSquare, Zap, XCircle, Package, Landmark, FileSignature, Stamp } from 'lucide-react'
import Link from 'next/link'

export function PromotionalOffers() {
  const categories = [
    {
      icon: FileText,
      title: "Power of Attorney",
      description: "Legal representation documents and authorizations",
      color: "bg-[#025373]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Stamp,
      title: "Approvals",
      description: "Official approvals and certifications",
      color: "bg-[#025E73]",
      hover: "hover:bg-[#037F8C]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Building2,
      title: "Building Permits",
      description: "Construction and renovation licenses",
      color: "bg-[#037F8C]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Heart,
      title: "Marriage Services",
      description: "Marriage-related applications and documents",
      color: "bg-[#025373]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Users,
      title: "Civil Status",
      description: "Personal status and civil registry services",
      color: "bg-[#025E73]",
      hover: "hover:bg-[#037F8C]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Scale,
      title: "Obligations",
      description: "Legal and financial commitments",
      color: "bg-[#037F8C]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: FileContract,
      title: "Contracts",
      description: "Contract registration and management",
      color: "bg-[#025373]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Landmark,
      title: "Banking & Tax",
      description: "Financial applications and tax services",
      color: "bg-[#025E73]",
      hover: "hover:bg-[#037F8C]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    },
    {
      icon: Package,
      title: "Other Services",
      description: "Additional administrative services",
      color: "bg-[#037F8C]",
      hover: "hover:bg-[#025E73]",
      iconColor: "text-[#F2F2F2]",
      accent: "bg-[#A66C4B]/10"
    }
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#022840]">Service Categories</h2>
        <Button variant="link" className="text-[#A66C4B] hover:text-[#025373]" asChild>
          <Link href="/categories">View all categories</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Card 
            key={index} 
            className={`transition-colors ${category.hover} cursor-pointer`}
          >
            <CardContent className="p-6">
              <div className={`rounded-lg ${category.color} p-6 space-y-4 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rotate-45 ${category.accent}`} />
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#F2F2F2]">{category.title}</h3>
                    <p className="text-sm text-[#F2F2F2]/80">{category.description}</p>
                  </div>
                  <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                </div>
                <Button 
                  variant="secondary" 
                  className={`w-full bg-white text-[#022840] hover:text-white relative z-10 transition-colors ${
                    index % 2 === 0 ? 'hover:bg-[#037F8C]' : 'hover:bg-[#025373]'
                  }`} 
                  asChild
                >
                  <Link href={`/services/${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                    Explore Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

