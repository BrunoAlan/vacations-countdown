function Countdown() {
  return (
    <div className="bento-item col-span-4 md:col-span-2 row-span-1 flex flex-row items-center justify-between relative overflow-hidden bg-white dark:bg-gray-800 border-4 border-gray-800 dark:border-gray-300 px-6 md:px-8 py-6">
      <div className="absolute top-0 left-0 w-full flex justify-center gap-8 -mt-3 opacity-20">
        <div className="w-4 h-8 rounded-full border-2 border-gray-400 bg-transparent"></div>
        <div className="w-4 h-8 rounded-full border-2 border-gray-400 bg-transparent"></div>
        <div className="w-4 h-8 rounded-full border-2 border-gray-400 bg-transparent"></div>
      </div>
      <div className="z-10 flex flex-col justify-center">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
          Dias hasta el viaje
        </p>
        <div className="flex items-baseline gap-2">
           {/*Calular dias hasta el 12 de marzo de 2026 sin que diga dias */}
          <span className="text-7xl font-display font-bold text-gray-800 dark:text-white tracking-tighter">{
            Math.floor((new Date('2026-03-12').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          } </span>
          <span className="text-2xl font-bold text-sky-500">Días</span>
        </div>
      </div>
      <div className="z-10 h-full flex flex-col items-end justify-center text-right">
        <div className="bg-blue-50 dark:bg-gray-700 rounded-2xl p-4">
          <p className="text-gray-600 dark:text-gray-300 font-medium text-sm mb-1">Itinerario</p>
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Confirmado</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">Flight AR1134 • EZEIZA/MADRID</p>
      </div>
    </div>
  )
}

export default Countdown
