'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SocialLinks } from '@/components/SocialLinks'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const socialLinks = data?.socialLinks || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      {/*
        TODO: Private area button
       */}
      <SocialLinks links={socialLinks} color="text-white" />
    </nav>
  )
}
