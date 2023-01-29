import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoOne from "../../../public/images/logos/logo1.png"

const Footer = () => {
  return (
    <div className='w-full pt-4 sm:pt-10 lg:pt-12  flex justify-center items-center'>
      <footer className="w-full md:w-[80%] lg:w-[70%] bg-gray-100 px-3 lg:px-1">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t gap-12 lg:gap-8 pt-10 lg:pt-12 mb-16">
          <div className="col-span-full lg:col-span-2">
            {/* <!-- logo - start --> */}
            <div className="lg:-mt-2 mb-4">
              <a href="/" className="inline-flex items-center text-black-800 text-xl md:text-2xl font-bold gap-2" aria-label="logo">
                <Image src={logoOne} alt="logoOne"  className="w-10 h-10 rounded-full shadow-lg shadow-cyan-500/50"  />
                PDF Crops
              </a>
            </div>
            {/* <!-- logo - end --> */}

            <p className="text-gray-500 sm:pr-8 mb-6">pdfcrops.com is the fastest and easiest way to crop PDFs for your ecommerce business.</p>

            {/* <!-- social - start --> */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/pdfcrops/" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a href="https://twitter.com/pdfcrops" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              {/* <a href="#" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a> */}

              <a href="https://www.facebook.com/profile.php?id=100089300185618" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
            {/* <!-- social - end --> */}
          </div>

          {/* <!-- nav - start --> */}
          <div>
            <div className="text-gray-800 font-bold tracking-widest uppercase mb-4">PDF Crop tools</div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link href="/tools/pdf/crop" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"> Flipkart Crop</Link>
              </div>

              <div>
                <Link href="/tools/pdf/crop" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"> Meesho Crop </Link>
              </div>

              <div>
                <Link href="/tools/pdf/crop" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"> GlowRoad Crop </Link>
              </div>

              {/* <div>
                <a href="#" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"> About </a>
              </div> */}
            </nav>
          </div>
          {/* <!-- nav - end --> */}

          

          

          {/* <!-- nav - start --> */}
          <div>
            <div className="text-gray-800 font-bold tracking-widest uppercase mb-4">Legal</div>

            <nav className="flex flex-col gap-4">
              <div>
                <a href="/tos" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100">Terms of Service</a>
              </div>

              <div>
                <a href="/privacyPolicy" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100">Privacy Policy</a>
              </div>

              
            </nav>
          </div>
          {/* <!-- nav - end --> */}
          {/* <!-- nav - start --> */}
          <div>
            <div className="text-gray-800 font-bold tracking-widest uppercase mb-4">Support</div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link href="/contact" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100">Contact Us</Link>
              </div>

              

              

              <div>
                <a href="#" className="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100">FAQ</a>
              </div>
            </nav>
          </div>
          {/* <!-- nav - end --> */}
        </div>

        <div className="text-gray-400 text-sm text-center border-t py-8">© 2023 - Present PDF crops. All rights reserved.</div>
      </footer>

    </div>
  )
}

export default Footer