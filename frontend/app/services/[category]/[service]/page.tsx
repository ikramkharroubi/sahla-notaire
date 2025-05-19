'use client'

import { useParams } from 'next/navigation'
import { NavigationBar } from '../../../components/navigation-bar'
import { Footer } from '../../../components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Star, FileText, ClipboardList, Info, DollarSign, Download, ScrollText, Eye, FileText as FileTextIcon, PieChart, Library, Pen } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

// Copy the categoryData from your main category page
const categoryData = {
  "power-of-attorney": {
    title: "Power of Attorney Services",
    description: "Authorize others to act on your behalf with official power of attorney documents",
    services: [
      {
        name: "General Power of Attorney",
        description: "Broad authorization for financial and legal matters",
        processing: "2-3 days",
        rating: "4.8",
        reviews: "1,245",
        price: "150",
      },
      {
        name: "Special Power of Attorney",
        description: "Limited authorization for specific transactions",
        processing: "1-2 days",
        rating: "4.9",
        reviews: "892",
        price: "200",
      },
      {
        name: "Property Power of Attorney",
        description: "Authorization for real estate transactions",
        processing: "3-4 days",
        rating: "4.7",
        reviews: "567",
        price: "250",
      },
    ],
  },
  "approvals": {
    title: "Approval Services",
    description: "Obtain official approvals and certifications for various purposes",
    services: [
      {
        name: "Business License Approval",
        description: "Official approval for operating a business",
        processing: "5-7 days",
        rating: "4.6",
        reviews: "789",
        price: "300",
      },
      {
        name: "Product Certification",
        description: "Certification for product quality and standards",
        processing: "7-10 days",
        rating: "4.7",
        reviews: "456",
        price: "500",
      },
      {
        name: "Event Permit Approval",
        description: "Official approval for organizing public events",
        processing: "3-5 days",
        rating: "4.8",
        reviews: "234",
        price: "150",
      },
    ],
  },
  "building-permits": {
    title: "Building Permit Services",
    description: "Apply for and manage construction and renovation permits",
    services: [
      {
        name: "New Construction Permit",
        description: "Permit for new building construction",
        processing: "7-10 days",
        rating: "4.5",
        reviews: "678",
        price: "1000",
      },
      {
        name: "Renovation Permit",
        description: "Permit for major home or building renovations",
        processing: "3-5 days",
        rating: "4.7",
        reviews: "543",
        price: "500",
      },
      {
        name: "Demolition Permit",
        description: "Permit for building demolition",
        processing: "2-4 days",
        rating: "4.6",
        reviews: "321",
        price: "750",
      },
    ],
  },
};

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function ServiceDetailPage() {
  const params = useParams();
  const category = Array.isArray(params.category) 
    ? params.category[0]?.toLowerCase() 
    : params.category?.toLowerCase();
  const serviceSlug = Array.isArray(params.service) 
    ? params.service[0] || ''
    : params.service || '';

  const data = categoryData[category as keyof typeof categoryData] || { services: [] };
  const service = data.services.find(
    (s: { name: string }) => slugify(s.name) === serviceSlug
  );

  // Use real data if found, otherwise use placeholders
  const displayService = service || {
    name: "Service Name (Placeholder)",
    description: "This is a placeholder description for the service.",
    processing: "TBA",
    rating: "N/A",
    reviews: "0",
    price: "TBA",
  };

  // Array of categories for consistent ordering
  const categories = [
    { id: "intro", name: "Introduction", icon: ScrollText },
    { id: "notes", name: "Notes", icon: Info },
    { id: "downloads", name: "Downloads", icon: FileTextIcon },
    { id: "steps", name: "Steps", icon: PieChart },
    { id: "required-documents", name: "Documents", icon: Library },
    { id: "fees", name: "Fees", icon: Pen },
  ];

  // Create refs for each section for scroll tracking
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sidebarItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  
  // Set up intersection observer to track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Update active state for sidebar item
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
      { threshold: 0.3 } // When 30% of the element is visible
    );

    // Observe all sections
    categories.forEach(cat => {
      const section = document.getElementById(cat.id);
      if (section) {
        sectionRefs.current[cat.id] = section;
        observer.observe(section);
      }
    });

    return () => {
      // Clean up observer
      categories.forEach(cat => {
        const section = sectionRefs.current[cat.id];
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <NavigationBar />
      
      {/* Full width hero section with relative positioning */}
      <section className="w-full bg-[#022840] text-white py-20 px-4 mb-0 relative">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{displayService.name}</h1>
          <p className="text-lg mt-2">{displayService.description}</p>
        </div>
      </section>
      
      {/* Breadcrumb navigation in English with left-to-right alignment */}
      <div className="bg-white py-3 px-4 border-b mb-8">
        <div className="container mx-auto max-w-6xl flex items-center text-sm">
          <Link href="/" className="text-[#037F8C] hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href="/services" className="text-[#037F8C] hover:underline">Government Services</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href={`/services/${category}`} className="text-[#037F8C] hover:underline">
            {data?.title || "Services"}
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-500">Personal Documents</span>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto max-w-6xl px-4 pt-8">
        <div className="flex gap-6">
          {/* Sidebar with the same category cards */}
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
                      <h1 className="text-3xl font-bold text-[#022840]">{displayService.name}</h1>
                      <p className="text-lg text-[#025373]">{displayService.description}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <Clock className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">Processing Time</p>
                            <p className="font-medium">{displayService.processing}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <Star className="w-5 h-5 fill-[#037F8C] text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">Rating</p>
                            <p className="font-medium">{displayService.rating} ({displayService.reviews} reviews)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <DollarSign className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">Service Fee</p>
                            <p className="font-medium">${displayService.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#025E73]">
                          <FileText className="w-5 h-5 text-[#037F8C]" />
                          <div>
                            <p className="text-sm text-gray-500">Documents</p>
                            <p className="font-medium">4 Required</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 md:w-1/3">
                      <div className="p-4 bg-[#f0f9ff] rounded-md border border-[#d0e7ff]">
                        <h3 className="font-medium text-[#022840] mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" /> Important Information
                        </h3>
                        <p className="text-sm text-[#025373]">
                          Please ensure all required documents are ready before starting your application. Applications with missing documents may be delayed.
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
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">Notes</h2>
                  <div className="space-y-3 text-[#025373]">
                    <p>• All documents must be submitted in PDF format.</p>
                    <p>• Processing time may vary depending on the completeness of your application.</p>
                    <p>• You will receive notifications about your application status via email.</p>
                    <p>• For any inquiries, please contact our support team at support@example.com.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Documents to Download Section */}
            <section id="downloads" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">Documents to Download</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4 flex items-center">
                      <FileText className="text-[#025E73] mr-3" />
                      <div>
                        <h3 className="font-medium">Application Form</h3>
                        <Button variant="link" className="p-0 h-auto text-[#037F8C]">Download PDF</Button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4 flex items-center">
                      <FileText className="text-[#025E73] mr-3" />
                      <div>
                        <h3 className="font-medium">Guidelines</h3>
                        <Button variant="link" className="p-0 h-auto text-[#037F8C]">Download PDF</Button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4 flex items-center">
                      <FileText className="text-[#025E73] mr-3" />
                      <div>
                        <h3 className="font-medium">Document Checklist</h3>
                        <Button variant="link" className="p-0 h-auto text-[#037F8C]">Download PDF</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Steps Section */}
            <section id="steps" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">Steps</h2>
                  <ol className="list-decimal list-inside text-[#025373] space-y-4">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <div>
                        <p className="font-medium">Complete the application form</p>
                        <p className="text-sm mt-1">Fill out all required fields in the application form</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <div>
                        <p className="font-medium">Attach required documents</p>
                        <p className="text-sm mt-1">Upload all necessary documents in PDF format</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <div>
                        <p className="font-medium">Pay the fees</p>
                        <p className="text-sm mt-1">Complete the payment process</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <div>
                        <p className="font-medium">Submit the application</p>
                        <p className="text-sm mt-1">Review and submit your completed application</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            {/* Required Documents Section */}
            <section id="required-documents" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">Required Documents</h2>
                  <ul className="list-disc list-inside text-[#025373] space-y-2">
                    <li>Passport Copy</li>
                    <li>National ID</li>
                    <li>Application Form</li>
                    <li>Proof of Address</li>
                  </ul>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#022840]">Requirements</h3>
                    <ul className="list-disc list-inside text-[#025373] space-y-2">
                      <li>Applicant must be 18+ years old</li>
                      <li>Valid residency status</li>
                      <li>All documents must be valid and not expired</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fees Section */}
            <section id="fees" className="mb-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-[#022840]">Fees</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-[#025373] font-medium">Service Fee</span>
                      <span className="text-[#037F8C] font-semibold">${displayService.price}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-[#025373] font-medium">Processing Fee</span>
                      <span className="text-[#037F8C] font-semibold">$10</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#025373] font-medium text-lg">Total</span>
                      <span className="text-[#037F8C] font-bold text-lg">${parseInt(displayService.price) + 10}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">* Payment can be made using credit card, debit card, or bank transfer.</p>
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
