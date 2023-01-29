import Image from 'next/image'
import React from 'react'
import heroImage from "../../../../../public/images/heroImage4.jpg"


// bg-gradient-to-b from-sky-500 via-fuchsia-400 to-gray-100

const HeroSection = () => {
  return (
    <section className='w-full py-10 md:py-20 2xl:py-32 flex flex-col justify-start items-center bg-gradient-to-t from-gray-100 via-cyan-500 to-purple-600 lg:flex-row lg:items-center lg:justify-center lg:bg-black'> 

      {/* ---- Text Section ---- */}
      <div className='w-full h-full lg:w-[50%] flex flex-col justify-start lg:justify-center items-center pt-20 '>
        <div className='w-[90%] sm:w-[80%] md:w-[60%] lg:w-[80%] xl:w-[60%] lg:text-left flex flex-col items-center justify-start text-center space-y-2 lg:space-y-3'>

          <h3 className='text-[#000000] text-4xl sm:text-5xl md:text-6xl xl:text-6xl font-bold '>Auto Crop PDF </h3>
          <p className='text-[#490706] text-base sm:text-xl lg:text-2xl font-medium '> Crop your online Ecommerce pdf in one click. </p>
     

        </div>
      </div>

      {/*  ---- Hero Image ----  */}
      <div className='hidden lg:inline-flex w-full h-full lg:w-[50%] justify-center items-center'>
        <Image
          draggable="false"
          quality={100}
          unoptimized 
          src={heroImage}
          alt="pdfcrop process"
          width={30}
          height={30}
          className="w-full xl:w-[60%] 2xl:w-[70%] " />

      </div>


    </section>
  )
}

export default HeroSection