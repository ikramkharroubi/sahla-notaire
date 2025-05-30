import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#F6F6F6] text-black py-2 relative">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold text-base mb-2">عن سهلة نوت</h3>
            <p className="text-xs text-black/80">سهلة نوت تبسط المهام الإدارية، مما يسهل على المواطنين الوصول إلى المستندات والخدمات المهمة ومعالجتها.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-600 hover:text-[#037F8C]">الخدمات</Link></li>
              <li><Link href="/documents" className="text-gray-600 hover:text-[#037F8C]">المستندات</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#037F8C]">من نحن</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#037F8C]">اتصل بنا</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2">قانوني</h3>
            <ul className="space-y-1">
              <li><Link href="/terms" className="text-xs hover:text-[#A66C4B]">شروط الخدمة</Link></li>
              <li><Link href="/privacy" className="text-xs hover:text-[#A66C4B]">سياسة الخصوصية</Link></li>
              <li><Link href="/accessibility" className="text-xs hover:text-[#A66C4B]">إمكانية الوصول</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">البريد الإلكتروني: info@example.com</li>
              <li className="text-gray-600">الهاتف: +123 456 7890</li>
              <li className="text-gray-600">العنوان: شارع الرئيسي، المدينة</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">تابعنا</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link href="#" className="text-gray-600 hover:text-[#037F8C]">
                <span className="sr-only">فيسبوك</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#037F8C]">
                <span className="sr-only">تويتر</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#037F8C]">
                <span className="sr-only">انستغرام</span>
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}

