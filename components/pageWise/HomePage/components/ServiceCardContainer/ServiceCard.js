import Image from 'next/image'
import React, { useContext } from 'react'
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

// Images
import amazonSmallLogo from "../../../../../public/images/logos/amazonSmallLogo.png"
import meeshoSmallLogo from "../../../../../public/images/logos/meeshoSmallLogo.png"
import flipkartSmallLogo from "../../../../../public/images/logos/flipkartSmallLogo.png"
import glowroadSmallLogo from "../../../../../public/images/logos/glowroadSmallLogo.png"
import Link from 'next/link'
import pdfCropContext from '../../../../../context/PdfCrop/PdfCropContext'




const ServiceCard = ({ service }) => {

    const { pdfCropSiteDetails, setPdfCropSiteDetails } = useContext(pdfCropContext)

    return (
        <Link
            href={`/tools/pdf/crop`}
            onClick={() => setPdfCropSiteDetails(service)}
            key={service.id}
            className={`w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52  
             ${service.name === "Amazon" && "bg-[#FF9900]"} 
             ${service.name === "Flipkart" && "bg-[#FFE11B]"} 
             ${service.name === "Meesho" && "bg-[#EA4E85]"} 
             ${service.name === "GlowRoad" && "bg-[#1A6977]"} 
             flex flex-col items-center justify-between rounded-xl hover:cursor-pointer`}
        >
            {/* Icons */}
            <div className='w-full flex justify-between items-center p-2'>
                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white'>
                    {service.icon === "amazonSmallLogo" && <Image unoptimized src={amazonSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "meeshoSmallLogo" && <Image unoptimized src={meeshoSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "flipkartSmallLogo" && <Image unoptimized src={flipkartSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                    {service.icon === "glowroadSmallLogo" && <Image unoptimized src={glowroadSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                </div>

            </div>

            {/* Detials */}
            <div className='w-full flex justify-between items-center bg-white p-3 '>
                <div className='flex flex-col items-start justify-start md:space-y-1'>
                    <span className='text-brandDarkColor font-bold text-sm md:text-base'> {service.name} Crop </span>
                    <span className='text-brandDarkColor font-medium text-xs md:text-xs'> Crop your PDF </span>
                </div>

                <HiOutlineArrowNarrowRight />
            </div>
        </Link>
    )
}

export default ServiceCard