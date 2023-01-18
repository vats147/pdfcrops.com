import BaseOneLayout from '@/layouts/BaseOneLayout/BaseOneLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <BaseOneLayout>
      <Component {...pageProps} />
    </BaseOneLayout>
  )
}
