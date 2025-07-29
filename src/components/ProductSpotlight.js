'use client'
import Image from "next/image";
import Link from "next/link";

export default function ProductSpotlight({
  product = {
    title: "Licorice extract",
    subtitle: "Licorice extract",
    tagline: "Blush Brighter, Care Deeper",
    description: "Your glow begins with the LooksPure Niacinamide Glow Serum — a lightweight, skin-loving formula designed to hydrate, brighten, and balance your skin every day. Powered by Niacinamide, Aloe Vera, Green Tea, and Licorice Extract, it helps soothe irritation, even out skin tone, and reduce dullness for a fresh, dewy look.With added benefits from Alpha Arbutin, Zinc PCA, and Hyaluronic Acid, this serum targets dark spots, regulates oil, and delivers deep, lasting hydration.Thoughtfully formulated with gentle botanicals and no heavy residue, it’s the ultimate go- to for radiant, healthy-looking skin.",
    image: "/images/product-spotlight.jpg",
    link: "/products/cloud-nine-blush"
  }
}) {
  return (
    <section className="relative w-full min-h-screen md:h-[80vh] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 z-0"></div>

      <div className="relative z-10 h-full container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row min-h-screen md:h-full items-center">
          {/* Left Side - Product Image */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full py-6 md:py-0 flex items-center justify-center">
            <div className="relative w-64 h-80 md:h-full md:w-full md:max-w-md md:aspect-[3/4]">
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
          <div className="w-full md:w-1/2 flex-1 md:flex-none py-6 md:py-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-8">
            <div className="max-w-lg w-full">
              <div className="uppercase tracking-wider text-emerald-800 mb-3 text-sm">
                {product.title}
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-6 text-gray-900 leading-tight">
                READY TO TAKE YOUR<br />
                SKIN INTO GLOW MODE?<br />
              </h2>

              <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 leading-relaxed text-left md:text-justify">
                {
                  product.description
                }
              </p>

              <Link
                href={product.link}
                className="inline-block bg-emerald-600 text-white px-6 py-2.5 md:px-8 md:py-3 uppercase tracking-wider text-sm font-medium hover:bg-emerald-700 transition-colors rounded-none"
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