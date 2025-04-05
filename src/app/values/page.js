import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Our Values | LooksPure',
  description: 'Learn about the core values that drive LooksPure',
}

export default function ValuesPage() {
  return (
    <PageTemplate title="Our Values">
      <p className="mb-4">At LooksPure, our values are the foundation of everything we do. We believe in:</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Natural Ingredients</h2>
      <p className="mb-4">We are committed to using only natural, plant-based ingredients in our products. We believe that nature provides everything we need for healthy, beautiful skin and hair.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Toxin-Free Formulations</h2>
      <p className="mb-4">We pledge to never use harmful chemicals, parabens, sulfates, or synthetic fragrances in our products. Your health and safety are our top priorities.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Sustainability</h2>
      <p className="mb-4">We are dedicated to sustainable practices throughout our supply chain, from sourcing ingredients to packaging. We aim to minimize our environmental footprint.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Transparency</h2>
      <p className="mb-4">We believe in complete transparency about our ingredients, manufacturing processes, and business practices. You deserve to know exactly what you&apos;re putting on your skin.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Ethical Testing</h2>
      <p className="mb-4">We never test on animals. All our products are cruelty-free and many are vegan. We test our products on willing human volunteers only.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Community Support</h2>
      <p>We are committed to supporting local communities and fair trade practices. We believe in giving back and making a positive impact on society.</p>
    </PageTemplate>
  )
}