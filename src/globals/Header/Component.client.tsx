'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileMenu } from './MobileMenu'
import { Logo } from '@/components/Logo/Logo'
import { HamburgerTrigger } from '@/components/HamburgerTrigger'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className="relative z-20 bg-purple text-white" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center container">
        <Link href="/" className="relative z-40">
          <Logo loading="eager" priority="high" />
        </Link>

        <div className="md:hidden">
          <HamburgerTrigger isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>
      </div>
      {menuOpen && <MobileMenu data={data} />}
    </header>
  )
}
