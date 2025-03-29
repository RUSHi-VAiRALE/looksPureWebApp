import { useState } from 'react';
import Image from 'next/image';
import ProductExpandableSection from './ProductExpandableSection';

export default function ProductDetails({ product, expandedSection, toggleSection }) {
  return (
    <div className="mt-8">
      {/* Description Section */}
      <ProductExpandableSection 
        title="DESCRIPTION" 
        isExpanded={expandedSection === 'description'} 
        onToggle={() => toggleSection('description')}
      >
        <div className="space-y-4">
          <p>{product.longDescription}</p>
          
          {/* Product Images in Description */}
          <div className="grid grid-cols-1 gap-4 mt-6">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-center object-cover"
                />
              </div>
            ))}
          </div>
          
          <h3 className="font-medium text-gray-900 mt-6 mb-2">Features:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </ProductExpandableSection>
      
      {/* How to Use Section */}
      <ProductExpandableSection 
        title="HOW TO USE" 
        isExpanded={expandedSection === 'howToUse'} 
        onToggle={() => toggleSection('howToUse')}
      >
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Application Steps:</h3>
          <ol className="list-decimal pl-5 space-y-3">
            {product.howToUse.map((step, index) => (
              <li key={index} className="pl-2">{step}</li>
            ))}
          </ol>
        </div>
      </ProductExpandableSection>
      
      {/* Ingredients Section */}
      <ProductExpandableSection 
        title="INGREDIENTS" 
        isExpanded={expandedSection === 'ingredients'} 
        onToggle={() => toggleSection('ingredients')}
      >
        <p className="leading-relaxed">{product.ingredients}</p>
      </ProductExpandableSection>
      
      {/* FAQ Section */}
      <ProductExpandableSection 
        title="FREQUENTLY ASKED QUESTIONS" 
        isExpanded={expandedSection === 'faq'} 
        onToggle={() => toggleSection('faq')}
      >
        <div className="space-y-4">
          {/* Sample FAQs */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Is this product suitable for sensitive skin?</h4>
            <p>Yes, this product has been dermatologically tested and is suitable for all skin types, including sensitive skin.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Is this product cruelty-free?</h4>
            <p>Yes, all our products are 100% cruelty-free and we do not test on animals.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What is the shelf life of this product?</h4>
            <p>The shelf life of this product is 24 months from the date of manufacture. Once opened, it&apos;s best to use within 12 months.</p>
          </div>
        </div>
      </ProductExpandableSection>
      
      {/* Additional Details Section */}
      <ProductExpandableSection 
        title="ADDITIONAL DETAILS" 
        isExpanded={expandedSection === 'additionalDetails'} 
        onToggle={() => toggleSection('additionalDetails')}
        className="border-b"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Product Dimensions</h4>
            <p>Height: 10 cm<br />Width: 5 cm<br />Weight: 50g</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Country of Origin</h4>
            <p>Made in India</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Manufacturer</h4>
            <p>LooksPure Beauty Pvt. Ltd.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Expiry</h4>
            <p>24 months from the date of manufacture</p>
          </div>
        </div>
      </ProductExpandableSection>
    </div>
  );
}