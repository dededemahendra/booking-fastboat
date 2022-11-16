import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {HelmetProvider} from 'react-helmet-async'
import { mode } from "@chakra-ui/theme-tools"

const chakraThemeConfig= extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: props=> ({
      "html, body": {
        background: mode("white", "#021528")(props)
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={chakraThemeConfig}>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </ChakraProvider>
)
