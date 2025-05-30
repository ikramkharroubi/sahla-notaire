'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#022840]">
                سهلة
              </Link>
            </div>
            <div className="hidden sm:mr-6 sm:flex sm:space-x-8 sm:space-x-reverse">
              <Link href="/services" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                الخدمات
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                اتصل بنا
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:mr-6">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-[#022840] text-white hover:bg-[#022840]/90">
                إنشاء حساب
              </Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/services" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900">
              الخدمات
            </Link>
            <Link href="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              من نحن
            </Link>
            <Link href="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              اتصل بنا
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-900">
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
              <div className="mr-3">
                <Link href="/auth/register">
                  <Button className="w-full bg-[#022840] text-white hover:bg-[#022840]/90">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 