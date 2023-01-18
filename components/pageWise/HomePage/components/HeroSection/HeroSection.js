import Image from 'next/image'
import React from 'react'
import pdfOne from "../../../../../public/images/pdfOne.png"

const HeroSection = () => {
  return (
    <section className='w-full h-[60vh] flex flex-col justify-start items-center lg:flex-row lg:items-center lg:justify-center'>

      {/* ---- Text ---- */}
      <div className='w-full h-full lg:w-[50%] flex justify-center items-center bg-red-200'>
        <div className='w-[90%] flex flex-col items-center justify-center bg-red-400'>
          <h2> Your Productivity Lives at Xodo </h2>
        </div>
      </div>

      {/*  ---- Hero Image ----  */}
      <div className='w-full h-full lg:w-[50%] flex justify-center items-center bg-red-50'>
        <Image
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