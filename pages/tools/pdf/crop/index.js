import React, { useEffect, useState } from 'react'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import PdfCropContext from '../../../../context/PdfCrop/PdfCropContext'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'
import { PDFcropSiteOptions as PDFcropSiteOptionsConstantArray } from "../../../../constants/PDFcropSiteOptions/PDFcropSiteOptions"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebaseConfig'





const Index = () => {
  const router = useRouter()


  // useEffect(() => {
  //   if (!pdfCropSiteDetails) {
  //     setPdfCropSiteDetails(PDFcropSiteOptionsConstantArray[0])
  //   }
  // }, [])

  // getting selected site data from local storage
  // useEffect(() => {
  //   setPdfCropSiteDetails(JSON.parse(window.localStorage.getItem("selectedSiteDetails")) || PDFcropSiteOptionsConstantArray[0])
  // }, [])


  



  return (
    <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>

      {/*Container */}
      <div className='w-full flex flex-col justify-start items-center'>
        {/* <h4 className='my-5 font-bold text-3xl md:text-5xl text-center' onClick={() => console.log(pdfCropSiteDetails)}>
          Crop Your PDF of <span className={`${pdfCropSiteDetails?.bgColor} ${pdfCropSiteDetails?.textColor} px-3 sm:p-1 rounded-sm`}> {!pdfCropSiteDetails != "_____" ? pdfCropSiteDetails?.name : "_____"} </span>
        </h4> */}

        <h4 className='my-5 font-bold text-3xl md:text-5xl text-center' onClick={() => console.log(1)}>
          Crop Your PDF of <span className={`bg-red-300 text-black px-3 sm:p-1 rounded-sm`}> "sd" </span>
        </h4>

        {/* Options */}
        <div className='w-full flex justify-center items-center my-5'>
          <div className='w-[95%] md:w-auto flex flex-wrap justify-center items-center space-x-1 rounded-full bg-white shadow-xl shadow-gray-300 px-5 py-2'>
            {PDFcropSiteOptions && PDFcropSiteOptions?.map((site) => {
              return (
                <button
                  key={site.icon}
                  onClick={() => {
                    // setPdfCropSiteDetails(site)
                    window.localStorage.setItem("selectedSiteDetails", JSON.stringify(site))
                    // console.log(site)
                  }}
                  className={`px-2 py-1 md:px-5 md:py-2 rounded-full m-1 md:m-2  `}
                >
                  <span className={`text-lg font-bold text-black `}> {site?.name} </span>
                </button>
              )
            })}
          </div>
        </div>


        {/* Dropdown Container */}
        <div className='w-full flex flex-col justify-start items-center  pb-20'>
          <DropFileContainer />
        </div>


      </div>

    </main>
  )
}

export default Index