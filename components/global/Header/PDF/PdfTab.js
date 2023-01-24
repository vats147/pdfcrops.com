import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
// Images
import amazonSmallLogo from "../../../../public/images/logos/amazonSmallLogo.png"
import meeshoSmallLogo from "../../../../public/images/logos/meeshoSmallLogo.png"
import flipkartSmallLogo from "../../../../public/images/logos/flipkartSmallLogo.png"
import glowroadSmallLogo from "../../../../public/images/logos/glowroadSmallLogo.png"


const solutions = [
  {
    name: 'Amazon Crop',
    description: 'lorem lorem lorem lorem lorem',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Meesho Crop',
    description: 'lorem lorem lorem lorem lorem',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Flipkart Crop',
    description: 'lorem lorem lorem lorem lorem',
    href: '##',
    icon: IconThree,
  },
  {
    name: 'Glowroad Crop',
    description: 'lorem lorem lorem lorem lorem',
    href: '##',
    icon: IconThree,
  },
]

export default function PdfTab() {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className="group inline-flex items-center rounded-md text-base font-medium text-black ring-0 focus:ring-0"
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
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >

                        <div className={`w-14 h-14 flex justify-center items-center mr-2 border rounded-lg
                        ${item.name === "Amazon Crop" && "bg-[#FF9900] rounded-md"}
                        ${item.name === "Flipkart Crop" && "bg-[#FFE11B] rounded-md"}
                        ${item.name === "Meesho Crop" && "bg-[#EA4E85] rounded-md"}
                        ${item.name === "Glowroad Crop" && "bg-[#1A6977] rounded-md"}
                        `}>
                          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white'>
                            {item.name === "Amazon Crop" && <Image unoptimized src={amazonSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "Meesho Crop" && <Image unoptimized src={meeshoSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "Flipkart Crop" && <Image unoptimized src={flipkartSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                            {item.name === "Glowroad Crop" && <Image unoptimized src={glowroadSmallLogo} alt="icon" width={5} height={6} className="w-5 h-5" />}
                          </div>
                        </div>

                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
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

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}
