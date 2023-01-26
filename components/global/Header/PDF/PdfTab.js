import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useContext } from 'react'
// Images
import amazonSmallLogo from "../../../../public/images/logos/amazonSmallLogo.png"
import meeshoSmallLogo from "../../../../public/images/logos/meeshoSmallLogo.png"
import flipkartSmallLogo from "../../../../public/images/logos/flipkartSmallLogo.png"
import glowroadSmallLogo from "../../../../public/images/logos/glowroadSmallLogo.png"

import Link from 'next/link'
import pdfCropContext from '@/context/pdfCrop/PdfCropContext'


const solutions = [
  {
    id: 1,
    name: "Amazon",
    value: 1,
    icon: "amazonSmallLogo",
    bgColor: "bg-[#FF9900]",
    textColor: "text-black",
    oneLineDescription: "Lorem ipsum dolor sit amet semibold"
},
{
    id: 2,
    name: "Flipkart",
    value: 2,
    icon: "flipkartSmallLogo",
    bgColor: "bg-[#FFE11B]",
    textColor: "text-[#287FF0]",
    oneLineDescription: "Lorem ipsum dolor sit amet semibold"
},
{
    id: 4,
    name: "Meesho",
    value: 1,
    icon: "meeshoSmallLogo",
    bgColor: "bg-[#EA4E85]",
    textColor: "text-white",
    oneLineDescription: "Lorem ipsum dolor sit amet semibold"
},
{
    id: 3,
    name: "GlowRoad",
    value: 2,
    icon: "glowroadSmallLogo",
    bgColor: "bg-[#1A6977]",
    textColor: "text-white",
    oneLineDescription: "Lorem ipsum dolor sit amet semibold"
}
]


export default function PdfTab() {

  const {setPdfCropSiteDetails} = useContext(pdfCropContext)

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className="group inline-flex items-center rounded-md text-base font-medium text-black ring-0 focus:ring-0 outline-none"
            >
              <span>PDF</span>

            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-50 mt-5 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions?.map((item) => (
                      <Link
                        href={"/tools/pdf/crop"}
                        onClick={() => setPdfCropSiteDetails(item)}
                        key={item.id}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none"
                      >

                        <div className={`w-14 h-14 flex justify-center items-center mr-2 border rounded-lg
                        ${item.name === "Amazon" && "bg-[#FF9900] rounded-md"}
                        ${item.name === "Flipkart" && "bg-[#FFE11B] rounded-md"}
                        ${item.name === "Meesho" && "bg-[#EA4E85] rounded-md"}
                        ${item.name === "GlowRoad"  && "bg-[#1A6977] rounded-md"}
                        `}>
                          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white'>
                            {item.name === "Amazon" && <Image unoptimized src={amazonSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "Meesho" && <Image unoptimized src={meeshoSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "Flipkart" && <Image unoptimized src={flipkartSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "GlowRoad" && <Image unoptimized src={glowroadSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                          </div>
                        </div>

                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name} Crop
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.oneLineDescription}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>



                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

