import React from 'react'
import { SiteStatsArray } from "../../../../../constants/SiteStats/SiteStats"

const StatsSection = () => {
    return (
        <section className='w-[90%] lg:w-[70%] xl:w-[60%] bg-brandMidColor px-2 sm:px-4 py-5 rounded-md shadow-md shadow-slate-200 flex justify-center sm:justify-between items-center space-x-5 my-5'>

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
    )
}

export default StatsSection