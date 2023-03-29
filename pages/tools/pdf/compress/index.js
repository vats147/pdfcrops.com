import React, { useEffect, useState } from 'react'
import { PDFcropSiteOptions } from '@/constants/PDFcropSiteOptions/PDFcropSiteOptions'
import { useRouter } from 'next/router'
import DropFileContainer from '@/components/pageWise/HomePage/pdfCropPage/DropFileContainer/compressfilecontainer'
import { PDFcropSiteOptions as PDFcropSiteOptionsConstantArray } from "../../../../constants/PDFcropSiteOptions/PDFcropSiteOptions"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebaseConfig'





const Index = () => {
  const router = useRouter()

  const [selectedSiteDetailsState, setSelectedSiteDetailsState] = useState({})


 


  // getting selectedSiteDetails from local storage and storing it in state
  useEffect(() => {
    if (!window.localStorage.getItem("selectedSiteDetails")) {
      window.localStorage.setItem("selectedSiteDetails", JSON.stringify(PDFcropSiteOptions[1]))
    } else if (window.localStorage.getItem("selectedSiteDetails")) {
        const siteData = JSON.parse(window.localStorage.getItem("selectedSiteDetails"))
        setSelectedSiteDetailsState(siteData)
    }

  }, [])






  return (
    <main className='w-full mt-[8vh] py-5 bg-[#EFF6FB] flex flex-col items-center justify-start pb-40'>

      {/*Container */}
      <div className='w-full flex flex-col justify-start items-center'>
        <h4 className='my-5 font-bold text-3xl md:text-5xl text-center' onClick={() => console.log(selectedSiteDetailsState)}>
          Compress PDF
          
        </h4>


       
        


        {/* Dropdown Container */}
        <div className='w-full flex flex-col justify-start items-center  pb-20'>
          <DropFileContainer selectedSiteDetailsState={selectedSiteDetailsState}  setSelectedSiteDetailsState={setSelectedSiteDetailsState}  />
        </div>


      </div>

    </main>
  )
}

export default Index