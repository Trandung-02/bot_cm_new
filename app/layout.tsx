import { ColorModeScript, theme } from '@chakra-ui/react'
import type { Metadata, Viewport } from 'next'
import ReduxProvider from './store/provider'
import LocationBootstrap from './store/LocationBootstrap'
import { Provider } from './provider'
import { optimisticFont } from '@/app/fonts';
import TitleSync from '@/components/seo/TitleSync'
import "react-phone-input-2/lib/style.css";
import "@/public/styles/checkbox.scss"
import "@/public/styles/custom.css"
import "./globals.css"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  manifest: '/static/favicons/manifest.json',
  icons: {
    icon: [
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/static/favicons/apple-touch-icon.png', sizes: '76x76', type: 'image/png' }],
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode} ${optimisticFont.variable}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>
          <ReduxProvider>
            <LocationBootstrap />
            <TitleSync />
            {props.children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  )
}
