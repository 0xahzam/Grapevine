import "../styles/globals.css";
import Topbar from "./Topbar";
// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { ContextWrapper } from "../context/context";

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <ChakraProvider>
        {/* <Topbar/> */}
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextWrapper>
  );
}

export default MyApp;
