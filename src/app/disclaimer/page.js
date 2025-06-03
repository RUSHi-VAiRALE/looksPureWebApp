'use client'

// export const metadata = {
//   title: 'Disclaimer | LooksPure',
//   description: 'Legal disclaimer for LooksPure website and products',
// }

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>

      <div className="space-y-8">
        <p className="text-gray-500 italic">Last Updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-bold mb-4">Website Disclaimer</h2>
          <p className="mb-4">
            The information provided on LooksPure.com is for general informational and educational purposes only.
            While we strive to keep the information up to date and correct, we make no representations or warranties
            of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or
            availability of the website or the information, products, services, or related graphics contained on
            the website for any purpose.
          </p>
          <p>
            Any reliance you place on such information is therefore strictly at your own risk. In no event will
            we be liable for any loss or damage including without limitation, indirect or consequential loss or
            damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in
            connection with, the use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Product Information Disclaimer</h2>
          <p className="mb-4">
            The product descriptions, images, and information provided on our website are for informational purposes
            only. We make every effort to display as accurately as possible the colors, features, specifications,
            and details of the products available on the site. However, we cannot guarantee that your computer
            monitor&apos;s display of any color will be accurate, and product packaging and materials may contain more
            and/or different information than that shown on our website.
          </p>
          <p>
            We recommend that you do not rely solely on the information presented and that you always read labels,
            warnings, and directions before using or consuming a product. For additional information about a product,
            please contact the manufacturer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Health & Medical Disclaimer</h2>
          <p className="mb-4">
            The content on LooksPure.com is not intended to be a substitute for professional medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition or skincare concern.
          </p>
          <p className="mb-4">
            Never disregard professional medical advice or delay in seeking it because of something you have read
            on our website. If you think you may have a medical emergency, call your doctor or emergency services
            immediately.
          </p>
          <p>
            Our products are not intended to diagnose, treat, cure, or prevent any disease unless explicitly stated
            and approved by relevant regulatory bodies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">External Links Disclaimer</h2>
          <p>
            Our website may contain links to external websites that are not provided or maintained by or in any way
            affiliated with LooksPure. Please note that we do not guarantee the accuracy, relevance, timeliness, or
            completeness of any information on these external websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Testimonials & Reviews Disclaimer</h2>
          <p>
            The testimonials and reviews displayed on our website are provided by actual customers and reflect their
            personal experiences and opinions. However, individual results may vary. We do not claim that the
            experiences reported in these testimonials are typical, and the testimonials are not intended to guarantee
            that anyone will achieve the same or similar results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to This Disclaimer</h2>
          <p className="mb-4">
            We may update our disclaimer from time to time. We will notify you of any changes by posting the new
            disclaimer on this page and updating the &apos;Last Updated&apos; date.
          </p>
          <p>
            You are advised to review this disclaimer periodically for any changes. Changes to this disclaimer are
            effective when they are posted on this page.
          </p>
        </section>

        <section>
          <p className="text-center">
            If you have any questions about this disclaimer, please contact us at{' '}
            <a href="mailto:legal@lookspure.com" className="text-blue-600 underline">
              legal@lookspure.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}