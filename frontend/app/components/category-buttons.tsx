import { Button } from "@/components/ui/button"
import { FileText, XCircle, FileCodeIcon as FileContract, Heart, Landmark, Receipt, MessageSquare, Home, Package, FileSignature, FileCheck, Zap, Users, Scale, Car, Umbrella, Activity, Shield, UserRound, Briefcase } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: "التراخيص", icon: FileText, color: "text-blue-500", href: "/documents/autorisations" },
  { name: "إلغاء العقد", icon: XCircle, color: "text-red-500", href: "/documents/resiliation-contrat" },
  { name: "العقود", icon: FileContract, color: "text-green-500", href: "/documents/contrats" },
  { name: "طلبات الزواج", icon: Heart, color: "text-pink-500", href: "/documents/demandes-mariage" },
  { name: "طلبات البنوك", icon: Landmark, color: "text-purple-500", href: "/documents/demandes-banques" },
  { name: "طلبات الضرائب", icon: Receipt, color: "text-yellow-500", href: "/documents/demandes-impots" },
  { name: "الشكاوى", icon: MessageSquare, color: "text-orange-500", href: "/documents/plaintes" },
  { name: "البناء", icon: Home, color: "text-indigo-500", href: "/documents/construire" },
  { name: "خدمات متنوعة", icon: Package, color: "text-gray-500", href: "/documents/services-divers" },
  { name: "التنازلات", icon: FileSignature, color: "text-teal-500", href: "/documents/renonciations" },
  { name: "الإقرارات", icon: FileCheck, color: "text-cyan-500", href: "/documents/declarations" },
  { name: "الماء والكهرباء", icon: Zap, color: "text-amber-500", href: "/documents/eau-electricite" },
  { name: "الحالة المدنية", icon: Users, color: "text-lime-500", href: "/documents/etat-civil" },
  { name: "الالتزامات والواجبات", icon: Scale, color: "text-emerald-500", href: "/documents/engagements-obligations" },
  { name: "إلغاء التزام الديون", icon: XCircle, color: "text-rose-500", href: "/documents/resiliation-dette" },
  { name: "عقد إيجار العقارات", icon: Home, color: "text-fuchsia-500", href: "/documents/contrat-location" },
  { name: "الطلبات والشكاوى", icon: MessageSquare, color: "text-sky-500", href: "/documents/demande-plainte" },
  { name: "التنازل عن المركبات", icon: Car, color: "text-violet-500", href: "/documents/renonciation-vehicules" },
  { name: "التنازل عن الشكاوى", icon: FileSignature, color: "text-stone-500", href: "/documents/renonciation-plaintes" },
  { name: "التنازل عن حوادث الطرق", icon: Car, color: "text-slate-500", href: "/documents/renonciation-accidents" },
  { name: "تأمين السيارات", icon: Car, color: "text-blue-600", href: "/documents/assurance-automobile" },
  { name: "التأمين الوطني", icon: Umbrella, color: "text-green-600", href: "/documents/assurance-nationale" },
  { name: "مستندات تأمين الدراجات", icon: Car, color: "text-yellow-600", href: "/documents/assurance-moto" },
  { name: "مستندات تأمين أليانز", icon: Shield, color: "text-red-600", href: "/documents/assurance-allianz" },
  { name: "التأمين الصحي", icon: Activity, color: "text-purple-600", href: "/documents/assurance-sante" },
  { name: "التأمين الطبي", icon: Activity, color: "text-pink-600", href: "/documents/assurance-medicale" },
]

export function CategoryButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto py-2 px-4 flex items-center justify-start gap-2 text-left hover:bg-gray-100 transition-colors duration-200"
          asChild
        >
          <Link href={category.href}>
            <category.icon className={`w-5 h-5 ${category.color}`} />
            <span className="text-black font-medium">{category.name}</span>
          </Link>
        </Button>
      ))}
      <Button variant="outline" className="w-full justify-start gap-2">
        <UserRound className="w-5 h-5" />
        <span>وثائق شخصية</span>
      </Button>
      <Button variant="outline" className="w-full justify-start gap-2">
        <Briefcase className="w-5 h-5" />
        <span>خدمات الأعمال</span>
      </Button>
      <Button variant="outline" className="w-full justify-start gap-2">
        <Home className="w-5 h-5" />
        <span>الإسكان</span>
      </Button>
      <Button variant="outline" className="w-full justify-start gap-2">
        <Car className="w-5 h-5" />
        <span>النقل</span>
      </Button>
    </div>
  )
}

