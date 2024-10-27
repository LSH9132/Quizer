// import '../../styles/globals.css'
// import type { AppProps } from 'next/app'
//
// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
//
// export default MyApp

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import '../../styles/globals.css'
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Nav/>
      <Component {...pageProps} />
      <Footer/>
    </ChakraProvider>
  )
}

export default MyApp