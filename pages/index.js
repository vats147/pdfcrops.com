import { Inter } from '@next/font/google'
import HeroSection from '@/components/pageWise/HomePage/components/HeroSection/HeroSection'
import StatsSection from '@/components/pageWise/HomePage/components/StatsSection/StatsSection'
import ServiceCardContainer from '@/components/pageWise/HomePage/components/ServiceCardContainer/ServiceCardContainer'
import PdfProcessSection from '@/components/pageWise/HomePage/components/PdfProcessSection/PdfProcessSection'
import FeaturesSection from '@/components/pageWise/HomePage/components/FeaturesSection/FeaturesSection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className='w-full mt-[10vh] bg-white flex flex-col items-center justify-start'>
        <HeroSection />
        <ServiceCardContainer />
        <StatsSection />
        <PdfProcessSection />
        <FeaturesSection />
      </main>
    </>
  )
}
