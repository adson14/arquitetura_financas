import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import theme from '../utils/theme'
import { useEffect } from 'react'
import { getAccessTokenFromCookie } from '../utils/cookies'
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router'
import AuthPage from './auth'

function MyApp({ Component, pageProps }: AppProps) {


  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  })
  
  return (
    <AuthProvider>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AuthPage/>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>

  )
}


export default MyApp
