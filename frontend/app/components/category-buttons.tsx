import { Button } from "@/components/ui/button"
import { FileText, XCircle, FileCodeIcon as FileContract, Heart, Landmark, Receipt, MessageSquare, Home, Package, FileSignature, FileCheck, Zap, Users, Scale, Car, Umbrella, Activity, Shield } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: "Autorisations", icon: FileText, color: "text-blue-500", href: "/documents/autorisations" },
  { name: "Résiliation de Contrat", icon: XCircle, color: "text-red-500", href: "/documents/resiliation-contrat" },
  { name: "Contrats", icon: FileContract, color: "text-green-500", href: "/documents/contrats" },
  { name: "Demandes mariage", icon: Heart, color: "text-pink-500", href: "/documents/demandes-mariage" },
  { name: "Demandes banques", icon: Landmark, color: "text-purple-500", href: "/documents/demandes-banques" },
  { name: "Demandes impôts", icon: Receipt, color: "text-yellow-500", href: "/documents/demandes-impots" },
  { name: "Plaintes", icon: MessageSquare, color: "text-orange-500", href: "/documents/plaintes" },
  { name: "Construire", icon: Home, color: "text-indigo-500", href: "/documents/construire" },
  { name: "Services divers et autres", icon: Package, color: "text-gray-500", href: "/documents/services-divers" },
  { name: "Renonciations", icon: FileSignature, color: "text-teal-500", href: "/documents/renonciations" },
  { name: "Déclarations", icon: FileCheck, color: "text-cyan-500", href: "/documents/declarations" },
  { name: "L'eau et à l'électricité", icon: Zap, color: "text-amber-500", href: "/documents/eau-electricite" },
  { name: "L'état civil", icon: Users, color: "text-lime-500", href: "/documents/etat-civil" },
  { name: "Engagements et obligations", icon: Scale, color: "text-emerald-500", href: "/documents/engagements-obligations" },
  { name: "Résiliation d'engagement de dette", icon: XCircle, color: "text-rose-500", href: "/documents/resiliation-dette" },
  { name: "Contrat de location de locaux", icon: Home, color: "text-fuchsia-500", href: "/documents/contrat-location" },
  { name: "Demande ou de plainte", icon: MessageSquare, color: "text-sky-500", href: "/documents/demande-plainte" },
  { name: "Renonciation pour véhicules", icon: Car, color: "text-violet-500", href: "/documents/renonciation-vehicules" },
  { name: "Renonciation à des plaintes", icon: FileSignature, color: "text-stone-500", href: "/documents/renonciation-plaintes" },
  { name: "Renonciation accidents de la route", icon: Car, color: "text-slate-500", href: "/documents/renonciation-accidents" },
  { name: "Assurance automobile", icon: Car, color: "text-blue-600", href: "/documents/assurance-automobile" },
  { name: "Assurance nationale", icon: Umbrella, color: "text-green-600", href: "/documents/assurance-nationale" },
  { name: "Documents pour l'assurance moto", icon: Car, color: "text-yellow-600", href: "/documents/assurance-moto" },
  { name: "Documents pour l'assurance Allianz", icon: Shield, color: "text-red-600", href: "/documents/assurance-allianz" },
  { name: "Assurance santé", icon: Activity, color: "text-purple-600", href: "/documents/assurance-sante" },
  { name: "Assurance médicale", icon: Activity, color: "text-pink-600", href: "/documents/assurance-medicale" },
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
    </div>
  )
}

