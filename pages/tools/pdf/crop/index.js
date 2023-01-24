import React, { useEffect, useState, useContext } from 'react'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import pdfCropContext from '../../../../context/pdfCrop/PdfCropContext'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'





const Index = () => {
  // console.log(`PDF/CROP is running`)
  const router = useRouter()
  
  // States
  const { pdfCropSiteDetails, setPdfCropSiteDetails } = useContext(pdfCropContext)
  



  return (
    <main className='w-full mt-[8vh] h-screen bg-[#EFF6FB] flex flex-col items-center justify-start'>

      {/*Container */}
      <div className='w-full flex flex-col justify-start items-center'>
        <h4 className='my-5 font-bold text-3xl md:text-5xl text-center' onClick={() => console.log(pdfCropSiteDetails)}>
          Crop Your PDF of <span className={`${pdfCropSiteDetails?.bgColor} ${pdfCropSiteDetails?.textColor} px-3 sm:p-1 rounded-sm`}> {!pdfCropSiteDetails != "_____" ? pdfCropSiteDetails.name : "_____"} </span>
        </h4>

        {/* Options */}
        <div className='w-full flex justify-center items-center my-5'>
          <div className='w-[95%] md:w-auto flex flex-wrap justify-center items-center space-x-1 rounded-full bg-white shadow-xl shadow-gray-300 px-5 py-2'>
            {PDFcropSiteOptions && PDFcropSiteOptions?.map((site) => {
              return (
                <button
                  key={site.icon}
                  onClick={() => {
                    setPdfCropSiteDetails(site)
                    // console.log(site)
                  }}
                  className={`px-5 py-2 rounded-full m-2  ${pdfCropSiteDetails.name === site.name && site.bgColor} `}
                >
                  <span className={`text-lg font-bold ${pdfCropSiteDetails.name === site.name ? site.textColor : "text-black"}`}> {site.name} </span>
                </button>
              )
            })}
          </div>
        </div>


        {/* Dropdown Container */}
        <div className='w-full flex flex-col justify-start items-center'>
          <DropFileContainer />
        </div>


      </div>

    </main>
  )
}

export default Index