'use client';

import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "ما هي خدمات سهلة نوت؟",
      answer: "سهلة نوت هي منصة شاملة تقدم مجموعة واسعة من الخدمات الإدارية والحكومية، بما في ذلك إصدار المستندات الرسمية، خدمات الأعمال، والاستشارات القانونية والإدارية."
    },
    {
      question: "كيف يمكنني إنشاء حساب؟",
      answer: "يمكنك إنشاء حساب بسهولة من خلال النقر على زر 'إنشاء حساب' في الصفحة الرئيسية، ثم اتباع الخطوات البسيطة لإكمال عملية التسجيل."
    },
    {
      question: "هل الخدمات متاحة في جميع أنحاء المغرب؟",
      answer: "نعم، خدماتنا متاحة في جميع أنحاء المملكة المغربية. نحن نعمل على توسيع نطاق خدماتنا لتغطية جميع المناطق."
    },
    {
      question: "كيف يمكنني الدفع مقابل الخدمات؟",
      answer: "نقبل مجموعة متنوعة من طرق الدفع، بما في ذلك البطاقات البنكية، المحافظ الإلكترونية، والتحويلات البنكية. يمكنك اختيار طريقة الدفع المناسبة لك عند إتمام الطلب."
    },
    {
      question: "كم من الوقت يستغرق إصدار المستندات؟",
      answer: "تختلف مدة إصدار المستندات حسب نوع المستند والجهة المختصة. عادةً ما يتم إصدار المستندات الأساسية خلال 24-48 ساعة، بينما قد تستغرق المستندات الأكثر تعقيداً وقتاً أطول."
    },
    {
      question: "هل يمكنني تتبع حالة طلبي؟",
      answer: "نعم، يمكنك تتبع حالة طلبك في أي وقت من خلال حسابك الشخصي. سنقوم أيضاً بإرسال إشعارات عبر البريد الإلكتروني عند تحديث حالة طلبك."
    },
    {
      question: "ما هي سياسة الإلغاء والاسترداد؟",
      answer: "يمكنك إلغاء طلبك قبل بدء المعالجة. في حالة الإلغاء، سيتم استرداد المبلغ المدفوع بالكامل. بعد بدء المعالجة، قد يتم تطبيق رسوم إدارية على الاسترداد."
    },
    {
      question: "كيف يمكنني التواصل مع خدمة العملاء؟",
      answer: "يمكنك التواصل مع فريق خدمة العملاء لدينا من خلال نموذج الاتصال على موقعنا، أو عبر البريد الإلكتروني، أو الهاتف. نحن متاحون على مدار الساعة طوال أيام الأسبوع."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">الأسئلة الشائعة</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  )
}

