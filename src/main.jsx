import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {HelmetProvider} from 'react-helmet-async'
import { mode } from "@chakra-ui/theme-tools"
import { Provider as SupabaseProvider } from 'react-supabase'
import { createClient } from '@supabase/supabase-js'

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

const supabaseClient= createClient("https://vwgvjupdwlzhodrsdhdn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Z3ZqdXBkd2x6aG9kcnNkaGRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDMzODM0OSwiZXhwIjoxOTg1OTE0MzQ5fQ.3PL2VwKV7iZ2dyZrJyhZbnOUfoQoyGOlYIza6q3OJpI")

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={chakraThemeConfig}>
    <HelmetProvider>
      <SupabaseProvider value={supabaseClient}>
        <RouterProvider router={router} />
      </SupabaseProvider>
    </HelmetProvider>
  </ChakraProvider>
)
