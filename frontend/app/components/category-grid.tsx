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
  { name: "Services divers", icon: Package, color: "text-gray-500", href: "/documents/services-divers" },
  { name: "Renonciations", icon: FileSignature, color: "text-teal-500", href: "/documents/renonciations" },
  { name: "Déclarations", icon: FileCheck, color: "text-cyan-500", href: "/documents/declarations" },
  { name: "Eau et électricité", icon: Zap, color: "text-amber-500", href: "/documents/eau-electricite" },
  { name: "État civil", icon: Users, color: "text-lime-500", href: "/documents/etat-civil" },
  { name: "Engagements", icon: Scale, color: "text-emerald-500", href: "/documents/engagements-obligations" },
  { name: "Résiliation dette", icon: XCircle, color: "text-rose-500", href: "/documents/resiliation-dette" },
  { name: "Location locaux", icon: Home, color: "text-fuchsia-500", href: "/documents/contrat-location" },
  { name: "Demande/plainte", icon: MessageSquare, color: "text-sky-500", href: "/documents/demande-plainte" },
  { name: "Renonciation véhicules", icon: Car, color: "text-violet-500", href: "/documents/renonciation-vehicules" },
  { name: "Renonciation plaintes", icon: FileSignature, color: "text-stone-500", href: "/documents/renonciation-plaintes" },
  { name: "Accidents route", icon: Car, color: "text-slate-500", href: "/documents/renonciation-accidents" },
  { name: "Assurance auto", icon: Car, color: "text-blue-600", href: "/documents/assurance-automobile" },
  { name: "Assurance nationale", icon: Umbrella, color: "text-green-600", href: "/documents/assurance-nationale" },
  { name: "Assurance moto", icon: Car, color: "text-yellow-600", href: "/documents/assurance-moto" },
  { name: "Assurance Allianz", icon: Shield, color: "text-red-600", href: "/documents/assurance-allianz" },
  { name: "Assurance santé", icon: Activity, color: "text-purple-600", href: "/documents/assurance-sante" },
  { name: "Assurance médicale", icon: Activity, color: "text-pink-600", href: "/documents/assurance-medicale" },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className="group p-4 rounded-lg bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex flex-col items-center justify-center text-center h-32"
        >
          <category.icon className={`w-8 h-8 ${category.color} mb-2 transition-transform duration-300 group-hover:scale-110`} />
          <span className="text-sm font-medium text-gray-800 line-clamp-2">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}

