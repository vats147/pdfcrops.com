import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { faqData, faqCategories } from '@/constants/FAQ/faqData';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>FAQ - Label Crop Tool | Meesho, Flipkart, GlowRoad Label Crop | PDFCrops</title>
        <meta name="description" content="Frequently asked questions about label crop tools for Meesho label crop, Flipkart label crop, GlowRoad label crop, and ecommerce shipping labels. Get answers to all your PDF cropping questions." />
        <meta name="keywords" content="label crop, meesho label crop, flipkart label crop, glowroad label crop, ecommerce label crop, pdf crop faq, shipping label crop" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ - Label Crop Tool | Meesho, Flipkart, GlowRoad Label Crop" />
        <meta property="og:description" content="Get answers about Meesho label crop, Flipkart label crop, and ecommerce label cropping tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfcrops.com/faq" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Label Crop Tool | Meesho, Flipkart, GlowRoad" />
        <meta name="twitter:description" content="Frequently asked questions about label crop for ecommerce sellers" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://pdfcrops.com/faq" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className='w-full mt-[8vh] py-12 md:py-20 flex flex-col justify-center items-center bg-gray-50'>
        {/* Header Section */}
        <div className='w-full max-w-7xl px-5 md:px-10 lg:px-20 mb-12'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h1>
            <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
              Everything you need to know about <span className='font-semibold text-blue-600'>label crop</span>, including <span className='font-semibold text-blue-600'>Meesho label crop</span>, <span className='font-semibold text-blue-600'>Flipkart label crop</span>, <span className='font-semibold text-blue-600'>GlowRoad label crop</span>, and other ecommerce label cropping tools.
            </p>
          </div>

          {/* CTA Banner */}
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 md:p-8 text-white text-center mb-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-3'>
              Ready to Crop Your Labels?
            </h2>
            <p className='text-lg mb-4 opacity-90'>
              Try our free label crop tool for Meesho, Flipkart, GlowRoad and more!
            </p>
            <Link 
              href="/tools/pdf/crop"
              className='inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105'
            >
              Start Cropping Labels Now →
            </Link>
          </div>

          {/* Category Filter */}
          <div className='mb-8'>
            <div className='flex flex-wrap gap-2 justify-center'>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({faqData.length})
              </button>
              {faqCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category} ({faqData.filter(f => f.category === category).length})
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className='space-y-4'>
            {filteredFAQs.map((faq) => (
              <div 
                key={faq.id}
                className='bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg'
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className='w-full px-6 py-5 text-left flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full'>
                        {faq.category}
                      </span>
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900'>
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform flex-shrink-0 ${
                      expandedFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className='px-6 pb-5'>
                    <div className='pt-4 border-t border-gray-200'>
                      <p className='text-gray-700 leading-relaxed'>
                        {faq.answer}
                      </p>
                      {faq.keywords && faq.keywords.length > 0 && (
                        <div className='mt-4 flex flex-wrap gap-2'>
                          {faq.keywords.map((keyword, idx) => (
                            <span 
                              key={idx}
                              className='px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full'
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className='mt-16 bg-white rounded-xl p-8 md:p-12 text-center shadow-lg'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Still Have Questions?
            </h2>
            <p className='text-lg text-gray-600 mb-6 max-w-2xl mx-auto'>
              Our <strong>label crop tool</strong> supports Meesho label crop, Flipkart label crop, GlowRoad label crop, and all major ecommerce platforms. Try it now for free!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link 
                href="/tools/pdf/crop"
                className='inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all'
              >
                Crop Labels Now
              </Link>
              <Link 
                href="/contact"
                className='inline-block bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-300 transition-all'
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* SEO Keywords Section */}
          <div className='mt-12 bg-blue-50 rounded-xl p-6 md:p-8'>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Popular Label Crop Searches
            </h3>
            <div className='flex flex-wrap gap-3'>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Meesho label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Flipkart label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>GlowRoad label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Ecommerce label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Amazon label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Myntra label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Shipping label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>PDF label crop</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
