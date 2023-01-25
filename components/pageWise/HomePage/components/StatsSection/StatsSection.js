import React from 'react'
import { SiteStatsArray } from "../../../../../constants/SiteStats/SiteStats"

const StatsSection = () => {
    return (
        <div className='w-full flex justify-center items-center bg-gray-100 py-5'>
            <section className='w-[95%] lg:w-[70%]  bg-white px-2 sm:px-4 py-5 rounded-md shadow-md shadow-slate-200 flex justify-center sm:justify-between items-center space-x-5 my-6'>

                {SiteStatsArray && (
                    SiteStatsArray?.map((stat) => {
                        return (
                            <div key={stat.id} className='lg:w-full flex flex-col justify-start items-start md:flex-row md:justify-center md:space-x-2 md:items-end '>
                                <span className='text-brandPrimaryColor font-medium text-2xl md:text-4xl'> {stat.number} </span>
                                <span className='font-light md:font-normal text-black text-xs md:text-sm'> {stat.type} </span>
                            </div>
                        )
                    })
                )}



            </section>
        </div>
    )
}

export default StatsSection