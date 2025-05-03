'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'

const locales = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
]


export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [open, setOpen] = useState(false)

  const current = locales.find((l) => l.code === currentLocale) ?? locales[0]

  const switchLanguage = (nextLocale: string) => {
    const segments = pathname.split('/')
    if (locales.some(l => l.code === segments[1])) {
      segments[1] = nextLocale
    } else {
      segments.splice(1, 0, nextLocale)
    }

    const newPath = segments.join('/')
    router.push(newPath)
    setOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <Button
        variant='link'
        onClick={() => setOpen(!open)}
        className="gap-2 items-center hover:no-underline font-mulish normal-case"
      >
        <span>{current.label}</span>
        <ChevronDown size={16} />
      </Button>

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-28 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-purple">
          {/* Triangle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple rotate-45"></div>

          <ul className="py-1">
            {locales
              .filter((locale) => locale.code !== current.code)
              .map((locale) => (
                <li key={locale.code}>
                  <Button
                    variant='link'
                    onClick={() => switchLanguage(locale.code)}
                    className="px-4 py-2 w-full justify-center font-mulish hover:no-underline normal-case hover:bg-violet/20 transition-colors"
                  >
                    <span>{locale.label}</span>
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}