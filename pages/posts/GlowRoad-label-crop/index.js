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
    }
]


export default function Home({ data }) {
  return (
       <main className='w-full mt-[8vh] py-20 flex flex-col justify-center items-center'>
       <div className='w-full flex flex-col justify-start items-center space-y-4 px-5 md:px-10 lg:px-20 pb-20'>
           <h3 className='text-black text-3xl lg:text-5xl font-bold mb-5'>  GlowRoad
 shipping label crop </h3>
           <div className='flex flex-col justify-start items-start space-y-2'>
              <h3 className='text-black text-4xl font-bold mb-5'>GlowRoad
 shipping label crop</h3>
           <p >Last updated: March 14, 2023</p>
           
           <h3 className='text-black text-4xl font-bold mb-5'>How to use pdfcrops GlowRoad
 label crop tool</h3>
   
           <p >The GlowRoad
 label crop tool is essential if you are a GlowRoad
 seller, below are some of the benefits and processes of how to use the GlowRoad
 label crop tool.</p>
           <h2>Benefits of using pdfcrops to crop GlowRoad
 labels</h2>
           
           <ul>
               <li><p> 1.  The fastest way to crop GlowRoad
 shipping labels.</p></li>
               <li><p> 2.  Automatically group all SKUs. </p></li>
               <li><p> 3.  Automatically crop size as per label length.</p></li>
               <li><p> 4.  Automatically put SKU if needed in the label to identify the product.</p></li>
               
           </ul>
           <h3 className='text-black text-4xl font-bold mb-5'>Select your label pdf file.</h3>
         
         
           <p >Once your GlowRoad
 shipping label pdf is generated you can use the same pdf here to crop labels. You don’t have to do any other process on your GlowRoad
 shipping label pdf file. </p>
           <p > Select GlowRoad
 in <u><a href="http://localhost:3000/tools/pdf/crop">pdfcrops.app/tools</a> </u></p>
           
           <h3 className='text-black text-4xl font-bold mb-5'>Click on “Upload PDF”</h3>
                 <p >Once you click on “Upload PDF” you will automatically crop pdf by just single click. </p>

           </div>

       </div>

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
   </main>
  )
}