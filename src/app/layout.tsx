import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/functional/NavBar';
import '@/lib/fontawesome/css/fa.css';
import Footer from '@/components/visual/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kronbot',
  description: 'Kronbot website'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head></head>
      <body className={inter.className}>
        {' '}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
