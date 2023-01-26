import Image from 'next/image'
import React from 'react'
import heroImage from "../../../../../public/images/heroImage.png"


// h-[45vh] lg:h-[70vh] xl:h-[65vh]

const HeroSection = () => {
  return (
    <section className='w-full border border-black pt-14 md:pt-20 flex flex-col justify-start items-center lg:flex-row lg:items-center lg:justify-center lg:bg-gradient-to-b from-sky-500 via-fuchsia-400 to-gray-100'> 

      {/* ---- Text Section ---- */}
      <div className='w-full h-full lg:w-[50%] flex flex-col justify-start lg:justify-center items-center pt-20 bg-gradient-to-b from-sky-500 via-fuchsia-400 to-gray-100 lg:bg-transparent'>
        <div className='w-[90%] sm:w-[80%] md:w-[60%] lg:w-[80%] xl:w-[60%] lg:text-left flex flex-col items-center justify-start text-center space-y-2 lg:space-y-3'>

          <h3 className='text-[#1A4971] text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold '> Your Productivity Lives at Xodo </h3>
          <p className='text-[#343A40] text-base sm:text-xl md:text-2xl font-medium '> Try easy-to-use PDF tools that keep your documents safe </p>
          <p className='text-[#343A40] text-sm sm:text-base font-normal '> Securely view, annotate, and work with your important files across all platforms and devices with the ultimate all-in-one document solution. </p>

        </div>
      </div>

      {/*  ---- Hero Image ----  */}
      <div className='hidden lg:inline-flex w-full h-full lg:w-[50%] justify-center items-center'>
        <Image
          draggable="false"
          quality={100}
          unoptimized 
          src={heroImage}
          alt="hero-image"
          width={30}
          height={30}
          className="w-full lg:w-[45%] xl:w-[45%] 2xl:w-[35%] aspect-square " />

      </div>


    </section>
  )
}

export default HeroSection