import React from 'react'
import { tosDetails } from '../../constants/TOS/tosDetails'

const Index = () => {
    return (
        <main className='w-full  mt-[8vh] py-20 flex flex-col justify-center items-center'>

            <div className='w-full flex flex-col justify-start items-center space-y-4 px-5 md:px-32 lg:px-40 xl:px-52 pb-20 '>
                {/* Terms & Conditions */}
                <div className='flex flex-col justify-start items-center space-y-2 mb-5'>
                    <h3 className='text-black text-5xl font-bold mb-5'> Terms & Conditions </h3>
                  
                </div>


                {/* PDF Crops Services Provided */}
                <div className='flex flex-col justify-start items-start space-y-2'>
                    <h3 className='text-black text-4xl font-bold mb-5'> PDF Crops Services Provided </h3>
                    <p className='text-gray-500 text-base font-normal'>
                        TinyWow is a cost-free, ad-free, privacy conscious Site that allows Users to upload files on to the Site server for processing and converting PDF documents and providing other helpful tools related thereto and as set forth on this Site (collectively referred to as the “Services”). By utilizing this Site and the Services offered thereon, you hereby agree to all terms and conditions set forth herein and assume all liabilities and requirements related thereto. The Site does not currently require any registration or fees for usage, and therefore, your usage alone is an express acknowledgement and agreement to all terms and conditions herein.
                    </p>
                </div>


                <div className='flex flex-col justify-start items-start space-y-7'>
                    {tosDetails && (
                        tosDetails?.map((tos) => {
                            return (
                                <div key={tos.id} className="flex flex-col justify-start items-start">
                                    <h3 className='text-black text-4xl font-bold mb-5'> {tos.heading} </h3>
                                    <p className='text-gray-500 text-base font-normal'> {tos.details} </p>

                                </div>
                                
                            )
                        })
                    )}
                </div>


            </div>

        </main>
    )
}

export default Index