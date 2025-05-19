'use client';
import { NavigationBar } from './components/navigation-bar'
import { SearchForm } from './components/search-form'
import { CategoryMenu } from './components/category-menu'
import { Footer } from './components/footer'
import { FileText } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([null, null, null, null, null, null, null, null]);
  
  const handleCategoryClick = (categoryId: number) => {
    // Toggle selection
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    
    // Close all other dropdowns
    detailsRefs.current.forEach((details, index) => {
      if (details && index + 1 !== categoryId) {
        details.open = false;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <NavigationBar />
      
      {/* Extended background section that contains both hero and cards */}
      <div className="bg-[url('/bg-zalij.png')] bg-cover pb-32">
        {/* Hero Section - Increased horizontal padding only */}
        <section className="relative py-4 px-8 md:px-12 lg:px-16 pb-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#022840] leading-tight">
                    Commencez à explorer les services administratifs au{' '}
                    <span className="text-[#A66C4B]">Maroc</span>
                  </h1>
                  <p className="text-sm md:text-base text-[#022840]/70 max-w-sm">
                    Trouvez et gérez vos documents administratifs facilement avec l'aide de nos experts locaux.
                  </p>
                </div>
                <div className="mt-5">
                  <SearchForm />
                </div>
              </div>

              {/* Image Grid - Added horizontal breathing room */}
              <div className="relative h-[350px] hidden lg:block my-6 px-4">
                {/* Main Image - Refined styling with horizontal space */}
                <div className="absolute right-6 top-6 w-[85%] h-[280px] rounded-xl overflow-hidden shadow-lg z-20">
                  <img
                    src="https://images.pexels.com/photos/7012257/pexels-photo-7012257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Bureau administratif moderne"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Decorative Elements - More subtle */}
                <div className="absolute right-[10%] top-[22%] w-10 h-10 rounded-full bg-[#A66C4B]/5" />
                <div className="absolute left-[15%] top-[40%] w-14 h-14 rounded-full border-2 border-[#022840]/5" />
              </div>
            </div>
          </div>
          
          {/* Category Cards - Positioned to overlap with hero section bottom */}
          <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/3 z-30">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="bg-transparent">
                <CategoryMenu />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Documents Search Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#022840] mb-3">Recherche d'Administrations</h2>
            <p className="text-[#555] text-lg max-w-2xl mx-auto">Trouvez facilement les administrations et bureaux dont vous avez besoin pour vos démarches administratives.</p>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <select className="w-full py-2 bg-transparent border-b-2 border-[#037F8C] text-[#333] focus:outline-none">
                  <option value="" disabled selected>Sélectionner une ville</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="rabat">Rabat</option>
                  <option value="marrakech">Marrakech</option>
                  <option value="fes">Fès</option>
                  <option value="tanger">Tanger</option>
                </select>
              </div>
              <div>
                <select className="w-full py-2 bg-transparent border-b-2 border-[#037F8C] text-[#333] focus:outline-none">
                  <option value="" disabled selected>Type de service</option>
                  <option value="documents-personnels">Documents personnels</option>
                  <option value="services-sociaux">Services sociaux</option>
                  <option value="taxes-et-impots">Taxes et impôts</option>
                  <option value="entreprises">Services aux entreprises</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar Categories */}
            <div className="border border-gray-100 rounded-xl p-5 overflow-y-scroll md:w-[270px] max-h-[600px] scrollbar-hide">
              <h3 className="text-lg font-medium text-[#022840] mb-5">Catégories d'administrations</h3>

              <div className="space-y-3">
                {/* 1. Administrations Communales */}
                <div>
                  <details 
                    className="group" 
                    ref={el => { detailsRefs.current[0] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 1 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(1)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Administrations Communales</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Arrondissements</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Annexes administratives</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Wilayas</div>
                    </div>
                  </details>
                </div>

                {/* 2. Services Judiciaires */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[1] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 2 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(2)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services Judiciaires</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Tribunaux de Première Instance</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Cours d'Appel</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Tribunaux Administratifs</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Tribunaux de Commerce</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Adouls</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Notaires</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Huissiers de Justice</div>
                    </div>
                  </details>
                </div>

                {/* 3. Services de Sécurité */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[2] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 3 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(3)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services de Sécurité</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Commissariats de Police</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Gendarmerie Royale</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Postes de Police</div>
                    </div>
                  </details>
                </div>

                {/* 4. Services Fiscaux et Financiers */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[3] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 4 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(4)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services Fiscaux et Financiers</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Centres des Impôts</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Perceptions (Recettes)</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Trésorerie Générale</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Bureaux de Douane</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Agences Bancaires Al Barid Bank</div>
                    </div>
                  </details>
                </div>

                {/* 5. Santé et Protection Sociale */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[4] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 5 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(5)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Santé et Protection Sociale</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Bureaux CNSS</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Centres AMO</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Bureaux RAMED</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Agences ANAPEC</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Centres de Santé</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Hôpitaux Publics</div>
                    </div>
                  </details>
                </div>

                {/* 6. Services Fonciers et Techniques */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[5] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 6 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(6)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services Fonciers et Techniques</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Conservation Foncière</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Cadastre</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Agences Urbaines</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Centres d'Immatriculation de Véhicules</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Bureaux d'Études Techniques</div>
                    </div>
                  </details>
                </div>
                
                {/* 7. Services aux Entreprises */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[6] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 7 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(7)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services aux Entreprises</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Centres Régionaux d'Investissement</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Registre de Commerce</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">OMPIC</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Chambres de Commerce et d'Industrie</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">CNSS Entreprises</div>
                    </div>
                  </details>
                </div>

                {/* 8. Services Publics de Base */}
                <div>
                  <details 
                    className="group"
                    ref={el => { detailsRefs.current[7] = el; }}
                  >
                    <summary 
                      className={`flex items-center justify-between cursor-pointer list-none rounded-lg p-2 ${selectedCategory === 8 ? 'bg-gray-100' : ''}`}
                      onClick={() => handleCategoryClick(8)}
                    >
                      <span className="text-sm font-medium text-[#022840]">Services Publics de Base</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Bureaux de Poste</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Agences ONEE</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Régies de Distribution (Amendis, Lydec, etc.)</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">Agences de Télécommunications</div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="md:col-span-3 border border-gray-100 rounded-xl p-6 min-h-[600px] md:ml-6">
              {/* Empty state - show only when no filters are selected */}
              <div className="text-center text-gray-400 mt-16 hidden">
                <p className="text-xl mb-2">Aucun résultat à afficher</p>
                <p>Veuillez sélectionner une ville et un type de service pour voir les résultats</p>
              </div>
              
              {/* Results display */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Administration Communale results */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-blue-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-blue-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">Arrondissement Hay Hassani</h4>
                    <p className="text-sm text-gray-500">Avenue Hassan II, Hay Hassani, Casablanca</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Certificats administratifs</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">État civil</span>
                    </div>
                  </div>
                </div>

                {/* Services Judiciaires result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-amber-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-amber-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">Tribunal de Première Instance de Casablanca</h4>
                    <p className="text-sm text-gray-500">Boulevard Mohamed V, Centre-ville, Casablanca</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Affaires civiles</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Affaires familiales</span>
                    </div>
                  </div>
                </div>
 
                {/* Services Fiscaux result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-green-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-green-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">Direction Régionale des Impôts</h4>
                    <p className="text-sm text-gray-500">Rue Al Moutanabi, Maârif, Casablanca</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Impôt sur le revenu</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">TVA</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Impôt foncier</span>
                    </div>
                  </div>
                </div>

                {/* Services Publics de Base result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-purple-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-purple-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">Bureau de Poste Al Fida</h4>
                    <p className="text-sm text-gray-500">Avenue Mohamed VI, Al Fida, Casablanca</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Services postaux</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Services financiers</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Services administratifs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500">
                    &lt;
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center bg-[#022840] text-white">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

