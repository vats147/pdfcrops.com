import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { blogData, getBlogBySlug, getRelatedBlogs } from '@/constants/Blog/blogData';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    return (
      <div className='w-full mt-[8vh] py-20 flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold mb-4'>Blog Post Not Found</h1>
        <Link href="/blog" className='text-blue-600 hover:underline'>
          Return to Blog
        </Link>
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs(blog.id);

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "author": {
      "@type": "Organization",
      "name": blog.author
    },
    "datePublished": blog.publishDate,
    "dateModified": blog.lastUpdated,
    "image": blog.featuredImage,
    "keywords": blog.keywords.join(", "),
    "articleBody": blog.content.replace(/<[^>]*>/g, '')
  };

  return (
    <>
      <Head>
        <title>{blog.seo.metaTitle}</title>
        <meta name="description" content={blog.seo.metaDescription} />
        <meta name="keywords" content={blog.keywords.join(", ")} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={blog.seo.ogTitle} />
        <meta property="og:description" content={blog.seo.ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://pdfcrops.app/blog/${blog.slug}`} />
        <meta property="og:image" content={blog.seo.ogImage} />
        <meta property="article:published_time" content={blog.publishDate} />
        <meta property="article:modified_time" content={blog.lastUpdated} />
        <meta property="article:author" content={blog.author} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.seo.ogTitle} />
        <meta name="twitter:description" content={blog.seo.ogDescription} />
        <meta name="twitter:image" content={blog.seo.ogImage} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://pdfcrops.app/blog/${blog.slug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className='w-full mt-[8vh] py-12 md:py-20 flex flex-col justify-center items-center bg-gray-50'>
        {/* Breadcrumbs */}
        <div className='w-full max-w-4xl px-5 md:px-10 mb-8'>
          <nav className='flex text-sm text-gray-600'>
            <Link href="/" className='hover:text-blue-600'>Home</Link>
            <span className='mx-2'>/</span>
            <Link href="/blog" className='hover:text-blue-600'>Blog</Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-900'>{blog.category}</span>
          </nav>
        </div>

        {/* Article Header */}
        <article className='w-full max-w-4xl px-5 md:px-10'>
          <div className='bg-white rounded-xl shadow-lg p-6 md:p-12 mb-8'>
            {/* Category and Read Time */}
            <div className='flex items-center gap-3 mb-4'>
              <span className='inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full'>
                {blog.category}
              </span>
              <span className='text-gray-500'>{blog.readTime}</span>
            </div>

            {/* Title */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className='flex flex-wrap items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200'>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{blog.author}</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            {/* CTA Banner - Above Content */}
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center mb-8'>
              <h3 className='text-2xl font-bold mb-2'>
                Try Our Label Crop Tool Now!
              </h3>
              <p className='text-lg mb-4 opacity-90'>
                Crop Meesho, Flipkart, GlowRoad labels instantly - 100% Free
              </p>
              <Link 
                href="/tools/pdf/crop"
                className='inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105'
              >
                Start Cropping Labels →
              </Link>
            </div>

            {/* Article Content */}
            <div 
              className='prose prose-lg max-w-none mb-8'
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                lineHeight: '1.8',
              }}
            />

            {/* Tags */}
            <div className='mt-8 pt-8 border-t border-gray-200'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {blog.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className='px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className='mt-12 bg-green-50 rounded-lg p-8 text-center border-2 border-green-200'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-3'>
                Ready to Save Time on Label Cropping?
              </h3>
              <p className='text-lg text-gray-700 mb-6'>
                Join thousands of sellers using our free <strong>label crop tool</strong> for <strong>Meesho label crop</strong>, <strong>Flipkart label crop</strong>, and <strong>GlowRoad label crop</strong>!
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link 
                  href="/tools/pdf/crop"
                  className='inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-all'
                >
                  Crop Labels Now
                </Link>
                <Link 
                  href="/faq"
                  className='inline-block bg-white text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all border-2 border-gray-300'
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                Related Articles
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {relatedBlogs.map((relatedBlog) => (
                  <Link 
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className='group bg-gray-50 rounded-lg p-5 hover:bg-blue-50 transition-all border-2 border-transparent hover:border-blue-200'
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full'>
                        {relatedBlog.category}
                      </span>
                      <span className='text-sm text-gray-500'>{relatedBlog.readTime}</span>
                    </div>
                    <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                      {relatedBlog.title}
                    </h3>
                    <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
                      {relatedBlog.excerpt}
                    </p>
                    <span className='text-blue-600 font-semibold text-sm group-hover:underline'>
                      Read More →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className='flex justify-center mb-8'>
            <Link 
              href="/blog"
              className='inline-block bg-white text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md'
            >
              ← Back to All Blogs
            </Link>
          </div>
        </article>

        {/* SEO Footer Section */}
        <div className='w-full max-w-4xl px-5 md:px-10'>
          <div className='bg-blue-50 rounded-xl p-6 md:p-8'>
            <h3 className='text-xl font-bold text-gray-900 mb-4 text-center'>
              Explore More Label Crop Solutions
            </h3>
            <div className='flex flex-wrap gap-3 justify-center'>
              <Link href="/tools/pdf/crop" className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all'>
                Meesho label crop
              </Link>
              <Link href="/tools/pdf/crop" className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all'>
                Flipkart label crop
              </Link>
              <Link href="/tools/pdf/crop" className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all'>
                GlowRoad label crop
              </Link>
              <Link href="/tools/pdf/crop" className='px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all'>
                Ecommerce label crop
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Generate static paths for all blog posts
export async function getStaticPaths() {
  const paths = blogData.map((blog) => ({
    params: { slug: blog.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

// Generate static props for each blog post
export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  };
}
