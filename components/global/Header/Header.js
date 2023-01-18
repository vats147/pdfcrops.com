import { BrandName } from '@/constants/BrandDetails/BrandDetails'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full h-[9vh] bg-red-300 flex justify-start items-center'>
      
      <h1> {BrandName} </h1>

    </header>
  )
}

export default Header