'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaSearch } from 'react-icons/fa'

const inputStyles = 'mt-0 md:py-0 bg-transparent border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-white placeholder:text-white/60'
const containerStyles = 'flex flex-col text-sm font-medium pr-4 mb-2 md:mb-0 w-full border-b md:border-b-0 md:border-r border-white flex-1'

export const EventsFilterBar = () => {
  const handleSubmit = () => {
    // TODO: Implement search logic
    console.log('Search triggered')
  }

  return (
    <div className="container bg-violet text-white rounded-lg px-5 md:px-4 py-7 md:py-2 flex flex-col md:flex-row items-center gap-4 mx-auto text-left">
      <div className={containerStyles}>
        <span className='px-3 pt-2 md:pt-1'>Ubicación</span>
        <Input
          placeholder="Buscar ubicación"
          className={inputStyles}
        />
      </div>

      <div className={containerStyles}>
        <span className='px-3 pt-1'>Fecha</span>
        <Input
          placeholder="Introduce las fechas"
          className={inputStyles}
        />
      </div>

      <div className={containerStyles}>
        <span className='px-3 pt-1'>Fecha</span>
        <Input
          placeholder="Introduce las fechas"
          className={inputStyles}
        />
      </div>

      <div className="relative flex items-center px-4 justify-end">
        <Button
          size="icon"
          className='hidden md:flex rounded-full text-orange bg-white'
          onClick={handleSubmit}
        >
          <FaSearch size={17} />
        </Button>
        <Button
          className="flex md:hidden text-xl px-10 py-5"
          variant="orange"
          onClick={handleSubmit}
        >
          Aceptar búsqueda
        </Button>
      </div>
    </div>
  )
}
