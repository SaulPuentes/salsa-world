'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { cn } from '@/utilities/cn'

export const EventFiltersBar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false)

  return (
    <div className="bg-[#6D6CFF] text-white rounded-full px-4 py-2 flex items-center gap-4 w-full max-w-7xl mx-auto shadow-md overflow-hidden">
      <div className="flex flex-col text-sm font-medium pr-4 border-r border-white">
        <span>Ubicación</span>
        <span className="text-white/80 text-sm font-normal">Buscar ubicación</span>
      </div>

      <div className="flex flex-col text-sm font-medium px-4 border-r border-white">
        <span>Fecha</span>
        <span className="text-white/80 text-sm font-normal">Introduce las fechas</span>
      </div>

      <div className="flex items-center gap-2 px-4 border-r border-white">
        <div className="flex flex-col text-sm font-medium">
          <span>Fecha</span>
          <span className="text-white/80 text-sm font-normal">Introduce las fechas</span>
        </div>
        <span className="text-white text-lg">{'>'}</span>
      </div>

      <div className="relative flex items-center px-4 flex-1 justify-end">
        <button
          className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-orange-500 hover:bg-orange-100 transition"
          onClick={() => setShowSearchInput(!showSearchInput)}
        >
          <FaSearch />
        </button>

        <input
          type="text"
          placeholder="Buscar..."
          className={cn(
            "absolute right-12 bg-white text-black rounded-full px-4 py-2 text-sm shadow transition-all duration-300",
            showSearchInput ? "opacity-100 w-48 ml-2" : "opacity-0 w-0 overflow-hidden"
          )}
        />
      </div>
    </div>
  )
}
