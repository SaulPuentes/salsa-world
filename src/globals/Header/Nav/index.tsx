'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SocialLinks } from '@/components/SocialLinks'
import { cn } from '@/utilities/cn'

export const underlineAnimation = "no-underline hover:no-underline after:content-[''] after:absolute after:bottom-[-3px] after:right-0 after:w-0 after:h-[1.5px] after:bg-pink after:transition-all after:duration-300 hover:after:w-full hover:after:right-auto"

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
          appearance="link"
          className={cn("relative text-white", underlineAnimation)}
        />
      ))}

      {privateArea?.link && (
        <CMSLink
          {...privateArea?.link}
          appearance="outline"
          size="sm"
          newTab={false}
          className="text-white mx-4 px-5 py-1 border border-pink hover:bg-pink hover:text-white transition-all duration-300 ease-in-out rounded"
        />
      )}

      <SocialLinks
        links={socialLinks}
        color="text-white"
        className="gap-6 transition-opacity duration-300 hover:opacity-80"
      />
    </nav>
  )
}
