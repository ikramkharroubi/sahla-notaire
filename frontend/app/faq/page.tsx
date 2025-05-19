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
      question: "What services does CivicEase offer?",
      answer: "CivicEase offers a wide range of administrative services, including document processing, business registration, and various civic services. We aim to simplify bureaucratic processes for individuals and businesses."
    },
    {
      question: "How do I create an account on CivicEase?",
      answer: "To create an account, click on the 'Register' button in the top right corner of the homepage. Follow the prompts to enter your information and verify your email address."
    },
    {
      question: "Are the services on CivicEase available 24/7?",
      answer: "Yes, our online platform is available 24/7 for submitting requests and accessing information. However, processing times may vary depending on the service and the relevant government agency's working hours."
    },
    {
      question: "How secure is my personal information on CivicEase?",
      answer: "We take data security very seriously. All personal information is encrypted and stored securely. We comply with data protection regulations and never share your information without your consent."
    },
    {
      question: "What if I need help with a service not listed on CivicEase?",
      answer: "If you need assistance with a service not currently listed on our platform, please contact our support team. We're constantly expanding our offerings and may be able to help or direct you to the appropriate resources."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
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

