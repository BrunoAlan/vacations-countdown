function Italia() {
  return (
    <div className="bento-item col-span-4 md:col-span-2 row-span-1 relative overflow-hidden group p-0 border-none">
      <div className="absolute inset-0">
        <img
          alt="Ferrari in Italy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOaXtvL-WU_TaE7Q635C-jj8EpSX_QNgOtdYDs1shvJoqVvc4FyTBNdgpceO-Wssx0UuIcwBGqAM5uJvtRt_0EZp_9hmKqtcSjbiXQpJrVTeAemIHvn1ohHO8eJm0JRwaA5i7RTiRhqjNdmgfn_XehtjAmd9-y8LkQsIRwqhRE64pZ3NVbt2Pc7T7tIk-856esZIdZS57g3r4vsyp6zxQ8a631VH9uuQcVeo6EDMJMUpPEipCFyGfnue9W7cHCjJn3VtZcg_xn1dY"
        />
        <div className="absolute inset-0 bg-linear-to-r from-red-600/90 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-between py-6 px-6 md:px-6 text-white">
        <div className="flex justify-between items-start">
          <span className="inline-flex  items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/30 text-white w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="ml-1">ITALY</span>
          </span>
          <span className="material-symbols-outlined text-white/80">sports_score</span>
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold italic tracking-wide">Maranello Experience</h2>
          <p className="text-red-100 text-sm mt-1 flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-sm">speed</span>
            Factory Tour & Track Day
          </p>
        </div>
      </div>
    </div>
  )
}

export default Italia
