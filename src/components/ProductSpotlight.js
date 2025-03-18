'use client'
import Image from "next/image";
import Link from "next/link";

export default function ProductSpotlight({ 
  product = {
    title: "CLOUD NINE",
    subtitle: "NIACINAMIDE GLOW BLUSH",
    tagline: "Blush Brighter, Care Deeper",
    description: "Blush brighter, care deeper with our Cloud Nine Niacinamide Glow Blush that gives your cheeks the look straight out of a dream. Infused with 8 botanical oils, Niacinamide, Kojic Acid, and Vitamin C, it pampers your skin while giving you that lit-from-within flush. Just a dab of this weightless formula gives you glowing, radiant cheeks. Choose from playful shades like peachy pink or flirty raspberry, made to flatter every Indian skin tone. Glow-getter, are you in?",
    image: "/images/product-spotlight.jpg",
    link: "/products/cloud-nine-blush"
  }
}) {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-100 to-white z-0"></div>
      
      <div className="relative z-10 h-full container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row h-full items-center">
          {/* Left Side - Product Image */}
          <div className="w-full md:w-1/2 h-full py-8 md:py-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right Side - Product Info */}
          <div className="w-full md:w-1/2 py-8 md:py-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-8">
            <div className="max-w-lg">
              <div className="uppercase tracking-wider text-emerald-800 mb-2 text-sm">
                {product.title} {product.subtitle && `• ${product.subtitle}`}
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-gray-900">
                READY TO TAKE YOUR<br />
                BLUSH GAME TO CLOUD<br />
                NINE?
              </h2>
              
              <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <Link 
                href={product.link}
                className="inline-block bg-emerald-600 text-white px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}