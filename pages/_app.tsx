import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-wrap-balancer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
