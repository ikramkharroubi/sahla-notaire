'use client'

import { useParams } from 'next/navigation'
import { NavigationBar } from '../../../components/navigation-bar'
import { Footer } from '../../../components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Star, FileText, ClipboardList, Info, DollarSign, Download, ScrollText, Eye, FileText as FileTextIcon, PieChart, Library, Pen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'


type Service = {
  id: number;
  title: string;
  introduction: string;
  notes: string;
  required_documents: string;
  steps: Array<{ step: number; description: string }>;
  fees: string;
  subcategory: number;
  created_at: string;
  updated_at: string;
  documents: Array<{
    id: number;
    title: string;
    description: string;
    file: string;
    is_template: boolean;
    created_at: string;
    updated_at: string;
  }>;
};

type Category = {
  id: number;
  name: string;
  description: string;
  icon_name: string;
};

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categorySlug = Array.isArray(params.category) 
    ? params.category[0]?.toLowerCase() 
    : params.category?.toLowerCase();
  const serviceSlug = Array.isArray(params.service) 
    ? params.service[0] || ''
    : params.service || '';

  // Array of categories for consistent ordering
  const categories = [
    { id: "intro", name: "مقدمة", icon: ScrollText },
    { id: "notes", name: "ملاحظات", icon: Info },
    { id: "downloads", name: "التحميلات", icon: FileTextIcon },
    { id: "steps", name: "الخطوات", icon: PieChart },
    { id: "required-documents", name: "المستندات", icon: Library },
    { id: "fees", name: "الرسوم", icon: Pen },
  ];

  // Create refs for each section for scroll tracking
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sidebarItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Convert URL slug to proper category name, handling special characters
        const categoryName = decodeURIComponent(categorySlug)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        console.log('Fetching category:', categoryName);
        const categoryResponse = await fetch(`http://localhost:8000/api/procedures/categories/?name=${encodeURIComponent(categoryName)}`);
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category data');
        }
        const categoryData = await categoryResponse.json();
        
        if (!Array.isArray(categoryData) || categoryData.length === 0) {
          console.log('No category found with name:', categoryName);
          throw new Error('Category not found');
        }

        const categoryInfo = categoryData[0];
        setCategory(categoryInfo);

        // Fetch all procedures for this category
        const proceduresResponse = await fetch(`http://localhost:8000/api/procedures/`);
        if (!proceduresResponse.ok) {
          throw new Error('Failed to fetch procedures');
        }
        const procedures = await proceduresResponse.json();

        // Find the matching procedure by title, handling special characters
        const matchingService = procedures.find((p: Service) => 
          p.title.toLowerCase()
            .replace(/[&]/g, 'and')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '') === serviceSlug
        );

        if (matchingService) {
          setService(matchingService);
        } else {
          throw new Error('Service not found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, serviceSlug]);

  // Set up intersection observer to track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            categories.forEach(cat => {
              const sidebarItem = sidebarItemRefs.current[cat.id];
              if (sidebarItem) {
                if (cat.id === id) {
                  sidebarItem.classList.add('bg-[#f0f9ff]', 'border-l-4', 'border-[#037F8C]');
                } else {
                  sidebarItem.classList.remove('bg-[#f0f9ff]', 'border-l-4', 'border-[#037F8C]');
                }
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    categories.forEach(cat => {
      const section = document.getElementById(cat.id);
      if (section) {
        sectionRefs.current[cat.id] = section;
        observer.observe(section);
      }
    });

    return () => {
      categories.forEach(cat => {
        const section = sectionRefs.current[cat.id];
        if (section) observer.unobserve(section);
      });
    };
  }, []);

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

  if (error || !service || !category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
        <NavigationBar />
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center text-red-500">
            <h2 className="text-xl font-semibold mb-2">Error Loading Service</h2>
            <p>{error || 'Service not found'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <NavigationBar />
      
      {/* Full width hero section with relative positioning */}
      <section className="w-full bg-[#022840] text-white py-20 px-4 mb-0 relative">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="text-lg mt-2">{service.introduction}</p>
        </div>
      </section>
      
      {/* Breadcrumb navigation */}
      <div className="bg-white py-3 px-4 border-b mb-8">
        <div className="container mx-auto max-w-6xl flex items-center text-sm">
          <Link href="/" className="text-[#037F8C] hover:underline">الرئيسية</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href="/services" className="text-[#037F8C] hover:underline">الخدمات الحكومية</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href={`/services/${categorySlug}`} className="text-[#037F8C] hover:underline">
            {category.name}
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-500">{service.title}</span>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto max-w-6xl px-4 pt-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-4 space-y-2">
              {categories.map((category) => (
                <a 
                  key={category.id}
                  href={`#${category.id}`} 
                  className="bg-white shadow-sm p-3 text-center hover:bg-[#f5f5f5] transition flex items-center rounded-md"
                >
                  <category.icon className="h-5 w-5 text-[#667085] mr-3" />
                  <span className="text-[#025373] text-sm font-medium">{category.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Introduction section */}
            <section id="intro" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8 space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div className="space-y-4 flex-1">
                      <h1 className="text-3xl font-bold text-[#022840]">{service.title}</h1>
                      <p className="text-lg text-[#025373]">{service.introduction}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <Clock className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">وقت المعالجة</p>
                            <p className="font-medium">2-3 أيام</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <Star className="w-5 h-5 fill-[#037F8C] text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">التقييم</p>
                            <p className="font-medium">4.8 (100+ تقييم)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <DollarSign className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">رسوم الخدمة</p>
                            <p className="font-medium">{service.fees}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <FileText className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">المستندات</p>
                            <p className="font-medium">مطلوبة</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 md:w-1/3">
                      <div className="p-4 bg-[#f0f9ff] rounded-md border border-[#d0e7ff]">
                        <h3 className="font-medium text-[#022840] mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" /> معلومات مهمة
                        </h3>
                        <p className="text-sm text-[#025373]">
                          يرجى التأكد من جاهزية جميع المستندات المطلوبة قبل بدء طلبك. قد تتأخر الطلبات التي تفتقر إلى المستندات المطلوبة.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Notes Section */}
            <section id="notes" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">ملاحظات</h2>
                  <div className="space-y-3 text-[#025373]">
                    {service.notes.split('\n').map((note, index) => (
                      <p key={index}>• {note}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Downloads Section */}
            <section id="downloads" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">التحميلات</h2>
                  {service.documents && service.documents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.documents.map((doc) => (
                        <Card key={doc.id} className="border border-gray-200 hover:border-[#037F8C] transition-colors h-full">
                          <CardContent className="p-4 flex flex-col h-full">
                            <div className="flex items-start gap-3 flex-grow">
                              <div className="bg-[#f0f9ff] p-2 rounded-md">
                                <FileTextIcon className="w-6 h-6 text-[#037F8C]" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-[#022840]">{doc.title}</h3>
                                {doc.description && (
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-3">{doc.description}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-4 w-full">
                              <Button 
                                variant="outline" 
                                className="gap-2 w-full"
                                asChild
                              >
                                <Link href={doc.file}>
                                  <Download className="w-4 h-4" />
                                  {doc.is_template ? 'تحميل النموذج' : 'تحميل المستند'}
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p>لا توجد مستندات متاحة لهذه الخدمة.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Steps Section */}
            <section id="steps" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">الخطوات</h2>
                  <ol className="list-decimal list-inside text-[#025373] space-y-4">
                    {service.steps.map((step) => (
                      <li key={step.step} className="flex items-start">
                        <span className="mr-2">{step.step}.</span>
                        <div>
                          <p className="font-medium">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </section>

            {/* Required Documents Section */}
            <section id="required-documents" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">المستندات المطلوبة</h2>
                  <ul className="list-disc list-inside text-[#025373] space-y-2">
                    {typeof service.required_documents === 'string' 
                      ? service.required_documents.split('\n').map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))
                      : <li>لا توجد مستندات مطلوبة</li>
                    }
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Fees Section */}
            <section id="fees" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">الرسوم</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-[#025373] font-medium">رسوم الخدمة</span>
                      <span className="text-[#037F8C] font-semibold">{service.fees}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">* يمكن الدفع باستخدام بطاقة الائتمان أو بطاقة الخصم أو التحويل المصرفي.</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
