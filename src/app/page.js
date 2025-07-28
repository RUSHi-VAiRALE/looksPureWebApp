'use client'
import Announcement from "@/components/Announcement";
import MainNavbar from "@/components/MainNavbar";
import Hero from "@/components/Hero"
import ProductCarousel from '@/components/ProductCarousel'
import { dealBanners, heroBanners } from '@/data/promoBanners';
import TrendingProducts from '@/components/TrendingProducts';
import { newLaunches, bestsellers } from "@/data/trendingProducts";
import { eliteEdition, onTheGoEssentials } from "@/data/eliteProducts";
import PromoBanner from "@/components/PromoBanner";
import ProductSpotlight from '@/components/ProductSpotlight';
import InstagramFeed from '@/components/InstagramFeed';
import { instagramPosts } from '@/data/instagramPosts';
import FutureOfCare from '@/components/FutureOfCare';
import CustomerReviews from '@/components/CustomerReviews'; // Import the new component
import { customerReviews } from '@/data/customerReviews'; // Import the review data

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Your page content goes here */}

        <Hero />

        <TrendingProducts
          title="TRENDING AT LOOKSPURE"
          categories={["skincare", "haircare"]}
          productData={[newLaunches, bestsellers]}
          viewAllLinks={["/new-launches", "/bestsellers"]}
          showRatings={true}
        />

        {/* Add the Customer Reviews component */}

        {/* Rest of your components remain unchanged */}
        <PromoBanner banners={dealBanners} height="half" />
        {/* <TrendingProducts 
            title=""
            categories={["ELITE EDITION","ON-THE-GO ESSENTIAL"]}
            productData={[eliteEdition,onTheGoEssentials]}
            viewAllLinks={["/elite-edition","/on-the-go-essential"]}
            showRatings={true}
        /> */}
        <ProductSpotlight
          product={{
            title: "CLOUD NINE",
            subtitle: "NIACINAMIDE GLOW BLUSH",
            tagline: "Blush Brighter, Care Deeper",
            description: "Your glow begins with the LooksPure Niacinamide Glow Serum — a lightweight, skin-loving formula designed to hydrate, brighten, and balance your skin every day. Powered by Niacinamide, Aloe Vera, Green Tea, and Licorice Extract, it helps soothe irritation, even out skin tone, and reduce dullness for a fresh, dewy look.With added benefits from Alpha Arbutin, Zinc PCA, and Hyaluronic Acid, this serum targets dark spots, regulates oil, and delivers deep, lasting hydration.Thoughtfully formulated with gentle botanicals and no heavy residue, it’s the ultimate go- to for radiant, healthy-looking skin.",
            image: "https://cdn.pixabay.com/photo/2023/12/19/01/10/ai-generated-8456887_1280.jpg",
            link: "/products/cloud-nine-blush"
          }}
          useGradient={true}
          gradientColors="from-pink-200 via-purple-200 to-blue-200"
        />
        <InstagramFeed posts={instagramPosts} />
        <FutureOfCare /> {/* Add the new component here */}
        <CustomerReviews reviewsData={customerReviews} />
      </main>
    </div>
  );
}

// Or for a different section with only one category:
// In your page file, add:

// Then in your page component:


