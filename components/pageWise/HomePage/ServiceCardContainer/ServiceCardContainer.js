import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import Image from 'next/image'
import React from 'react'
import AliceCarousel from 'react-alice-carousel'

import amazonSmallLogo from "../../../../public/images/logos/amazonSmallLogo.png"

const ServiceCardContainer = () => {


    const items = PDFcropSiteOptions?.map((service) => {
        return (
            <div key={service.id} className={`w-20 h-20  bg-red-300`}>
                <h1> {service.name} </h1>
                {/* <Image src={`/../../../../public/images/logos/${service.icon}.png`} alt="icon" width={5} height={6} className="w-10 h-10" /> */}
                <Image src={amazonSmallLogo} alt="icon" width={5} height={6} className="w-10 h-10" />
            </div>
        )
    })

    const responsive = {
        0: {
          items: 2,
        },
        640: {
            items: 4
        },
        768: {
          items: 2,
        },
        1024: {
            items: 4
        }
      };


    return (
        <div className='w-full lg:w-[70%] xl:w-[60%] flex justify-center items-center bg-red-400'>
            <AliceCarousel
                disableButtonsControls
                disableDotsControls
                items={items}
                responsive={responsive}
            />

        </div>
    )
}

export default ServiceCardContainer