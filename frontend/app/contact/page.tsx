'use client';

import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">اتصل بنا</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">تواصل معنا</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
                <Input id="name" placeholder="أدخل اسمك" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">الرسالة</label>
                <Textarea id="message" placeholder="كيف يمكننا مساعدتك؟" />
              </div>
              <Button type="submit">إرسال الرسالة</Button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">معلومات الاتصال</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <MapPin className="w-6 h-6 text-[#006CE4] mt-1" />
                <div>
                  <h3 className="font-medium">العنوان</h3>
                  <p className="text-gray-600">123 شارع الرئيسي، المدينة، المغرب</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <Phone className="w-6 h-6 text-[#006CE4] mt-1" />
                <div>
                  <h3 className="font-medium">الهاتف</h3>
                  <p className="text-gray-600">+212 5XX-XXXXXX</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <Mail className="w-6 h-6 text-[#006CE4] mt-1" />
                <div>
                  <h3 className="font-medium">البريد الإلكتروني</h3>
                  <p className="text-gray-600">info@sahla-not.com</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-medium mb-2">ساعات العمل</h3>
              <p className="text-gray-600">الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً</p>
              <p className="text-gray-600">السبت: 9:00 صباحاً - 1:00 ظهراً</p>
              <p className="text-gray-600">الأحد: مغلق</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

