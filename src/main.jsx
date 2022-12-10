import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {HelmetProvider} from 'react-helmet-async'
import { mode } from "@chakra-ui/theme-tools"
import { Provider as SupabaseProvider } from 'react-supabase'
import { customCupabaseClient } from './utils/supabaseClient'
import "@fontsource/roboto"

const breakpoints = {
  sm: '30em',
  md: '1140px',
  lg: '1140px',
  xl: '80em',
  '2xl': '96em',
}

const chakraThemeConfig= extendTheme({
  breakpoints,
  fonts: {
    body: "Roboto",
    heading: "Roboto",
  },
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: props=> ({
      "html, body": {
        background: mode("white", "#021528")(props),
        transitionProperty: "all",
        transitionDuration: "normal"
      }
    })
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={chakraThemeConfig}>
    <HelmetProvider>
      <SupabaseProvider value={customCupabaseClient}>
        <RouterProvider router={router} />
      </SupabaseProvider>
    </HelmetProvider>
  </ChakraProvider>
)
