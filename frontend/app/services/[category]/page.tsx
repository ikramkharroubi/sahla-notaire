'use client'

import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { SearchForm } from '../../components/search-form'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star, ArrowRight, FileText, Building2, Stamp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

type Service = {
  name: string;
  description: string;
  processing: string;
  rating: string;
  reviews: string;
  price?: string;
  icon?: React.ComponentType;
};

type CategoryData = {
  title: string;
  description: string;
  services: Service[];
  icon: React.ComponentType;
};

const categoryData: Record<string, CategoryData> = {
  "power-of-attorney": {
    title: "Power of Attorney Services",
    description: "Authorize others to act on your behalf with official power of attorney documents",
    icon: FileText,
    services: [
      {
        name: "General Power of Attorney",
        description: "Broad authorization for financial and legal matters",
        processing: "2-3 days",
        rating: "4.8",
        reviews: "1,245",
        price: "150",
        icon: FileText,
      },
      {
        name: "Special Power of Attorney",
        description: "Limited authorization for specific transactions",
        processing: "1-2 days",
        rating: "4.9",
        reviews: "892",
        price: "200",
        icon: FileText,
      },
      {
        name: "Property Power of Attorney",
        description: "Authorization for real estate transactions",
        processing: "3-4 days",
        rating: "4.7",
        reviews: "567",
        price: "250",
        icon: FileText,
      },
    ],
  },
  "approvals": {
    title: "Approval Services",
    description: "Obtain official approvals and certifications for various purposes",
    icon: Stamp,
    services: [
      {
        name: "Business License Approval",
        description: "Official approval for operating a business",
        processing: "5-7 days",
        rating: "4.6",
        reviews: "789",
        price: "300",
        icon: Stamp,
      },
      {
        name: "Product Certification",
        description: "Certification for product quality and standards",
        processing: "7-10 days",
        rating: "4.7",
        reviews: "456",
        price: "500",
        icon: Stamp,
      },
      {
        name: "Event Permit Approval",
        description: "Official approval for organizing public events",
        processing: "3-5 days",
        rating: "4.8",
        reviews: "234",
        price: "150",
        icon: Stamp,
      },
    ],
  },
  "building-permits": {
    title: "Building Permit Services",
    description: "Apply for and manage construction and renovation permits",
    icon: Building2,
    services: [
      {
        name: "New Construction Permit",
        description: "Permit for new building construction",
        processing: "7-10 days",
        rating: "4.5",
        reviews: "678",
        price: "1000",
        icon: Building2,
      },
      {
        name: "Renovation Permit",
        description: "Permit for major home or building renovations",
        processing: "3-5 days",
        rating: "4.7",
        reviews: "543",
        price: "500",
        icon: Building2,
      },
      {
        name: "Demolition Permit",
        description: "Permit for building demolition",
        processing: "2-4 days",
        rating: "4.6",
        reviews: "321",
        price: "750",
        icon: Building2,
      },
    ],
  },
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const category = params.category.toLowerCase();
  const data = categoryData[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} Services`,
    description: `Explore our range of ${category.replace(/-/g, ' ')} services`,
    services: [],
  };

  const placeholderServices = [
    {
      name: "Service Coming Soon",
      description: "We're working on bringing you this service. Stay tuned for updates!",
      processing: "TBA",
      rating: "N/A",
      reviews: "0",
      price: "TBA",
    },
    {
      name: "New Service Placeholder",
      description: "This service is currently in development. Check back for more information.",
      processing: "TBA",
      rating: "N/A",
      reviews: "0",
      price: "TBA",
    },
    {
      name: "Future Service",
      description: "We're expanding our offerings. This service will be available soon.",
      processing: "TBA",
      rating: "N/A",
      reviews: "0",
      price: "TBA",
    },
  ];

  const displayServices = data.services.length > 0 ? data.services : placeholderServices;

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <NavigationBar />
      <section className="bg-[#022840] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
          <p className="text-xl text-[#F2F2F2]/80">{data.description}</p>
          <SearchForm />
        </div>
      </section>
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 bg-white">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {service.icon && <service.icon className="w-6 h-6 text-[#037F8C]" />}
                  <h3 className="font-bold text-lg text-[#022840]">{service.name}</h3>
                </div>
                <p className="text-sm text-[#025373]">{service.description}</p>
                {service.price && (
                  <p className="text-lg font-semibold text-[#037F8C]">
                    {service.price === "TBA" ? "Price TBA" : `$${service.price}`}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-[#025E73]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.processing}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#037F8C] text-[#037F8C]" />
                    <span>{service.rating}</span>
                    <span className="text-[#025E73]">({service.reviews})</span>
                  </div>
                </div>
                <Button 
                  className="w-full group bg-[#037F8C] text-white hover:bg-[#025E73]"
                  onClick={() => router.push(`/services/${category}/${service.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function ServiceDetailPage() {
  const params = useParams();
  const category = Array.isArray(params.category) 
    ? params.category[0]?.toLowerCase() 
    : params.category?.toLowerCase();
  const serviceName = decodeURIComponent(
    Array.isArray(params.service) 
      ? params.service[0] || ''
      : params.service || ''
  );

  const data = categoryData[category] || { services: [] };
  const service = data.services.find(
    (s) => s.name.toLowerCase() === serviceName.toLowerCase()
  );

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-2xl font-bold text-[#022840]">Service Not Found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-8">
        <Card className="bg-white">
          <CardContent className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-[#022840]">{service.name}</h1>
            <p className="text-lg text-[#025373]">{service.description}</p>
            <div className="flex items-center gap-4 text-[#025E73]">
              <Clock className="w-5 h-5" />
              <span>{service.processing}</span>
              <Star className="w-5 h-5 fill-[#037F8C] text-[#037F8C]" />
              <span>{service.rating} ({service.reviews} reviews)</span>
            </div>
            {service.price && (
              <p className="text-xl font-semibold text-[#037F8C]">
                {service.price === 'TBA' ? 'Price TBA' : `$${service.price}`}
              </p>
            )}
            <Button className="bg-[#037F8C] text-white hover:bg-[#025E73] w-full">
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

