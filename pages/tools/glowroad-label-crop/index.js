import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'

const GlowRoadLabelCrop = () => {
  const router = useRouter()
  const [selectedSiteDetailsState, setSelectedSiteDetailsState] = useState({})

  // Pre-select GlowRoad on mount
  useEffect(() => {
    const glowroadSite = PDFcropSiteOptions.find(site => site.name === "GlowRoad")
    if (glowroadSite) {
      setSelectedSiteDetailsState(glowroadSite)
      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(glowroadSite))
    }
  }, [])

  return (
    <>
      <Head>
        <title>GlowRoad Label Crop - Free Online PDF Cropper for GlowRoad Sellers</title>
        <meta name="description" content="Free GlowRoad label crop tool. Crop GlowRoad shipping labels online in seconds. Perfect for GlowRoad sellers. No signup required. Quick label cropping for GlowRoad orders." />
        <meta name="keywords" content="glowroad label crop, glowroad crop, glowroad pdf crop, label crop glowroad, crop pdf glowroad, quick label glowroad, glowroad shipping label crop" />
        <link rel="canonical" href="https://pdfcrops.app/tools/glowroad-label-crop" />
        
        {/* Open Graph */}
        <meta property="og:title" content="GlowRoad Label Crop - Free Tool for GlowRoad Sellers" />
        <meta property="og:description" content="Crop GlowRoad shipping labels online for free. Fast, secure, and perfect for GlowRoad sellers." />
        <meta property="og:url" content="https://pdfcrops.app/tools/glowroad-label-crop" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GlowRoad Label Crop - Free Tool" />
        <meta name="twitter:description" content="Free GlowRoad label crop for sellers. Crop PDF shipping labels instantly." />
      </Head>

      <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>
        <div className='w-full flex flex-col justify-start items-center'>
          <h1 className='my-5 font-bold text-3xl md:text-5xl text-center'>
            Crop <span className='bg-[#1A6977] text-white px-3 sm:p-1 rounded-sm'>GlowRoad</span> Shipping Labels
          </h1>
          <p className='text-center text-gray-600 max-w-2xl px-4 mb-5'>
            Free online tool to crop GlowRoad shipping labels. Perfect for GlowRoad sellers who need quick label cropping for orders.
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

export default GlowRoadLabelCrop
