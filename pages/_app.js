import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import Router from 'next/router'

import ProgressBar from "@badrap/bar-of-progress" // For Loading in each route

// For Loading in each route
const progress = new ProgressBar({
  size:4,
  color: '#FE595E',
  className:"z-50",
  delay: 100,
})

// For Loading in each route
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// Style URL mapbox://styles/vinxe08/ckvz4cuxp79rd14m6ibr493q7

// Access token: pk.eyJ1IjoidmlueGUwOCIsImEiOiJja3Z6MGd4a3Q1MHBzMm9tdGo1anB3cDM5In0.C91t9z4wrgDvHbALjZl2Mg
