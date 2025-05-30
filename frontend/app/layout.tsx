import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { FloatingActionButton } from './components/floating-action-button';

const cairo = Cairo({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'Sahla Not',
  description: 'Your one-stop solution for all procedures and documents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <AuthProvider>
          {children}
          <FloatingActionButton />
        </AuthProvider>
      </body>
    </html>
  )
}

