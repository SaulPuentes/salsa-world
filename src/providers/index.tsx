import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { NextIntlClientProvider } from 'next-intl'
import { EventsProvider } from './EventsProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <EventsProvider>{children}</EventsProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
