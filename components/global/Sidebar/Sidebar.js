import React, { useState } from 'react'

// Icons Import
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { CgFileDocument } from "react-icons/cg"



const Sidebar = ({ isSidebarVisible }) => {
  const [isPdfSectionOpen, setIsPdfSectionOpen] = useState(false)


  return (
    <div className={`fixed top-[8vh] left-0 z-50 h-full w-[100%] bg-black flex flex-col items-start justify-start py-10 ${isSidebarVisible ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`}>


      {/* ---- PDF Section ---- */}
      <div className='w-full py-3 flex justify-between items-center bg-red-100' onClick={() => setIsPdfSectionOpen(!isPdfSectionOpen)}>
        <span className='text-brandDarkColor font-semibold text-lg'> PDF </span>
        <RiArrowDownSLine className='text-brandDarkColor w-6 h-6 hover:cursor-pointer' />
      </div>

      <div className={`w-full h-20 ${isPdfSectionOpen ? "inline-flex" : "hidden"} flex-col justify-start items-start`} >
        <span> Featured tools </span>

        {/* Amazon */}
        <div className='flex justify-between items-center'>
          <div className='bg-[#FFE0E6] p-5'>
            <CgFileDocument className='text-[#FF5975]' />
          </div>
          <div className='flex flex-col items-center justify-start'>
            <span> Crop PDF </span>
            <span>  </span>
          </div>
        </div>

      </div>



      <div className={`w-full h-20 bg-blue-300 `} >

      </div>

      <div className={`w-full h-20 bg-green-300 `} >

      </div>

    </div>
  )
}

export default Sidebar