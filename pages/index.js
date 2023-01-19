import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeroSection from '@/components/pageWise/HomePage/components/HeroSection/HeroSection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className='w-full h-screen bg-white flex flex-col items-center justify-start'>
        {/* <HeroSection /> */}
      </main>
    </>
  )
}
