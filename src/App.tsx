import { useEffect } from 'react'
import Header from './components/Header'
import Countdown from './components/Countdown'
import Espana from './components/Espana'
import Paris from './components/Paris'
import Italia from './components/Italia'
import Weather from './components/Weather'

function App() {
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-sans min-h-screen p-4 md:p-8 pb-8 md:pb-12 flex flex-col items-center justify-center">
      <Header />

      <main className="w-full max-w-6xl bento-grid mt-8 md:mt-10">
        <Countdown />
        <Espana />
        <Paris />
        <Italia />
        <Weather />
      </main>
    </div>
  )
}

export default App
