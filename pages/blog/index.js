import Head from 'next/head'

const posts = [
  {
    id: "Flipkart-label-crop",
    title: 'Flipkart shipping label crop',
    excerpt: 'Learn how to Crop with Flipkart label.',
  },
  {
    id: "Meesho-label-crop",
    title: 'Meesho shipping label crop',
    excerpt: 'Learn how to Crop with Meesho label.',
  },
  {
    id: "GlowRoad-label-crop",
    title: 'GlowRoad shipping label crop',
    excerpt: 'Crop Label Glowroad',
  },
]

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
      <main className='w-full mt-[8vh] py-20 flex flex-col justify-center items-center'>
        <h1 className="text-3xl font-bold text-center my-8">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a href={`/posts/${post.id}`} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-500">{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} pdfcrops.com Blogs</p>
      </footer>
    </div>
  )
}