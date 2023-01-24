import PdfCropStateProvider from '../context/pdfCrop/pdfCropState';
import BaseOneLayout from '@/layouts/BaseOneLayout/BaseOneLayout'
import '@/styles/globals.css'

import 'react-alice-carousel/lib/alice-carousel.css';

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'

export default function App({ Component, pageProps }) {
  return (
    <PdfCropStateProvider>
      <BaseOneLayout>
        <Component {...pageProps} />
      </BaseOneLayout>
    </PdfCropStateProvider>
  )
}
