import React, { useContext, useState } from 'react'
import Image from 'next/image'
import logoOne from "../../../public/images/logos/logoOne.svg"

// Images
import amazonSmallLogo from "../../../public/images/logos/amazonSmallLogo.png"
import meeshoSmallLogo from "../../../public/images/logos/meeshoSmallLogo.png"
import flipkartSmallLogo from "../../../public/images/logos/flipkartSmallLogo.png"
import glowroadSmallLogo from "../../../public/images/logos/glowroadSmallLogo.png"

// Icons Import
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { CgFileDocument } from "react-icons/cg"
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'

import Link from 'next/link'
import { BrandName } from '../../../constants/BrandDetails/BrandDetails'
import pdfCropContext from '../../../context/PdfCrop/PdfCropContext'
import { PDFcropSiteOptions } from '../../../constants/PDFcropSiteOptions/PDFcropSiteOptions'
import SidebarLoginComponent from "../../global/LoginComponent/sidebar/SidebarLoginComponent"



const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const [isPdfSectionOpen, setIsPdfSectionOpen] = useState(false)
  const { pdfCropSiteDetails, setPdfCropSiteDetails } = useContext(pdfCropContext)


  return (
    <div className={` fixed top-0 left-0 h-full w-[100%] bg-white flex flex-col items-start justify-between  ${isSidebarVisible ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`}>

      {/* Header */}
      <div className='fixed top-0 w-full h-[8vh] bg-brandMidColor flex justify-between items-center px-3 '>

        <div className='flex justify-center items-center space-x-3'>
          <Image src={logoOne} alt="logoOne" width={8} height={8} className="w-8 h-8 rounded-full" />
          <h1 className='text-base font-semibold text-brandDarkColor'> {BrandName} </h1>
        </div>

        {!isSidebarVisible ? (
          <RxHamburgerMenu className='w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
        ) : (
          <RxCross1 className='w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
        )}
      </div>


      {/* ---- PDF Section ---- */}
      <div className='mt-[10vh] w-full py-3 flex flex-col justify-start items-start px-3' onClick={() => setIsPdfSectionOpen(!isPdfSectionOpen)}>
        <p className='text-brandPrimaryColor font-semibold text-lg'> PDF </p>
        <p className='text-gray-700 font-medium text-sm mt-2'> Featured Tools </p>

        {/* Cards Container */}
        <div className='w-full flex flex-col justify-start items-start space-y-2 my-3'>

          {PDFcropSiteOptions?.map((service) => {
            return (
              <Link
                href={`/tools/pdf/crop`}
                key={service.id}
                onClick={() => {
                  setPdfCropSiteDetails(service)
                  setIsSidebarVisible(false)
                }}
                className='w-full flex justify-start items-center space-x-2'>
                {/* Icon */}
                <div className={`w-16 h-14 flex justify-center items-center mr-2 border ${service?.bgColor} rounded-lg`}>
                  <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white'>
                    {service.icon === "amazonSmallLogo" && <Image unoptimized src={amazonSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "meeshoSmallLogo" && <Image unoptimized src={meeshoSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "flipkartSmallLogo" && <Image unoptimized src={flipkartSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "glowroadSmallLogo" && <Image unoptimized src={glowroadSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                  </div>
                </div>

                {/* Details */}
                <div className='w-full flex flex-col justify-start items-start space-y-1'>
                  <p className='text-black text-base font-semibold'> {service.name} </p>
                  <p className='text-gray-600 text-xs font-normal'> {service.oneLineDescription} </p>
                </div>
              </Link>
            )
          })}







        </div>

        {/* Other Tabs */}
        <div className='flex flex-col justify-start items-start space-y-3 my-5'>
          <Link href={`/pricing`} onClick={() => setIsSidebarVisible(false)} className="text-brandPrimaryColor font-semibold text-lg"> Pricing </Link>
          <Link href={`/`} onClick={() => setIsSidebarVisible(false)} className="text-brandPrimaryColor font-semibold text-lg"> About </Link>
          <Link href={`/contact`} onClick={() => setIsSidebarVisible(false)} className="text-brandPrimaryColor font-semibold text-lg"> Contact </Link>
        </div>
      </div>



      {/* Sign in Button */}
      <div className='w-full my-3 flex justify-center items-center'>
        <SidebarLoginComponent />
      </div>

    </div>
  )
}

export default Sidebar


