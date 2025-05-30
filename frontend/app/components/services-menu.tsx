import { FileText, Building2, Heart, Users, Scale, FileCodeIcon as FileContract, MessageSquare, MoreHorizontal } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ServicesMenu() {
  const services = [
    { icon: FileText, label: "الوكالة القانونية", href: "/services/power-of-attorney" },
    { icon: Building2, label: "تراخيص البناء", href: "/services/building-permits" },
    { icon: Heart, label: "خدمات الزواج", href: "/services/marriage" },
    { icon: Users, label: "الحالة المدنية", href: "/services/civil-status" },
    { icon: Scale, label: "الالتزامات", href: "/services/obligations" },
    { icon: FileContract, label: "العقود", href: "/services/contracts" },
    { icon: MessageSquare, label: "الشكاوى", href: "/services/complaints" },
  ]

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-8 overflow-x-auto py-4 flex-grow">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="flex flex-col items-center gap-1 min-w-[64px] text-sm text-gray-600 hover:text-[#0B2644] group"
              >
                <div className="p-2 rounded-lg group-hover:bg-[#0B2644]/5 transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="text-center whitespace-nowrap">{service.label}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/categories"
            className="flex flex-col items-center gap-1 min-w-[64px] text-sm text-[#A66C4B] hover:text-[#0B2644] ml-4 group"
          >
            <div className="p-2 rounded-lg group-hover:bg-[#0B2644]/5 transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </div>
            <span className="text-center whitespace-nowrap">المزيد من الخدمات</span>
          </Link>
        </div>
        <div className="mt-4">
          <Button variant="ghost" className="w-full justify-start">
            تجديد جواز السفر
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            تسجيل الأعمال
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            تجديد رخصة القيادة
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            تسجيل سند الملكية
          </Button>
        </div>
      </div>
    </div>
  )
}

