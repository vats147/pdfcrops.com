import React, { useState } from 'react'
import { BrandName } from '@/constants/BrandDetails/BrandDetails'
import logoOne from "../../../public/images/logos/logoOne.svg"
import Image from 'next/image'
import Sidebar from '../Sidebar/Sidebar'

// Icons Import
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"


const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  return (
    <header className='w-full h-[8vh] bg-brandMidColor flex justify-between items-center px-3 '>

      {/* Brand Name and Logo */}
      <div className='flex justify-center items-center space-x-3'>
        <Image src={logoOne} alt="logoOne" width={8} height={8} className="w-8 h-8 rounded-full" />
        <h1 className='text-base font-semibold text-brandDarkColor'> {BrandName} </h1>
      </div>



      <div className='flex-1 px-5 flex justify-end items-center'>
        <button
          type='signIn'
          className='px-5 py-2 rounded-md bg-brandPrimaryColor text-white text-sm font-medium hover:cursor-pointer hover:bg-[#156BA9]'
        >
          Sign in
        </button>
      </div>

      {!isSidebarVisible ? (
        <RxHamburgerMenu className='md:hidden w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
      ) : (
        <RxCross1 className='md:hidden w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
      )}

      <Sidebar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />

    </header>
  )
}

export default Header