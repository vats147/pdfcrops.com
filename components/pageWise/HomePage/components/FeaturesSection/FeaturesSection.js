import { FeaturesHomeSection } from '@/constants/FeaturesHomeSection/FeaturesHomeSection'
import React from 'react'

const FeaturesSection = () => {
  return (
    <section className='w-full flex justify-center items-center py-5 bg-gray-100'>

      <div className='w-full md:w-[80%] lg:w-[70%] bg-white flex flex-col justify-start items-center lg:items-center p-2 lg:py-5 md:rounded-lg md:shadow-2xl md:shadow-gray-300'>
        <p className='text-black font-semibold text-2xl my-4 lg:mx-5 lg:my-2 xl:mx-8 xl:my-4'> More about Crop PDF Tool </p>


        <div className='w-full flex flex-wrap justify-center items-center my-5'>
          {FeaturesHomeSection && FeaturesHomeSection.map((feature) => {
            return (
              <div key={feature.id} className='w-full sm:w-52 md:w-60 lg:w-80 px-5 py-8 m-4 bg-[#D9EFFF] flex flex-col justify-start items-center rounded-lg'>
                
                <div className='w-10 h-10 -mt-12 rounded-lg bg-[#FF4A53] flex justify-center items-center shadow-lg shadow-gray-300'>
                  {feature.icon}
                </div>

                <div className='w-full flex flex-col justify-start items-center py-8 text-center space-y-1'>
                  <h4 className='text-black text-base font-bold'> {feature.heading} </h4>
                  <p className='text-black text-sm font-normal'> {feature.details} </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

export default FeaturesSection