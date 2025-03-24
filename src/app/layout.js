import { Jost } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer'
import MainNavbar from '@/components/MainNavbar'
import Announcement from "@/components/Announcement";
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

export const metadata = {
  title: 'LooksPure - Natural Beauty Products',
  description: 'Premium natural and organic beauty products',
};

// Initialize the Jost font with sans-serif fallback
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['sans-serif'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        
        <CartProvider>
        <Announcement />
        <MainNavbar />
          {children}
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
