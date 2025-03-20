import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
