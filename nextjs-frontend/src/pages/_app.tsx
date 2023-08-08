import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import theme from '../utils/theme'
import { useEffect } from 'react'
import {
  SSRKeycloakProvider,
  SSRCookies,
  getKeycloakInstance,
} from "@react-keycloak/ssr";
import { KEYCLOAK_PUBLIC_CONFIG } from '../utils/auth'
import { parseCookies } from '../utils/cookies'

function MyApp({ Component, pageProps, cookies }: AppProps & {cookies: any}) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  })
  
  return (
    <SSRKeycloakProvider persistor={SSRCookies(cookies)} keycloakConfig={KEYCLOAK_PUBLIC_CONFIG as any}>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRKeycloakProvider>
   
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookie: parseCookies(appContext.ctx.req)
  }
}

export default MyApp
