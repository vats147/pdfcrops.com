import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'

const AmazonLabelCrop = () => {
  const router = useRouter()
  const [selectedSiteDetailsState, setSelectedSiteDetailsState] = useState({})

  // Pre-select Amazon on mount
  useEffect(() => {
    const amazonSite = PDFcropSiteOptions.find(site => site.name === "Amazon")
    if (amazonSite) {
      setSelectedSiteDetailsState(amazonSite)
      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(amazonSite))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Amazon Label Crop - Free Online PDF Cropper for Amazon Sellers</title>
        <meta name="description" content="Free Amazon label crop tool. Crop Amazon shipping labels online in seconds. Perfect for Amazon sellers. No signup required. Quick label cropping for Amazon orders." />
        <meta name="keywords" content="amazon label crop, amazon crop, amazon pdf crop, amazon seller, label crop amazon, crop pdf amazon, quick label amazon, amazon shipping label crop" />
        <link rel="canonical" href="https://pdfcrops.app/tools/amazon-label-crop" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Amazon Label Crop - Free Tool for Amazon Sellers" />
        <meta property="og:description" content="Crop Amazon shipping labels online for free. Fast, secure, and perfect for Amazon sellers." />
        <meta property="og:url" content="https://pdfcrops.app/tools/amazon-label-crop" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amazon Label Crop - Free Tool" />
        <meta name="twitter:description" content="Free Amazon label crop for sellers. Crop PDF shipping labels instantly." />
      </Head>

      <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>
        <div className='w-full flex flex-col justify-start items-center'>
          <h1 className='my-5 font-bold text-3xl md:text-5xl text-center'>
            Crop <span className='bg-[#FF9900] text-black px-3 sm:p-1 rounded-sm'>Amazon</span> Shipping Labels
          </h1>
          <p className='text-center text-gray-600 max-w-2xl px-4 mb-5'>
            Free online tool to crop Amazon shipping labels. Perfect for Amazon sellers who need quick label cropping for orders.
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

export default AmazonLabelCrop
