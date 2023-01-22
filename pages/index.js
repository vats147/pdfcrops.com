import { Inter } from '@next/font/google'
import HeroSection from '@/components/pageWise/HomePage/components/HeroSection/HeroSection'
import StatsSection from '@/components/pageWise/HomePage/components/StatsSection/StatsSection'
import ServiceCardContainer from '@/components/pageWise/HomePage/ServiceCardContainer/ServiceCardContainer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className='w-full h-screen bg-white flex flex-col items-center justify-start'>
        <HeroSection />
        <ServiceCardContainer />
        <StatsSection />
      </main>
    </>
  )
}
