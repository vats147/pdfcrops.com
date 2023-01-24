import { PdfProcessSteps } from '@/constants/PdfProcess/PdfProcessSteps'
import Image from 'next/image'
import React from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

// Images
import firstPDFprocess from "../../../../../public/images/pdfProcessSectionImages/firstPDFprocess.png"
import secondPDFprocess from "../../../../../public/images/pdfProcessSectionImages/secondPDFprocess.png"
import thirdPDFprocess from "../../../../../public/images/pdfProcessSectionImages/thirdPDFprocess.png"

// Icons
import { TbCircleDot } from "react-icons/tb"

const PdfProcessSection = () => {
    return (
        <section className='w-full flex justify-center items-center py-5 bg-gray-100'>

            <div className='w-full md:w-[80%] lg:w-[70%] bg-white flex flex-col justify-start items-center lg:items-start p-2 lg:py-5 md:rounded-lg md:shadow-2xl md:shadow-gray-300'>

                <p className='text-black font-semibold text-2xl lg:mx-5 lg:my-2 xl:ms-8 xl:my-4'> How Crop PDF Works </p>
                <div className='w-full flex flex-col md:flex-row items-center justify-start py-5'>

                    {/* Images */}
                    <div className='w-full flex justify-center items-center space-x-3'>
                        <Image unoptimized src={firstPDFprocess} alt="first" width={10} height={10} className="w-14 h-14 sm:w-20 sm:h-20 md:w-20 md:h-20 xl:w-24 xl:h-24" />
                        <HiOutlineArrowNarrowRight />
                        <Image unoptimized src={secondPDFprocess} alt="second" width={10} height={10} className="w-14 h-14 sm:w-20 sm:h-20 md:w-20 md:h-20 xl:w-24 xl:h-24" />
                        <HiOutlineArrowNarrowRight />
                        <Image unoptimized src={thirdPDFprocess} alt="third" width={10} height={10} className="w-14 h-14 sm:w-20 sm:h-20 md:w-20 md:h-20 xl:w-24 xl:h-24" />

                    </div>

                    {/* Process Details */}
                    <div className='w-full flex flex-col justify-start items-center my-4'>

                        {PdfProcessSteps && PdfProcessSteps?.map((step) => {
                            return (
                                <div
                                    key={step.id}
                                    className="w-[90%] flex flex-col items-start justify-start px-2 my-2">

                                    <div className='w-full flex justify-start items-center space-x-2'>

                                        {/* Vertical Path and point symbol  */}
                                        <div className='hidden md:inline-flex h-24 relative justify-center items-center px-2'>
                                            <TbCircleDot className='text-red-600 z-20' />
                                            <div className="h-full absolute w-[2px] border-l-2 border-l-gray-200" />
                                        </div>

                                        {/* Heading and detail */}
                                        <div className='w-full flex flex-col justify-start items-start space-y-2'>
                                            <p className='text-black text-base font-bold'> {step.heading} </p>
                                            <p className='text-black text-sm font-normal'> {step.details} </p>
                                        </div>
                                    </div>

                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>


        </section>
    )
}

export default PdfProcessSection