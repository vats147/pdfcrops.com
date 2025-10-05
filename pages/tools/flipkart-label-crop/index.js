import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'

const FlipkartLabelCrop = () => {
  const router = useRouter()
  const [selectedSiteDetailsState, setSelectedSiteDetailsState] = useState({})

  // Pre-select Flipkart on mount
  useEffect(() => {
    const flipkartSite = PDFcropSiteOptions.find(site => site.name === "Flipkart")
    if (flipkartSite) {
      setSelectedSiteDetailsState(flipkartSite)
      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(flipkartSite))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Flipkart Label Crop - Free Online PDF Cropper | Flipkart Seller Tools</title>
        <meta name="description" content="Free Flipkart label crop tool. Crop Flipkart shipping labels online in seconds. Perfect for Flipkart sellers. No signup required. Crop PDF for Flipkart orders instantly." />
        <meta name="keywords" content="flipkart label crop, flipkart crop, flipkart pdf crop, flipkart login seller, flipkart seller account, label crop flipkart, crop pdf flipkart, seller flipkart, flipkart shipping label crop" />
        <link rel="canonical" href="https://pdfcrops.app/tools/flipkart-label-crop" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Flipkart Label Crop - Free Online Tool for Flipkart Sellers" />
        <meta property="og:description" content="Crop Flipkart shipping labels online for free. Fast, secure, and perfect for Flipkart sellers." />
        <meta property="og:url" content="https://pdfcrops.app/tools/flipkart-label-crop" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flipkart Label Crop - Free Tool" />
        <meta name="twitter:description" content="Free Flipkart label crop for sellers. Crop PDF shipping labels instantly." />
      </Head>

      <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>
        <div className='w-full flex flex-col justify-start items-center'>
          <h1 className='my-5 font-bold text-3xl md:text-5xl text-center'>
            Crop <span className='bg-[#FFE11B] text-[#287FF0] px-3 sm:p-1 rounded-sm'>Flipkart</span> Shipping Labels
          </h1>
          <p className='text-center text-gray-600 max-w-2xl px-4 mb-5'>
            Free online tool to crop Flipkart shipping labels. Perfect for Flipkart sellers who need quick label cropping for orders.
          </p>

          {/* Options Bar */}
          <div className='w-full flex justify-center items-center my-5'>
            <div className='w-[95%] md:w-auto flex flex-wrap justify-center items-center space-x-1 rounded-full bg-white shadow-xl shadow-gray-300 px-5 py-2'>
              {PDFcropSiteOptions && PDFcropSiteOptions?.map((site) => {
                return (
                  <button
                    key={site.icon}
                    onClick={() => {
                      setSelectedSiteDetailsState(site)
                      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(site))
                    }}
                    className={`px-2 py-1 md:px-5 md:py-2 rounded-full m-1 md:m-2 ${selectedSiteDetailsState?.name === site?.name && site?.bgColor}`}
                  >
                    <span className={`text-lg font-bold ${selectedSiteDetailsState?.name === site?.name ? site?.textColor : "text-black"}`}> {site?.name} </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dropdown Container */}
          <div className='w-full flex flex-col justify-start items-center pb-20'>
            <DropFileContainer selectedSiteDetailsState={selectedSiteDetailsState} setSelectedSiteDetailsState={setSelectedSiteDetailsState} />
          </div>
        </div>
      </main>
    </>
  )
}

export default FlipkartLabelCrop
