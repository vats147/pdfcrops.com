import React from 'react'
import { tosDetails } from '../../constants/TOS/tosDetails'

const Index = () => {
    return (
        <main className='w-full  mt-[8vh] py-20 flex flex-col justify-center items-center'>

            <div className='w-full flex flex-col justify-start items-center space-y-4 px-5 md:px-10 lg:px-20 pb-20'>
                <div className='flex flex-col justify-start items-center space-y-2 mb-5'>
                    <h3 className='text-black text-3xl font-bold mb-5'> Terms & Conditions</h3>
                    <p className='text-gray-500 text-base font-medium'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt hic beatae ad aliquam molestiae tempora rerum molestias nam quibusdam odio officiis, optio facere quia modi similique eligendi ullam praesentium quod omnis veritatis? Quas animi modi hic nesciunt, ipsum recusandae sapiente quam assumenda. Similique quis eos velit aliquid, quam consequatur eius ea fugiat dolorem illum ex tempora omnis quas dolor alias reiciendis culpa repudiandae blanditiis fugit optio. Cum, esse illum quaerat nobis rerum ab quasi, iste dolor aut soluta culpa quos pariatur nam quibusdam id neque. Aperiam odio consequatur nostrum facilis aliquam, esse atque iure culpa possimus optio modi placeat libero.
                    </p>
                </div>

                <div className='flex flex-col justify-start items-center space-y-2'>
                    <h4 className='text-black text-2xl font-bold mb-5'> PDF Crops Services Provided </h4>
                    <p className='text-gray-500 text-base font-medium'>
                        TinyWow is a cost-free, ad-free, privacy conscious Site that allows Users to upload files on to the Site server for processing and converting PDF documents and providing other helpful tools related thereto and as set forth on this Site (collectively referred to as the “Services”). By utilizing this Site and the Services offered thereon, you hereby agree to all terms and conditions set forth herein and assume all liabilities and requirements related thereto. The Site does not currently require any registration or fees for usage, and therefore, your usage alone is an express acknowledgement and agreement to all terms and conditions herein.
                    </p>
                </div>

                <div className='flex flex-col justify-start items-start space-y-5'>
                    {tosDetails && (
                        tosDetails?.map((tos) => {
                            return (
                                <div key={tos.id} className="flex flex-col justify-start items-center">
                                    <h5 className='text-black text-2xl font-bold mb-5'> {tos.heading} </h5>
                                    <p className='text-gray-500 text-base font-medium'> {tos.details} </p>

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