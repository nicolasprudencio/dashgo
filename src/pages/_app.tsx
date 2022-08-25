import { AppProps } from 'next/app'
import { ChakraProvider }  from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SideBarDrawerProvider } from '../components/contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage'
import { QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient'

if(process.env.NODE_ENV === 'development') {
  // iniciando a fake API junto com o app
  makeServer()
}



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>  
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>  
    )
}

export default MyApp
