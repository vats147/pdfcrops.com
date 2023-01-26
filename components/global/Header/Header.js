import React, { useState } from 'react'
import { BrandName } from '@/constants/BrandDetails/BrandDetails'
import logoOne from "../../../public/images/logos/logoOne.svg"
import Image from 'next/image'
import Sidebar from '../Sidebar/Sidebar'

// Icons Import
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"
import PdfTab from './PDF/PdfTab'
import Link from 'next/link'
import LoginComponent from '../LoginComponent/LoginComponent'



const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  return (
    <header className='z-50 fixed top-0 w-full h-[8vh] bg-gray-100 flex justify-between items-center px-3 '>

      {/* Brand Name and Logo */}
      <Link href={`/`} className='flex justify-center items-center space-x-3'>
        <Image src={logoOne} alt="logoOne" width={8} height={8} className="w-8 h-8 rounded-full" />
        <h1 className='text-base font-semibold text-brandDarkColor'> {BrandName} </h1>
      </Link>

      <div className='hidden md:inline-flex flex-center items-center space-x-10'>
        <PdfTab />
        <Link href={`/pricing`} className="text-base font-medium text-black"> Pricing </Link>
        <Link href={`/`} className="text-base font-medium text-black"> About </Link>
        <Link href={`/contact`} className="text-base font-medium text-black"> Contact </Link>


        {/* Sign in Button */}
        <LoginComponent />
      </div>





        {/* Hamburger Icon */}
        {!isSidebarVisible ? (
          <RxHamburgerMenu className='md:hidden w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
        ) : (
          <RxCross1 className='md:hidden w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
        )}

      {/* Sidebar */}
      <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />

    </header>
  )
}

export default Header