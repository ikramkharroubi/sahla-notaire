'use client'

import { useEffect, useState } from 'react'
import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { SearchForm } from '../../components/search-form'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star, ArrowRight, FileText, Building2, Stamp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

type Service = {
  id: number;
  title: string;
  introduction: string;
  notes: string;
  required_documents: string;
  steps: any[];
  fees: string;
  processing?: string;
  rating?: string;
  reviews?: string;
  price?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type Subcategory = {
  id: number;
  name: string;
  description: string;
  procedures: Service[];
};

type CategoryData = {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  subcategories: Subcategory[];
};

const iconMap: Record<string, React.ComponentType> = {
  'file-text': FileText,
  'building': Building2,
  'stamp': Stamp,
  'user-round': FileText,
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const router = useRouter();
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const category = params.category.toLowerCase();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Convert URL slug to proper category name (e.g., "power-of-attorney" -> "Power of Attorney")
        const categoryName = category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        console.log('Fetching category:', categoryName);
        const response = await fetch(`http://localhost:8000/api/procedures/categories/?name=${encodeURIComponent(categoryName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const categoryData = await response.json();
        console.log('Category data response:', categoryData);
        
        if (!Array.isArray(categoryData) || categoryData.length === 0) {
          console.log('No category found with name:', categoryName);
          throw new Error('Category not found');
        }

        const categoryInfo = categoryData[0];
        console.log('Found category:', categoryInfo);
        
        // The subcategories are already included in the category response
        const subcategoriesWithProcedures = await Promise.all(
          categoryInfo.subcategories.map(async (subcategory: any) => {
            // Only fetch procedures for this specific subcategory
            const proceduresResponse = await fetch(`http://localhost:8000/api/procedures/?subcategory=${subcategory.id}`);
            if (!proceduresResponse.ok) {
              throw new Error('Failed to fetch procedures');
            }
            const procedures = await proceduresResponse.json();
            console.log(`Procedures for subcategory ${subcategory.id}:`, procedures);
            
            // Filter procedures to only include those that belong to this subcategory
            const subcategoryProcedures = procedures.filter((procedure: any) => 
              procedure.subcategory === subcategory.id
            );
            
            return {
              ...subcategory,
              procedures: subcategoryProcedures.map((procedure: any) => ({
                ...procedure,
                processing: "2-3 days", // These could be added to the backend model if needed
                rating: "4.8",
                reviews: "100+",
                price: "150",
                icon: iconMap[categoryInfo.icon_name] || FileText,
              })),
            };
          })
        );

        setData({
          ...categoryInfo,
          subcategories: subcategoriesWithProcedures,
        });
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center text-red-500">
            <h2 className="text-xl font-semibold mb-2">Error Loading Category</h2>
            <p>{error || 'Category not found'}</p>
            <p className="text-sm mt-2">Category name: {category}</p>
            <p className="text-sm">URL: {`http://localhost:8000/api/procedures/categories/?name=${encodeURIComponent(category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))}`}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <NavigationBar />
      <section className="bg-[#022840] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{data.name}</h1>
          <p className="text-xl text-[#F2F2F2]/80">{data.description}</p>
          <SearchForm />
        </div>
      </section>
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-6 space-y-10">
        {data.subcategories.map((subcategory) => (
          <div key={subcategory.id} className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-[#037F8C]/20">
              <h2 className="text-xl font-semibold text-[#022840]">{subcategory.name}</h2>
              <span className="text-xs text-[#025E73] bg-[#037F8C]/10 px-2 py-0.5 rounded-full">
                {subcategory.procedures.length} {subcategory.procedures.length === 1 ? 'Service' : 'Services'}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subcategory.procedures.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-200 bg-white border-[#037F8C]/10">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      {service.icon && (
                        <div className="p-2 bg-[#037F8C]/10 rounded-md">
                          <service.icon className="w-5 h-5 text-[#037F8C]" />
                        </div>
                      )}
                      <h3 className="font-semibold text-base text-[#022840]">{service.title}</h3>
                    </div>
                    <p className="text-xs text-[#025373] leading-snug">{service.introduction}</p>
                    <div className="flex items-center justify-between text-xs text-[#025E73] bg-[#037F8C]/5 p-2 rounded-md">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{service.processing}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#037F8C] text-[#037F8C]" />
                        <span>{service.rating}</span>
                        <span className="text-[#025E73]">({service.reviews})</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full group bg-[#037F8C] text-white hover:bg-[#025E73] h-9 text-sm"
                      onClick={() => router.push(`/services/${category}/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  )
}

export function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = Array.isArray(params.category) 
    ? params.category[0]?.toLowerCase() 
    : params.category?.toLowerCase();
  const serviceName = decodeURIComponent(
    Array.isArray(params.service) 
      ? params.service[0] || ''
      : params.service || ''
  );

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        // First get the category ID
        const categoryResponse = await fetch(`http://localhost:8000/api/procedures/categories/?name=${category}`);
        if (!categoryResponse.ok) {
          throw new Error('Category not found');
        }
        const categoryData = await categoryResponse.json();
        
        if (!categoryData.results || categoryData.results.length === 0) {
          throw new Error('Category not found');
        }

        // Then get all procedures and find the matching one
        const proceduresResponse = await fetch(`http://localhost:8000/api/procedures/`);
        if (!proceduresResponse.ok) {
          throw new Error('Failed to fetch procedures');
        }
        const procedures = await proceduresResponse.json();
        
        const matchingService = procedures.results.find((p: Service) => 
          p.title.toLowerCase() === serviceName.toLowerCase()
        );

        if (matchingService) {
          setService(matchingService);
        } else {
          throw new Error('Service not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [category, serviceName]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
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
            <h1 className="text-3xl font-bold text-[#022840]">{service.title}</h1>
            <p className="text-lg text-[#025373]">{service.introduction}</p>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-[#022840] mb-2">Required Documents</h2>
                <p className="text-[#025373] whitespace-pre-line">{service.required_documents}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#022840] mb-2">Steps</h2>
                <ol className="list-decimal list-inside space-y-2 text-[#025373]">
                  {service.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#022840] mb-2">Fees</h2>
                <p className="text-[#025373] whitespace-pre-line">{service.fees}</p>
              </div>
              {service.notes && (
                <div>
                  <h2 className="text-xl font-semibold text-[#022840] mb-2">Additional Notes</h2>
                  <p className="text-[#025373] whitespace-pre-line">{service.notes}</p>
                </div>
              )}
            </div>
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

