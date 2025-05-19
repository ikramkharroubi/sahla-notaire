import { NavigationBar } from '../../components/navigation-bar'
import { Footer } from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
            </div>
          </form>
          <div className="text-sm text-center">
            Remember your password?{' '}
            <Link href="/auth/sign-in" className="font-medium text-[#006CE4] hover:text-[#005AC4]">
              Sign in
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

