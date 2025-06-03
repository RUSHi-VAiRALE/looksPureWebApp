'use client'

// export const metadata = {
//   title: 'Corporate Information | LooksPure',
//   description: 'Learn about LooksPure company, our mission, and leadership team',
// }

export default function CorporatePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-4xl font-bold mb-8">Corporate Information</h1>

      <div className="space-y-12">
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">About LooksPure</h2>
          <p className="mb-4">
            Founded in 2025, LooksPure is a leading beauty and skincare brand committed to transparency,
            effectiveness, and sustainability. We believe that beauty products should be formulated with
            clean, effective ingredients that deliver real results without compromising on safety.
          </p>
          <p>
            Our mission is to revolutionize the beauty industry by providing honest, science-backed
            products that empower consumers to make informed choices about their skincare. We&apos;re dedicated
            to cutting through the marketing noise and offering straightforward solutions that work.
          </p>
        </section>

        {/* Leadership Team */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Leadership Team</h2>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Aanya Sharma - Founder & CEO</h3>
            <p>
              With over 15 years of experience in the beauty industry, Aanya founded LooksPure with a vision
              to create skincare products that prioritize transparency and efficacy.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Vikram Patel - Chief Scientific Officer</h3>
            <p>
              Dr. Patel leads our research and development team, bringing his expertise in cosmetic chemistry
              and dermatological science to create innovative formulations.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Neha Kapoor - Chief Marketing Officer</h3>
            <p>
              Neha oversees our marketing strategies, focusing on authentic communication and building
              meaningful connections with our community.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Arjun Mehta - Chief Operations Officer</h3>
            <p>
              Arjun ensures that our supply chain and operations align with our commitment to sustainability
              and ethical business practices.
            </p>
          </div>
        </section>

        {/* Our Commitments */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Commitments</h2>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Sustainability</h3>
            <p>
              We&apos;re committed to reducing our environmental footprint through sustainable sourcing,
              eco-friendly packaging, and carbon-neutral shipping.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Ethical Testing</h3>
            <p>
              We never test on animals and work only with suppliers who share our commitment to
              cruelty-free practices and ethical ingredient sourcing.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Transparency</h3>
            <p>
              We believe in full disclosure about our ingredients, manufacturing processes, and
              business practices to empower informed consumer choices.
            </p>
          </div>
        </section>

        {/* Careers */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="mb-4">
            We&apos;re always looking for passionate individuals who share our vision for transforming the beauty industry.
            Check out our current openings or send us your resume for future opportunities.
          </p>
          <a href="#" className="text-blue-600 underline">View Open Positions</a>
        </section>
      </div>
    </main>
  )
}