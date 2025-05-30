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
                    ابدأ في استكشاف الخدمات الإدارية في{' '}
                    <span className="text-[#A66C4B]">المغرب</span>
                  </h1>
                  <p className="text-sm md:text-base text-[#022840]/70 max-w-sm">
                    اعثر على مستنداتك الإدارية وأدرها بسهولة بمساعدة خبرائنا المحليين.
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
                    alt="مكتب إداري حديث"
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
            <h2 className="text-3xl font-bold text-[#022840] mb-3">البحث عن الإدارات</h2>
            <p className="text-[#555] text-lg max-w-2xl mx-auto">اعثر بسهولة على الإدارات والمكاتب التي تحتاجها لإجراءاتك الإدارية.</p>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <select className="w-full py-2 bg-transparent border-b-2 border-[#037F8C] text-[#333] focus:outline-none">
                  <option value="" disabled selected>اختر المدينة</option>
                  <option value="casablanca">الدار البيضاء</option>
                  <option value="rabat">الرباط</option>
                  <option value="marrakech">مراكش</option>
                  <option value="fes">فاس</option>
                  <option value="tanger">طنجة</option>
                </select>
              </div>
              <div>
                <select className="w-full py-2 bg-transparent border-b-2 border-[#037F8C] text-[#333] focus:outline-none">
                  <option value="" disabled selected>نوع الخدمة</option>
                  <option value="documents-personnels">المستندات الشخصية</option>
                  <option value="services-sociaux">الخدمات الاجتماعية</option>
                  <option value="taxes-et-impots">الضرائب والرسوم</option>
                  <option value="entreprises">خدمات الشركات</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar Categories */}
            <div className="border border-gray-100 rounded-xl p-5 overflow-y-scroll md:w-[270px] max-h-[600px] scrollbar-hide">
              <h3 className="text-lg font-medium text-[#022840] mb-5">فئات الإدارات</h3>

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
                      <span className="text-sm font-medium text-[#022840]">الإدارات المحلية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المقاطعات</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المكاتب الإدارية الفرعية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الولايات</div>
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
                      <span className="text-sm font-medium text-[#022840]">الخدمات القضائية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">محاكم الدرجة الأولى</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">محاكم الاستئناف</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المحاكم الإدارية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المحاكم التجارية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">العدول</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الموثقون</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المحضرون القضائيون</div>
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
                      <span className="text-sm font-medium text-[#022840]">خدمات الأمن</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز الشرطة</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الدرك الملكي</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز الشرطة المحلية</div>
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
                      <span className="text-sm font-medium text-[#022840]">الخدمات المالية والضريبية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز الضرائب</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المحاسبات</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الخزينة العامة</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مكاتب الجمارك</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">وكالات البريد المصرفي</div>
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
                      <span className="text-sm font-medium text-[#022840]">الصحة والحماية الاجتماعية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مكاتب الصندوق الوطني للضمان الاجتماعي</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز التأمين الإجباري</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مكاتب الراميد</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">وكالات الوكالة الوطنية للتشغيل</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز الصحة</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المستشفيات العمومية</div>
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
                      <span className="text-sm font-medium text-[#022840]">الخدمات العقارية والتقنية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المحافظة العقارية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الطابو</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الوكالات الحضرية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مراكز تسجيل السيارات</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مكاتب الدراسات التقنية</div>
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
                      <span className="text-sm font-medium text-[#022840]">خدمات الشركات</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المراكز الجهوية للاستثمار</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">سجل التجارة</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">المكتب المغربي للملكية الصناعية والتجارية</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">غرف التجارة والصناعة</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">الصندوق الوطني للضمان الاجتماعي للشركات</div>
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
                      <span className="text-sm font-medium text-[#022840]">الخدمات الأساسية</span>
                    </summary>
                    <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-100 pl-3">
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">مكاتب البريد</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">وكالات المكتب الوطني للكهرباء والماء</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">شركات التوزيع</div>
                      <div className="text-xs text-[#333] py-1 hover:text-[#037F8C] cursor-pointer">وكالات الاتصالات</div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="md:col-span-3 border border-gray-100 rounded-xl p-6 min-h-[600px] md:ml-6">
              {/* Empty state - show only when no filters are selected */}
              <div className="text-center text-gray-400 mt-16 hidden">
                <p className="text-xl mb-2">لا توجد نتائج للعرض</p>
                <p>الرجاء اختيار المدينة ونوع الخدمة لرؤية النتائج</p>
              </div>
              
              {/* Results display */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Administration Communale results */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-blue-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-blue-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">مقاطعة حي الحسني</h4>
                    <p className="text-sm text-gray-500">شارع الحسن الثاني، حي الحسني، الدار البيضاء</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الشهادات الإدارية</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الحالة المدنية</span>
                    </div>
                  </div>
                </div>

                {/* Services Judiciaires result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-amber-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-amber-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">محكمة الدرجة الأولى بالدار البيضاء</h4>
                    <p className="text-sm text-gray-500">شارع محمد الخامس، وسط المدينة، الدار البيضاء</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">القضايا المدنية</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">القضايا الأسرية</span>
                    </div>
                  </div>
                </div>
 
                {/* Services Fiscaux result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-green-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-green-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">المديرية الجهوية للضرائب</h4>
                    <p className="text-sm text-gray-500">شارع المتنبي، المعاريف، الدار البيضاء</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">ضريبة الدخل</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الضريبة على القيمة المضافة</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الضريبة العقارية</span>
                    </div>
                  </div>
                </div>

                {/* Services Publics de Base result */}
                <div className="border border-gray-100 rounded-lg p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-[#037F8C]/20 hover:bg-purple-50/10 cursor-pointer">
                  <div className="w-12 h-12 rounded-md bg-purple-50 border border-gray-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#022840]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#022840]">مكتب البريد الفداء</h4>
                    <p className="text-sm text-gray-500">شارع محمد السادس، الفداء، الدار البيضاء</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الخدمات البريدية</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الخدمات المالية</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">الخدمات الإدارية</span>
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

