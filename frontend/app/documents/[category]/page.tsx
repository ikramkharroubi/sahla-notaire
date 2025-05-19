import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MapPin } from 'lucide-react'
import Link from 'next/link'

type DocumentData = {
  title: string;
  description: string;
  locations: string[];
  documents: Array<{
    name: string;
    format: string;
    url: string;
  }>;
};

const categoryData: Record<string, DocumentData[]> = {
  "identity": [
    {
      title: "Carte Nationale d'Identité Électronique",
      description: "Procédure pour l'obtention ou le renouvellement de la CNIE",
      locations: ["Arrondissement 1", "Commune X", "Province Y"],
      documents: [
        { name: "Formulaire CNIE", format: "DOCX", url: "/documents/cnie-form.docx" },
        { name: "Liste des pièces", format: "PDF", url: "/documents/cnie-requirements.pdf" }
      ]
    }
  ],
  "property": [
    {
      title: "Certificat de Propriété",
      description: "Demande d'un certificat de propriété",
      locations: ["Conservation Foncière", "Commune Z"],
      documents: [
        { name: "Demande de certificat", format: "DOCX", url: "/documents/property-request.docx" }
      ]
    }
  ],
  // Add more categories as needed
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const documents = categoryData[params.category] || [];
  
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
                ← Retour aux catégories
              </Link>
              <h1 className="text-3xl font-bold text-[#086f7a] capitalize">
                Documents {params.category.replace('-', ' ')}
              </h1>
            </div>
            
            <div className="grid gap-6">
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold text-[#086f7a]">{doc.title}</h2>
                          <p className="text-gray-600 mt-1">{doc.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900">Localisation</h3>
                          <div className="flex flex-wrap gap-2">
                            {doc.locations.map((location, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                              >
                                <MapPin className="w-4 h-4" />
                                {location}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900">Documents disponibles</h3>
                          <div className="flex flex-wrap gap-2">
                            {doc.documents.map((document, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                className="gap-2"
                                asChild
                              >
                                <Link href={document.url}>
                                  <Download className="w-4 h-4" />
                                  {document.name} ({document.format})
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-600">
                    Aucun document disponible pour cette catégorie pour le moment.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

