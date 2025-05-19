"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { ChevronDown } from 'lucide-react'
import { Users, Scale, Home, Car, GraduationCap, Heart, FileText, PenTool, FileSearch, Calendar, HelpCircle, FileCheck, Bot, Search, MapPin, Map, HeadphonesIcon, Info, BookOpen, Phone, Mail, Building2, Briefcase, ScrollText, Coins, UserCircle2, CircleDollarSign } from 'lucide-react'

const menuCategories = [
  {
    title: "Administrative Guides",
    items: [
      { name: "Civil Status Procedures", href: "/services/civil-status", icon: Users },
      { name: "Legal Procedures", href: "/services/legal", icon: Scale },
      { name: "Property & Housing", href: "/services/property", icon: Home },
      { name: "Vehicle Registration", href: "/services/vehicle", icon: Car },
      { name: "Education Services", href: "/services/education", icon: GraduationCap },
      { name: "Marriage Procedures", href: "/services/marriage", icon: Heart },
    ]
  },
  {
    title: "Documents & Forms",
    items: [
      { name: "Official Templates", href: "/services/templates", icon: FileText },
      { name: "Form Fill Service", href: "/services/forms", icon: PenTool },
      { name: "Document Checker", href: "/services/checker", icon: FileSearch },
      { name: "Appointment Booking", href: "/services/booking", icon: Calendar },
      { name: "Requirements Guide", href: "/services/requirements", icon: HelpCircle },
      { name: "Document Status", href: "/services/status", icon: FileCheck },
    ]
  },
  {
    title: "Help & Resources",
    items: [
      { name: "AI Assistant", href: "/services/ai-assistant", icon: Bot },
      { name: "Smart Search", href: "/services/search", icon: Search },
      { name: "Location Finder", href: "/services/location", icon: MapPin },
      { name: "Interactive Maps", href: "/services/maps", icon: Map },
      { name: "Live Support", href: "/services/support", icon: HeadphonesIcon },
      { name: "FAQ & Guides", href: "/services/faq", icon: HelpCircle },
    ]
  }
]

const businessMenuItems = [
  { name: "About", href: "/about", icon: Info },
  { name: "Our Team", href: "/team", icon: UserCircle2 },
  { name: "Our Values", href: "/values", icon: Heart },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Partners", href: "/partners", icon: Phone },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
]

export function NavigationBar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isBusinessOpen, setIsBusinessOpen] = useState(false)

  return (
    <nav className="border-b bg-[#fefefe]">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center justify-between gap-4">
          <div className="relative z-40">
            <button
              className="flex items-center justify-center text-sm font-medium text-[#022840] hover:text-[#A66C4B]/80"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              aria-haspopup="true"
              aria-expanded={isServicesOpen}
            >
              Services
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isServicesOpen && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-[800px] rounded-lg shadow-lg bg-white ring-1 ring-black/5 z-50"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="services-menu"
              >
                <div className="p-6 grid grid-cols-3 gap-8" role="none">
                  {menuCategories.map((category) => (
                    <div key={category.title} className="space-y-4">
                      <h3 className="font-semibold text-[#022840]">{category.title}</h3>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#037F8C] transition-colors duration-200 text-sm"
                            role="menuitem"
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/categories" className="text-sm font-medium text-[#022840] hover:text-[#A66C4B]/80">
            Explore
          </Link>
          <div className="relative z-40">
            <button
              className="flex items-center justify-center text-sm font-medium text-[#022840] hover:text-[#A66C4B]/80"
              onClick={() => setIsBusinessOpen(!isBusinessOpen)}
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
              aria-haspopup="true"
              aria-expanded={isBusinessOpen}
            >
              Business
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isBusinessOpen && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-[200px] rounded-lg shadow-lg bg-white ring-1 ring-black/5 z-50"
                onMouseEnter={() => setIsBusinessOpen(true)}
                onMouseLeave={() => setIsBusinessOpen(false)}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="business-menu"
              >
                <div className="p-4 space-y-2" role="none">
                  {businessMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#037F8C] transition-colors duration-200 text-sm"
                      role="menuitem"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button variant="outline" className="text-[#022840] border-[#022840]/50 hover:bg-[#022840]/10" asChild>
            <Link href="/auth/sign-up">Register</Link>
          </Button>
          <Button className="bg-[#037F8C] text-white hover:bg-[#025373]" asChild>
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
          <div className="ml-4">
            <Image 
              src="/logomaroc.png"
              alt="Morocco Logo"
              width={43}
              height={43}
              className="h-11 w-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

