import { NavigationBar } from '../components/navigation-bar'
import { Footer } from '../components/footer'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
            <p>CivicEase is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Conformance Status</h2>
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We aim to conform to WCAG 2.1 level AA standards.

Our efforts to ensure accessibility include:

- Providing text alternatives for non-text content
- Ensuring content can be presented in different ways without losing information
- Making all functionality available from a keyboard
- Providing users enough time to read and use content
- Not using content that causes seizures or physical reactions
- Helping users navigate and find content
- Making text content readable and understandable
- Making content appear and operate in predictable ways
- Helping users avoid and correct mistakes

We welcome your feedback on the accessibility of CivicEase. Please let us know if you encounter accessibility barriers on our website by contacting us at accessibility@civicease.com.
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Compatibility with Browsers and Assistive Technology</h2>
            <p>CivicEase is designed to be compatible with the following assistive technologies:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Screen readers</li>
              <li>Speech recognition software</li>
              <li>Screen magnification software</li>
              <li>Alternative input devices</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Technical Specifications</h2>
            <p>Accessibility of CivicEase relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:</p>
            <ul className="list-disc list-inside ml-4">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p>These technologies are relied upon for conformance with the accessibility standards used.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

