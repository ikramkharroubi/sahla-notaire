import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { CategoryGrid } from '../../components/category-grid'

export default function DocumentCategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-[#086f7a]">Catégories de Documents</h1>
              <p className="text-xl text-gray-600">Sélectionnez une catégorie pour accéder aux documents et procédures administratives</p>
            </div>
            <CategoryGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

