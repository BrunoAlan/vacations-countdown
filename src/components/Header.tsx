function Header() {
  return (
    <header className="w-full max-w-6xl mb-12 md:mb-16 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-sky-500 text-4xl">flight_takeoff</span>
        <div>
          <h1 className="text-2xl font-display font-bold tracking-wide dark:text-white leading-tight">
            EuroTrip <span className="text-sky-500">2026</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">ES • FR • IT</p>
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">
        Alancito ❤️ Belencita
      </div>
    </header>
  )
}

export default Header
