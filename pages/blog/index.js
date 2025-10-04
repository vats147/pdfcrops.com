import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { blogData, blogCategories } from '@/constants/Blog/blogData';

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = selectedCategory === 'All' 
    ? blogData 
    : blogData.filter(blog => blog.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Blog - Label Crop Tips | Meesho, Flipkart, GlowRoad | PDFCrops</title>
        <meta name="description" content="Read expert guides on label crop, Meesho label crop, Flipkart label crop, GlowRoad label crop, and ecommerce tips. Learn how to optimize your shipping label workflow." />
        <meta name="keywords" content="label crop blog, meesho label crop, flipkart label crop, glowroad label crop, ecommerce tips, shipping label guides" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Blog - Label Crop Expert Guides | PDFCrops" />
        <meta property="og:description" content="Expert guides on Meesho label crop, Flipkart label crop, and ecommerce optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfcrops.com/blog" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Label Crop Blog - Expert Guides for Ecommerce Sellers" />
        <meta name="twitter:description" content="Learn label crop techniques for Meesho, Flipkart, and GlowRoad" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://pdfcrops.com/blog" />
      </Head>

      <main className='w-full mt-[8vh] py-12 md:py-20 flex flex-col justify-center items-center bg-gray-50'>
        {/* Header Section */}
        <div className='w-full max-w-7xl px-5 md:px-10 lg:px-20 mb-12'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4'>
              Label Crop Blog
            </h1>
            <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
              Expert guides on <span className='font-semibold text-blue-600'>Meesho label crop</span>, <span className='font-semibold text-blue-600'>Flipkart label crop</span>, <span className='font-semibold text-blue-600'>GlowRoad label crop</span>, and ecommerce optimization tips for Indian sellers.
            </p>
          </div>

          {/* CTA Banner */}
          <div className='bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 md:p-8 text-white text-center mb-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-3'>
              Try Our Free Label Crop Tool
            </h2>
            <p className='text-lg mb-4 opacity-90'>
              Crop Meesho, Flipkart, GlowRoad labels in seconds - 100% Free!
            </p>
            <Link 
              href="/tools/pdf/crop"
              className='inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105'
            >
              Start Cropping Labels Now →
            </Link>
          </div>

          {/* Category Filter */}
          <div className='mb-12'>
            <h3 className='text-xl font-bold text-gray-900 mb-4 text-center'>Browse by Category</h3>
            <div className='flex flex-wrap gap-2 justify-center'>
              {blogCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
            {filteredBlogs.map((blog) => (
              <Link 
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1'
              >
                <div className='relative h-48 bg-gradient-to-r from-blue-500 to-purple-500'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-white text-center p-6'>
                      <svg className='w-16 h-16 mx-auto mb-2' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full'>
                      {blog.category}
                    </span>
                    <span className='text-sm text-gray-500'>{blog.readTime}</span>
                  </div>
                  <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2'>
                    {blog.title}
                  </h2>
                  <p className='text-gray-600 mb-4 line-clamp-3'>
                    {blog.excerpt}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-gray-500'>
                      <span>{blog.author}</span>
                      <span className='mx-2'>•</span>
                      <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {blog.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx}
                        className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className='mt-4'>
                    <span className='text-blue-600 font-semibold hover:text-blue-700'>
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className='bg-white rounded-xl p-8 md:p-12 text-center shadow-lg'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Ready to Optimize Your Label Workflow?
            </h2>
            <p className='text-lg text-gray-600 mb-6 max-w-2xl mx-auto'>
              Our <strong>label crop tool</strong> supports <strong>Meesho label crop</strong>, <strong>Flipkart label crop</strong>, <strong>GlowRoad label crop</strong>, and all major ecommerce platforms. Start saving time today!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link 
                href="/tools/pdf/crop"
                className='inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all'
              >
                Crop Labels Now
              </Link>
              <Link 
                href="/faq"
                className='inline-block bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-300 transition-all'
              >
                View FAQ
              </Link>
            </div>
          </div>

          {/* SEO Keywords Section */}
          <div className='mt-12 bg-blue-50 rounded-xl p-6 md:p-8'>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Popular Topics
            </h3>
            <div className='flex flex-wrap gap-3'>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Meesho label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Flipkart label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>GlowRoad label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Ecommerce label crop</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Shipping labels</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>PDF cropping</span>
              <span className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm'>Label printing tips</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}