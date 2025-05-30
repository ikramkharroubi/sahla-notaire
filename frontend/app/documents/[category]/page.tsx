'use client'

import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MapPin, FileText, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Document {
  id: number;
  title: string;
  description: string;
  file: string | null;
  is_template: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  documents: Document[];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Decode the URL slug, replace hyphens with spaces, and then encode for the API call.
        const decodedCategoryName = decodeURIComponent(params.category);
        const categoryNameForApi = decodedCategoryName.replace(/-/g, ' ');

        const response = await fetch(`http://localhost:8000/api/document-categories/?name=${encodeURIComponent(categoryNameForApi)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Category not found');
        }

        setCategory(data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [params.category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-600">Loading documents...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <p className="text-red-600">Error: {error || 'Category not found'}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <Link 
                href="/documents/categories"
                className="text-[#086f7a] hover:text-[#086f7a]/80"
              >
                ← العودة إلى الفئات
              </Link>
              <h1 className="text-3xl font-bold text-[#086f7a]">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.documents && category.documents.length > 0 ? (
                category.documents.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="space-y-4 flex-grow">
                        <div>
                          <h2 className="text-xl font-semibold text-[#086f7a]">{doc.title}</h2>
                          {doc.description && (
                            <p className="text-gray-600 mt-1 line-clamp-3">{doc.description}</p>
                          )}
                        </div>

                        <div className="space-y-2 mt-auto">
                          <h3 className="font-medium text-gray-900">المستند</h3>
                          <div className="flex flex-wrap gap-2">
                            {doc.file ? (
                              <Button
                                variant="outline"
                                className="gap-2 w-full"
                                asChild
                              >
                                <Link href={doc.file}>
                                  <Download className="w-4 h-4" />
                                  {doc.title} {doc.is_template ? '(Template)' : ''}
                                </Link>
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 text-gray-500">
                                <FileText className="w-4 h-4" />
                                <span>المستند غير متوفر</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-2">
                          <p>آخر تحديث: {new Date(doc.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <AlertCircle className="w-12 h-12 text-gray-400" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">لا توجد مستندات متاحة</h3>
                        <p className="text-gray-500">
                          لا توجد مستندات متاحة في هذه الفئة حالياً.
                          يرجى التحقق لاحقاً أو الاتصال بالدعم للمساعدة.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

