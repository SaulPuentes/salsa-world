'use client'

import React from 'react'
import { cn } from '@/utilities/cn'

interface HamburgerTriggerProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export const HamburgerTrigger: React.FC<HamburgerTriggerProps> = ({ isOpen, onClick, className }) => {
  return (
    <button
      aria-label="Toggle menu"
      onClick={onClick}
      className={cn('flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-50 relative', className)}
    >
      <span
        className={cn(
          'w-6 h-[2px] bg-white transition-all duration-300 origin-center',
          isOpen ? 'rotate-45 translate-y-[7px]' : ''
        )}
      />
      <span
        className={cn(
          'w-6 h-[2px] bg-white transition-all duration-300',
          isOpen ? 'opacity-0' : ''
        )}
      />
      <span
        className={cn(
          'w-6 h-[2px] bg-white transition-all duration-300 origin-center',
          isOpen ? '-rotate-45 -translate-y-[7px]' : ''
        )}
      />
    </button>
  )
}