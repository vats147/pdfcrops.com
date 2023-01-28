import BaseOneLayout from '../layouts/BaseOneLayout/BaseOneLayout'
import '@/styles/globals.css'

import 'react-alice-carousel/lib/alice-carousel.css';

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



export default function App({ Component, pageProps }) {
  return (

        <BaseOneLayout>
    <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5174630229786506" crossorigin="anonymous"></script>
      </Head>
          <Component {...pageProps} />
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
