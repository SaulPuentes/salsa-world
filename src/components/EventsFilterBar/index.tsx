'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaSearch } from 'react-icons/fa'
import { cn } from 'src/utilities/cn'

const inputStyles = 'mt-0 py-0 bg-transparent border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-white placeholder:text-white/60'

export const EventsFilterBar = () => {
  const handleSubmit = () => {
    // TODO: Implement search logic
    console.log('Search triggered')
  }

  return (
    <div className="container bg-violet text-white rounded-lg px-4 py-2 flex items-center gap-4 mx-auto text-left">
      <div className="flex flex-col text-sm font-medium pr-4 border-r border-white flex-1">
        <span className='px-3 pt-1'>Ubicación</span>
        <Input
          placeholder="Buscar ubicación"
          className={inputStyles}
        />
      </div>

      <div className="flex flex-col text-sm font-medium px-4 border-r border-white flex-1">
        <span className='px-3 pt-1'>Fecha</span>
        <Input
          placeholder="Introduce las fechas"
          className={inputStyles}
        />
      </div>

      <div className="flex gap-2 px-4 border-r border-white flex-1">
        <div className="flex flex-col text-sm font-medium w-full">
          <span className='px-3 pt-1'>Fecha</span>
          <Input
            placeholder="Introduce las fechas"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="relative flex items-center px-4 justify-end">
        <Button
          size="icon"
          className='rounded-full text-orange'
          onClick={handleSubmit}
        >
          <FaSearch size={17} />
        </Button>
      </div>
    </div>
  )
}
