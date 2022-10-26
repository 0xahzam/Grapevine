import '../styles/globals.css'
import Topbar from './Topbar'
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Topbar/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp