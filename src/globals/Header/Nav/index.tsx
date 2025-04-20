'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SocialLinks } from '@/components/SocialLinks'

export const HeaderNav: React.FC<{data: HeaderType}> = ({ data }) => {
  const navItems = data?.navItems || []
  const socialLinks = data?.socialLinks || []
  const privateArea = data?.privateArea || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      {privateArea?.link && (
        <CMSLink
          className='text-white'
          {...privateArea.link}
          appearance="outline"
          size="sm"
          newTab={false}
        />
      )}
      <SocialLinks links={socialLinks} color="text-white" />
    </nav>
  )
}
