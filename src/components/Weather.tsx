import { useState, useEffect, useRef } from 'react'

// TypeScript interfaces for Open-Meteo API
interface OpenMeteoResponse {
  current: {
    time: string
    temperature_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

interface WeatherData {
  city: string
  country: string
  temperature: number
  weatherCode: number
  windSpeed: number
  maxTemp: number
  minTemp: number
}

interface CityConfig {
  name: string
  country: string
  latitude: number
  longitude: number
}

// City configurations
const CITIES: CityConfig[] = [
  { name: 'Madrid', country: 'ES', latitude: 40.4168, longitude: -3.7038 },
  { name: 'Barcelona', country: 'ES', latitude: 41.3851, longitude: 2.1734 },
  { name: 'Paris', country: 'FR', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Roma', country: 'IT', latitude: 41.9028, longitude: 12.4964 },
  { name: 'Modena', country: 'IT', latitude: 44.6471, longitude: 10.9252 },
]

// Helper function to map weather codes to icons and descriptions
function getWeatherInfo(weatherCode: number): { icon: string; description: string; gradient: string } {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1-3: Mainly clear, partly cloudy, overcast
  // 45-48: Fog
  // 51-67: Drizzle and rain
  // 71-77: Snow
  // 80-82: Rain showers
  // 85-86: Snow showers
  // 95: Thunderstorm
  // 96-99: Thunderstorm with hail

  if (weatherCode === 0) {
    return {
      icon: 'sunny',
      description: 'Despejado',
      gradient: 'from-yellow-400 to-orange-500',
    }
  } else if (weatherCode >= 1 && weatherCode <= 3) {
    return {
      icon: 'partly_cloudy_day',
      description: weatherCode === 1 ? 'Mayormente despejado' : weatherCode === 2 ? 'Parcialmente nublado' : 'Nublado',
      gradient: 'from-blue-400 to-indigo-500',
    }
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    return {
      icon: 'foggy',
      description: 'Niebla',
      gradient: 'from-gray-400 to-gray-600',
    }
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    return {
      icon: 'rainy',
      description: 'Lluvia',
      gradient: 'from-blue-500 to-blue-700',
    }
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    return {
      icon: 'ac_unit',
      description: 'Nieve',
      gradient: 'from-cyan-300 to-blue-400',
    }
  } else if (weatherCode >= 80 && weatherCode <= 82) {
    return {
      icon: 'grain',
      description: 'Chubascos',
      gradient: 'from-indigo-500 to-purple-600',
    }
  } else if (weatherCode >= 85 && weatherCode <= 86) {
    return {
      icon: 'ac_unit',
      description: 'Chubascos de nieve',
      gradient: 'from-cyan-200 to-blue-300',
    }
  } else if (weatherCode === 95) {
    return {
      icon: 'thunderstorm',
      description: 'Tormenta',
      gradient: 'from-purple-600 to-indigo-700',
    }
  } else if (weatherCode >= 96 && weatherCode <= 99) {
    return {
      icon: 'thunderstorm',
      description: 'Tormenta con granizo',
      gradient: 'from-purple-700 to-indigo-800',
    }
  } else {
    return {
      icon: 'partly_cloudy_day',
      description: 'Desconocido',
      gradient: 'from-indigo-500 to-purple-600',
    }
  }
}

// Fetch weather data for a single city
async function fetchWeatherForCity(cityConfig: CityConfig): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: OpenMeteoResponse = await response.json()
    
    return {
      city: cityConfig.name,
      country: cityConfig.country,
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      maxTemp: Math.round(data.daily.temperature_2m_max[0]),
      minTemp: Math.round(data.daily.temperature_2m_min[0]),
    }
  } catch (error) {
    console.error(`Error fetching weather for ${cityConfig.name}:`, error)
    return null
  }
}

function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadWeatherData() {
      setLoading(true)
      setError(null)
      
      try {
        // Fetch all cities in parallel
        const results = await Promise.all(CITIES.map(city => fetchWeatherForCity(city)))
        
        // Filter out null results (failed requests)
        const validResults = results.filter((data): data is WeatherData => data !== null)
        
        if (validResults.length === 0) {
          setError('No se pudieron cargar los datos del clima')
        } else {
          setWeatherData(validResults)
        }
      } catch (err) {
        setError('Error al cargar los datos del clima')
        console.error('Error loading weather data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()
  }, [])

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.clientWidth
      const newIndex = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(newIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [weatherData])

  // Scroll to specific card
  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.clientWidth
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return (
      <div className="bento-item col-span-2 md:col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none flex flex-col justify-center items-center">
        <span className="material-symbols-outlined animate-spin text-4xl mb-2">sync</span>
        <p className="text-sm opacity-80">Cargando clima...</p>
      </div>
    )
  }

  if (error || weatherData.length === 0) {
    return (
      <div className="bento-item col-span-2 md:col-span-1 bg-gradient-to-br from-red-500 to-red-600 text-white border-none flex flex-col justify-center items-center">
        <span className="material-symbols-outlined text-4xl mb-2">error</span>
        <p className="text-sm opacity-90 text-center px-4">{error || 'No hay datos disponibles'}</p>
      </div>
    )
  }

  return (
    <div className="bento-item col-span-2 md:col-span-1 p-0 border-none overflow-hidden flex flex-col h-full relative" style={{ padding: 0 }}>
      {/* Carousel container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth w-full h-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {weatherData.map((data) => {
          const weatherInfo = getWeatherInfo(data.weatherCode)
          return (
            <div
              key={`${data.city}-${data.country}`}
              className={`min-w-full h-full flex-shrink-0 snap-start bg-gradient-to-br ${weatherInfo.gradient} text-white flex flex-col justify-between relative`}
              style={{ padding: '1.5rem 1.5rem 4rem 1.5rem' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium opacity-80 uppercase tracking-wide">
                  {data.city}, {data.country}
                </span>
                <span className="material-symbols-outlined opacity-90">{weatherInfo.icon}</span>
              </div>
              <div className="flex flex-col items-center justify-center grow">
                <div className="text-5xl font-display font-bold">{data.temperature}°</div>
                <div className="text-sm font-medium opacity-90 mt-1">{weatherInfo.description}</div>
              </div>
              <div className="flex justify-between text-xs opacity-75 w-full mt-2">
                <span>Máx: {data.maxTemp}°</span>
                <span>Mín: {data.minTemp}°</span>
              </div>
              
              {/* Navigation dots - positioned at the bottom of each card */}
              {weatherData.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-3 bg-black/20 backdrop-blur-sm">
                  {weatherData.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => scrollToIndex(dotIndex)}
                      className={`h-2 rounded-full transition-all ${
                        dotIndex === currentIndex
                          ? 'bg-white w-6 opacity-100'
                          : 'bg-white/50 w-2 opacity-50 hover:opacity-75'
                      }`}
                      aria-label={`Ir a ${weatherData[dotIndex].city}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Weather
