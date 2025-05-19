import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, submit a request, or contact us for support. This may include your name, email address, phone number, and other personal information necessary for the services you're requesting.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your requests, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events offered by CivicEase.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Information Sharing and Disclosure</h2>
            <p>We do not share your personal information with third parties except as described in this privacy policy. We may share your information with government agencies or other organizations when required to provide the services you've requested, or if required by law.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic storage system is 100% secure, and we cannot guarantee absolute security.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights and Choices</h2>
            <p>You may update, correct, or delete your account information at any time by logging into your online account or by contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those messages.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

