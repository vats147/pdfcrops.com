import BaseOneLayout from '../layouts/BaseOneLayout/BaseOneLayout'
import '@/styles/globals.css'
import Head from 'next/head';
import 'react-alice-carousel/lib/alice-carousel.css';

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Script from 'next/script';



import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (

        <BaseOneLayout>
    <Head>
  
 

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5174630229786506" crossorigin="anonymous"></script>
      </Head>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-BRL79MR0BB"/>
    <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-BRL79MR0BB');
        `}
      </Script> 
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer
            position="bottom-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BaseOneLayout>
  )
}
