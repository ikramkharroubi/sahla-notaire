import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#F6F6F6] text-black py-2 relative">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold text-base mb-2">About CivicEase</h3>
            <p className="text-xs text-black/80">CivicEase simplifies administrative tasks, making it easier for citizens to access and process important documents and services.</p>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link href="/documents" className="text-xs hover:text-[#A66C4B]">Documents</Link></li>
              <li><Link href="/business" className="text-xs hover:text-[#A66C4B]">Business Services</Link></li>
              <li><Link href="/faq" className="text-xs hover:text-[#A66C4B]">FAQ</Link></li>
              <li><Link href="/contact" className="text-xs hover:text-[#A66C4B]">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="/terms" className="text-xs hover:text-[#A66C4B]">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-xs hover:text-[#A66C4B]">Privacy Policy</Link></li>
              <li><Link href="/accessibility" className="text-xs hover:text-[#A66C4B]">Accessibility</Link></li>
            </ul>
          </div>
          <div className="relative flex flex-col">
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Image 
                src="/moroccomap.png"
                alt="Map of Morocco"
                width={150}
                height={150}
              />
            </div>
            <h3 className="font-bold text-base mb-2">Connect with Us</h3>
            <div className="flex space-x-3">
              <Link href="#" className="hover:text-[#A66C4B]"><Facebook size={18} /></Link>
              <Link href="#" className="hover:text-[#A66C4B]"><Twitter size={18} /></Link>
              <Link href="#" className="hover:text-[#A66C4B]"><Instagram size={18} /></Link>
              <Link href="#" className="hover:text-[#A66C4B]"><Linkedin size={18} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-center text-xs text-black/70">
          © {new Date().getFullYear()} CivicEase. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

