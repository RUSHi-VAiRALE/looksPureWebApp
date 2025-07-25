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
          <h2 className="text-2xl font-bold mb-8">Leadership Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Priti Kumari */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Priti Kumari</h3>
              <p className="text-gray-600 font-medium">CEO & Director</p>
            </div>

            {/* Sakshi Jagtap */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Sakshi Jagtap</h3>
              <p className="text-gray-600 font-medium">CSO & Director</p>
            </div>

            {/* Prince Kumar */}
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Prince Kumar</h3>
              <p className="text-gray-600 font-medium">CMO & Director</p>
            </div>
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