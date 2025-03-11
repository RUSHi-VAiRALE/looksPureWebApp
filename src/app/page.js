'use client'
import Announcement from "@/components/Announcement";
import MainNavbar from "@/components/MainNavbar";
import Hero from "@/components/Hero"
export default function Home() {
  return (
    <div className="min-h-screen">
      <Announcement />
      <MainNavbar />
      <main>
        {/* Your page content goes here */}
        <Hero />
      </main>
    </div>
  );
}
