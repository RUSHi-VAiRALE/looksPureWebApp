'use client'
import Announcement from "@/components/Announcement";
import MainNavbar from "@/components/MainNavbar";
import Hero from "@/components/Hero"
import ProductCarousel from '@/components/ProductCarousel'

const bestSellers = [
  {
    id: 1,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2016/11/26/13/16/shampoo-1860642_1280.png",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 2,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2017/10/21/20/00/buddelschiff-2875759_1280.png",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 3,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2020/02/28/10/55/accessories-4887139_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 4,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/08/05/15/15/template-4386235_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 5,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/08/05/15/15/template-4386235_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  // Add more products...
]

const skinCareProducts = [
  // Similar structure as bestSellers
  {
    id: 1,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2020/04/02/05/19/beauty-4993472_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 2,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2015/08/01/21/13/hygiene-870763_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 3,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2013/04/25/11/17/cosmetics-106982_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 4,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2015/08/01/21/13/hygiene-870763_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 5,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2014/08/17/20/15/fragrance-420171_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
]

const shampooProducts = [
  // Similar structure as bestSellers
  {
    id: 1,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2016/11/26/12/52/bottle-1860617_1280.png",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 2,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2018/08/29/14/47/perfume-3640056_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 3,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2015/02/19/19/04/shampoo-642517_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 4,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2015/02/19/19/04/shampoo-642517_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 5,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2013/04/25/11/17/cosmetics-106982_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
]

const serumProducts = [
  // Similar structure as bestSellers
  {
    id: 1,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2016/11/26/12/52/bottle-1860617_1280.png",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 2,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 3,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
  {
    id: 4,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },{
    id: 5,
    name: "Vitamin C Daily Glow Face Cream With Vitamin C & Turmeric for Skin",
    image: "https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg",
    badge: "BEST SELLER",
    features: ["Brightens Skin", "Moisturizes Skin"],
    rating: 4.8,
    reviews: 149,
    price: 218,
    originalPrice: 249,
    discount: 12
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Announcement />
      <MainNavbar />
      <main>
        {/* Your page content goes here */}
        <Hero />
        <ProductCarousel 
        title="Best Sellers"
        description="Explore best-selling safe, natural, and 100% toxin-free baby and beauty products from LooksPure."
        products={bestSellers}
      />
      <ProductCarousel 
        title="Skin Care"
        description="Discover our natural skin care collection for healthy, glowing skin."
        products={skinCareProducts}
      />
      <ProductCarousel 
        title="Shampoo"
        description="Natural and gentle shampoos for all hair types."
        products={shampooProducts}
      />
      <ProductCarousel 
        title="Serum"
        description="Targeted treatments for your specific skin concerns."
        products={serumProducts}
      />
      </main>
    </div>
  );
}
