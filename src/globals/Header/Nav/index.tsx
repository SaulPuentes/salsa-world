'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SocialLinks } from '@/components/SocialLinks'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{data: HeaderType}> = ({ data }) => {
  const navItems = data?.navItems || []
  const socialLinks = data?.socialLinks || []
  const privateArea = data?.privateArea

  return (
    <nav className="flex gap-6 items-center uppercase text-sm transition-all duration-300 ease-in-out">
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          animated
          appearance="link"
          className="relative text-white font-mulish font-semibold"
        />
      ))}
      {privateArea?.link && (
        <CMSLink
          {...privateArea?.link}
          appearance="outline"
          size="sm"
          newTab={false}
          className="mx-4 px-5 py-1"
        />
      )}
      <SocialLinks
        links={socialLinks}
        color="text-white"
        className="gap-6 transition-opacity duration-300 hover:opacity-80"
      />
      <LanguageSwitcher />
    </nav>
  )
}
