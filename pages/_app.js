import BaseOneLayout from '@/layouts/BaseOneLayout/BaseOneLayout'
import '@/styles/globals.css'
import 'react-alice-carousel/lib/alice-carousel.css';

export default function App({ Component, pageProps }) {
  return (
    <BaseOneLayout>
      <Component {...pageProps} />
    </BaseOneLayout>
  )
}
