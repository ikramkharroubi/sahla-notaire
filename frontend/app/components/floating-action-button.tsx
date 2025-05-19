"use client"

import Link from 'next/link'
import { FileText } from 'lucide-react'
import { useState } from 'react'

export function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/documents/categories"
      className={`fixed top-24 right-0 bg-[#086f7a] text-white p-3 rounded-l-lg shadow-lg hover:bg-[#086f7a]/90 transition-all duration-300 flex items-center justify-start overflow-hidden z-50 ${
        isHovered ? 'w-36' : 'w-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Documents"
    >
      <FileText className="w-6 h-6 flex-shrink-0" />
      <span className={`ml-2 whitespace-nowrap transition-opacity duration-300 text-sm ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        Documents
      </span>
    </Link>
  )
}

