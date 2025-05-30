"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { ChevronDown, Settings, LogOut } from 'lucide-react'
import { Users, Scale, Home, Car, GraduationCap, Heart, FileText, PenTool, FileSearch, Calendar, HelpCircle, FileCheck, Bot, Search, MapPin, Map, HeadphonesIcon, Info, BookOpen, Phone, Mail, Building2, Briefcase, ScrollText, Coins, UserCircle2, CircleDollarSign } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const menuCategories = [
  {
    title: "الدليل الإداري",
    items: [
      { name: "إجراءات الحالة المدنية", href: "/services/civil-status", icon: Users },
      { name: "الإجراءات القانونية", href: "/services/legal", icon: Scale },
      { name: "الممتلكات والإسكان", href: "/services/property", icon: Home },
      { name: "تسجيل المركبات", href: "/services/vehicle", icon: Car },
      { name: "خدمات التعليم", href: "/services/education", icon: GraduationCap },
      { name: "إجراءات الزواج", href: "/services/marriage", icon: Heart },
    ]
  },
  {
    title: "المستندات والنماذج",
    items: [
      { name: "النماذج الرسمية", href: "/services/templates", icon: FileText },
      { name: "خدمة ملء النماذج", href: "/services/forms", icon: PenTool },
      { name: "التحقق من المستندات", href: "/services/checker", icon: FileSearch },
      { name: "حجز المواعيد", href: "/services/booking", icon: Calendar },
      { name: "دليل المتطلبات", href: "/services/requirements", icon: HelpCircle },
      { name: "حالة المستندات", href: "/services/status", icon: FileCheck },
    ]
  },
  {
    title: "المساعدة والموارد",
    items: [
      { name: "المساعد الذكي", href: "/services/ai-assistant", icon: Bot },
      { name: "البحث الذكي", href: "/services/search", icon: Search },
      { name: "البحث عن المواقع", href: "/services/location", icon: MapPin },
      { name: "الخرائط التفاعلية", href: "/services/maps", icon: Map },
      { name: "الدعم المباشر", href: "/services/support", icon: HeadphonesIcon },
      { name: "الأسئلة الشائعة", href: "/services/faq", icon: HelpCircle },
    ]
  }
]

const businessMenuItems = [
  { name: "من نحن", href: "/about", icon: Info },
  { name: "فريق العمل", href: "/team", icon: UserCircle2 },
  { name: "قيمنا", href: "/values", icon: Heart },
  { name: "المدونة", href: "/blog", icon: BookOpen },
  { name: "شركاؤنا", href: "/partners", icon: Phone },
  { name: "اتصل بنا", href: "/contact", icon: Mail },
  { name: "الأسئلة الشائعة", href: "/faq", icon: HelpCircle },
]

export function NavigationBar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isBusinessOpen, setIsBusinessOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-[#fefefe]">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/" className="text-[#037F8C] hover:text-[#037F8C]/80">
            الرئيسية
          </Link>
          
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-[#006CE4]">
              الخدمات
              <ChevronDown className="w-4 h-4 mr-1 rtl:rotate-180" />
            </button>
            <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
              <Link href="/documents" className="text-[#037F8C] hover:text-[#037F8C]/80">
                المستندات
              </Link>
              <Link href="/business" className="text-[#037F8C] hover:text-[#037F8C]/80">
                خدمات الأعمال
              </Link>
              <Link href="/government" className="text-[#037F8C] hover:text-[#037F8C]/80">
                الخدمات الحكومية
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-[#006CE4]">
              عن الشركة
              <ChevronDown className="w-4 h-4 mr-1 rtl:rotate-180" />
            </button>
            <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
              {businessMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" className="text-[#037F8C] hover:text-[#037F8C]/80">
            اتصل بنا
          </Link>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <UserCircle2 className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                    الملف الشخصي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                    الإعدادات
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="text-[#037F8C] border-[#037F8C] hover:bg-[#037F8C] hover:text-white">
                تسجيل الدخول
              </Button>
              <Button className="bg-[#037F8C] text-white hover:bg-[#037F8C]/90">
                إنشاء حساب
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

