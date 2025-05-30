'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";

export function PromotionalOffers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32]">
              عرض خاص
            </Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="mr-1 text-sm font-medium">4.8</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">خدمة استخراج شهادة الإقامة</h3>
          <p className="text-gray-600 mb-4">احصل على شهادة إقامتك بسرعة وسهولة مع خدمتنا المميزة</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1" />
              <span>24 ساعة</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 ml-1" />
              <span>الدار البيضاء</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-[#FFF3E0] text-[#E65100]">
              جديد
            </Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="mr-1 text-sm font-medium">4.9</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">خدمة تجديد جواز السفر</h3>
          <p className="text-gray-600 mb-4">تجديد سريع وآمن لجواز سفرك مع متابعة كاملة</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1" />
              <span>48 ساعة</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 ml-1" />
              <span>الرباط</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-[#E3F2FD] text-[#1565C0]">
              الأكثر طلباً
            </Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="mr-1 text-sm font-medium">4.7</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">خدمة استخراج شهادة الميلاد</h3>
          <p className="text-gray-600 mb-4">استخراج سريع لشهادة الميلاد مع خدمة التوصيل</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1" />
              <span>12 ساعة</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 ml-1" />
              <span>مراكش</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 