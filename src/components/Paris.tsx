function Paris() {
  return (
    <div className="bento-item col-span-4 md:col-span-2 row-span-1 relative overflow-hidden group p-0 border-none">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            alt="Paris Eiffel Tower"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYw78TWDOFMmQdnrw2oiLDM5Ekyx94K7J3HBWsX5Pck5FylYOJ6qY25T5hrFKYVPSaKFD_RKixm7KPPSU9HzXZDEqPzxeDnkr2IE376-xeQCSEDW26FFjTaRxJ5-Yaz6aPpms9WgNXgfizQHku8IIV02p4oebM0rofR13ff0p0SdRib4-ak5yhBqWQxyDVSDYuHzD45rEWW5cMnVV2uQjEX3d7iwbTshpyjeabLdtaKBYll-jG50JGcnCZg6IwpYQxA7CbfmSBXTc"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        </div>
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            alt="Louvre Museum"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://somosparis.com/wp-content/uploads/2024/09/Piramide-del-Museo-del-Louvre-1024x683.jpg"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="relative z-10 h-full flex flex-col justify-between py-6 px-6 md:px-6 text-white">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/30 text-white w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="ml-1">FRANCE</span>
          </span>
          <span className="material-symbols-outlined text-white/80"></span>
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold italic tracking-wide">Paris</h2>
          <p className="text-blue-100 text-sm mt-1 flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-sm">travel</span>
            Tour Eiffel • Louvre
          </p>
        </div>
      </div>
    </div>
  )
}

export default Paris
