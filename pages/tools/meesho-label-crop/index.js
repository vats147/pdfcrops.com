import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer'

const MeeshoLabelCrop = () => {
  const router = useRouter()
  const [selectedSiteDetailsState, setSelectedSiteDetailsState] = useState({})

  // Pre-select Meesho on mount
  useEffect(() => {
    const meeshoSite = PDFcropSiteOptions.find(site => site.name === "Meesho")
    if (meeshoSite) {
      setSelectedSiteDetailsState(meeshoSite)
      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(meeshoSite))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Meesho Label Crop - Free Online Meesho Label Cropper | Meesho Seller Tools</title>
        <meta name="description" content="Free Meesho label crop tool. Crop Meesho shipping labels online instantly. Perfect for Meesho sellers and suppliers. Meesho label cropper for quick PDF cropping." />
        <meta name="keywords" content="meesho label crop, meesho crop, meesho label cropper, meesho crop pdf, meesho login, meesho login seller, meesho shipping label crop, meesho seller, meesho supplier, meesho supplier login, supplier meesho, meesho seller hub, label crop meesho, crop pdf meesho" />
        <link rel="canonical" href="https://pdfcrops.app/tools/meesho-label-crop" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Meesho Label Crop - Free Meesho Label Cropper for Sellers" />
        <meta property="og:description" content="Crop Meesho shipping labels online for free. Fast tool for Meesho sellers and suppliers." />
        <meta property="og:url" content="https://pdfcrops.app/tools/meesho-label-crop" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meesho Label Crop - Free Meesho Label Cropper" />
        <meta name="twitter:description" content="Free Meesho label crop for sellers. Crop PDF shipping labels instantly." />
      </Head>

      <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>
        <div className='w-full flex flex-col justify-start items-center'>
          <h1 className='my-5 font-bold text-3xl md:text-5xl text-center'>
            Crop <span className='bg-[#EA4E85] text-white px-3 sm:p-1 rounded-sm'>Meesho</span> Shipping Labels
          </h1>
          <p className='text-center text-gray-600 max-w-2xl px-4 mb-5'>
            Free online Meesho label cropper. Crop Meesho shipping labels quickly for sellers and suppliers. No signup required.
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

export default MeeshoLabelCrop
