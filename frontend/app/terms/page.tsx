import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using CivicEase, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Use of Services</h2>
            <p>Our services are provided for your personal and non-commercial use. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from CivicEase without our prior written permission.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
            <p>To access certain features of CivicEase, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Privacy Policy</h2>
            <p>Your use of CivicEase is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Disclaimers</h2>
            <p>CivicEase is provided on an "as is" and "as available" basis. We do not warrant that the service will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

