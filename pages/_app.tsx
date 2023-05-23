import Meta from '@/components/Meta'
import AppProvider from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <AppProvider>
        <Toaster />
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
