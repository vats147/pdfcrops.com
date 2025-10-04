import React, { useEffect } from 'react'
import Footer from '@/components/global/Footer/Footer'
import Header from '@/components/global/Header/Header'
import Sidebar from '@/components/global/Sidebar/Sidebar'
import Head from 'next/head'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'

const BaseOneLayout = ({ children }) => {


    useEffect(() => {
        if (!window.localStorage.getItem("selectedSiteDetails")) {
            window.localStorage.setItem("selectedSiteDetails", JSON.stringify(PDFcropSiteOptions[0]))
        }

    }, [])


    return (
        <div className='w-full h-auto bg-gray-100 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll'>
            <Head>
                <title> PDF Crops | Free Online Label Crop | GlowRoad Meesho Flipkart  </title>
                <link rel="canonical" href="https://pdfcrops.app/"></link>

                <meta property="og:description" content="pdfcrops is best, free and safe site for tool such as crop and process Amazon, Flipkart and other e-commerce label, merge crop pdf"></meta>

                <meta property="og:url" content="https://pdfcrops.app/"></meta>

                <meta property="og:title" content=" PDF Crops | Free Online Label Crop | GlowRoad Meesho Flipkart "></meta>

                <meta name="keywords" content="glowroad label crop, meesho label crop, pdf crop meesho,meesho label crop online, free label crop pdf crops,crop label online,best online PDF tools, Amazon label pdf crop,Flipkart label pdf crop, Meesho label pdf crop,Merge PDF,Free online label crop,glowroad label crop, meesho label crop "></meta>

                <meta property="og:description" content="PDF crops is a set of free, simple online tools for PDF file editing. automatically crop any Ecommerce PDF"></meta>

                <meta name="twitter:title" content="pdfcrops | Your Auto crop PDF tools"></meta>
                <meta name="twitter:description" content="PDF crops is a set of free, simple online tools for PDF file editing. You can resize, crop, rotate, split or merge, optimize, and convert PDFs."></meta>

                <meta property="og:image" content="../../../public/images/logos/logo1.png"></meta>
                <meta property="og:image:type" content="image/gif"></meta>
                <meta property="og:image:width" content="100"></meta>
                <meta property="og:image:height" content="100"></meta>
                <meta property="og:type" content="website"></meta>
               
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {/* <Sidebar /> */}

            {children}
            <Footer />

        </div>
    )
}

export default BaseOneLayout
