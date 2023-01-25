import React from 'react'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import Image from 'next/image'
import AliceCarousel from 'react-alice-carousel'
import ServiceCard from './ServiceCard'



const ServiceCardContainer = () => {


    const items = PDFcropSiteOptions?.map((service) => {
        return <ServiceCard service={service} />
    })



    const responsive = {
        0: {
            items: 2.3,
        },
        450: {
            items: 3
        },
        640: {
            items: 3
        },
        1024: {
            items: 4
        }
    };


    return (
        <div className='w-full flex justify-center items-center py-5 lg:py-10 bg-gray-100'>
            <div className='w-full lg:w-[80%] xl:w-[70%] flex justify-center items-center space-x-1 pl-2 sm:pl-0'>
                <AliceCarousel
                    // infinite
                    // autoPlayInterval={1000}
                    // animationDuration={1500}
                    disableButtonsControls
                    disableDotsControls
                    items={items}
                    responsive={responsive}
                    // autoPlay
                />
            </div>

        </div>
    )
}

export default ServiceCardContainer