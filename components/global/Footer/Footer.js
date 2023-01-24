import Image from 'next/image'
import React from 'react'
import logoOne from "../../../public/images/logos/logoOne.svg"

const Footer = () => {
  return (
    <footer className='w-full flex flex-col justify-start items-center pt-20 bg-gray-100'>

      {/* First footer */}
      <div className='w-full md:w-[90%] lg:w-[60%] flex flex-col md:flex-row justify-start items-center p-5 bg-gray-100 '>

        {/* Brand details */}
        <div className='w-full flex flex-col justify-start items-start space-y-2 md:p-5 '>
          <span className='flex justify-center items-center space-x-2 mb-2'>
            <Image src={logoOne} alt="logoOne" width={8} height={8} className="w-8 h-8 rounded-full" />
            <p className='text-black text-lg font-medium'> PDF Crops </p>
          </span>

          <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> PDFcrops provides free online conversion, pdf, and other handy tools to help you solve problems of all types. All files both processed and unprocessed are deleted after 1 hour.
          </p>
        </div>

        {/* Tabs */}
        <div className='w-full flex flex-col md:flex-row justify-start items-start py-10 space-y-10 md:space-y-0 md:space-x-5 lg:space-x-10 md:px-5'>

          {/* navigate */}
          <div className='flex flex-col items-start justify-start space-y-2'>
            <p className='text-black text-xl font-semibold'> Navigate </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Home </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Privacy Policy </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> About us </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Contact us </p>
          </div>

          {/* tools */}
          <div className='flex flex-col items-start justify-start space-y-2'>
            <p className='text-black text-xl font-semibold'> Tools </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Amazon crop </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Meesho crop </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Flipkart crop </p>
            <p className='text-gray-800 text-base font-normal hover:cursor-pointer'> Glowroad crop </p>
          </div>

        </div>

      </div>

      {/* Last footer */}
      <div className='w-full h-20 bg-[#EFF7FD] flex justify-center items-center p-5 '>
        <div className='w-full md:w-[90%] lg:w-[60%] flex flex-col md:flex-row justify-between items-center p-5'>
          <p className='text-gray-700 text-base font-semibold'> PdfCrops </p>
          <p className='text-gray-700 text-base font-semibold'> @ 2023 PdfCrops. All rights reserved </p>
        </div>

      </div>

    </footer>
  )
}

export default Footer