import Image from 'next/image'
import React from 'react'
import pdfOne from "../../../../../public/images/pdfOne.png"

const HeroSection = () => {
  return (
    <section className='w-full h-[60vh] flex flex-col justify-start items-center lg:flex-row lg:items-center lg:justify-center lg:bg-gradient-to-b from-sky-500 via-fuchsia-400 to-gray-100'>

      {/* ---- Text ---- */}
      <div className='w-full h-full lg:w-[50%] flex flex-col justify-start items-center  pt-20 bg-gradient-to-b from-sky-500 via-fuchsia-400 to-gray-100 lg:bg-transparent'>
        <div className='w-[90%] flex flex-col items-center justify-start text-center space-y-5'>
          <h3 className='text-brandDarkColor text-4xl font-bold '> Free tools for the cropping your PDFs </h3>
          <p className='text-brandDarkColor text-base font-medium'> We offer PDF tools to crop according to your selected options </p>
        </div>
      </div>

      {/*  ---- Hero Image ----  */}
      <div className='hidden lg:inline-flex w-full h-full lg:w-[50%] justify-center items-center '>
        <Image
          draggable="false"
          quality={100}
          unoptimized
          src={pdfOne}
          alt="hero-image"
          width={30}
          height={30}
          className="w-full lg:w-[50%] aspect-square" />

      </div>



    </section>
  )
}

export default HeroSection