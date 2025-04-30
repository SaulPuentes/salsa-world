'use client'

import React from 'react'
import clsx from 'clsx'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { SocialLinks } from '@/components/SocialLinks'
import { underlineAnimation } from '../Nav'
import { cn } from '@/utilities/cn'

interface MobileMenuProps {
  data: Header
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ data }) => {
  const navItems = data?.navItems || []
  const socialLinks = data?.socialLinks || []
  const privateArea = data?.privateArea || null

  return (
    <div className="fixed inset-0 z-30 bg-purple text-white flex flex-col justify-center items-center gap-6 p-6 overflow-y-auto">
      {navItems.map(({ link }, index) => (
        <div
          key={index}
          className={clsx(
            'opacity-0 transform transition-all duration-500 ease-out',
            'animate-slide-in',
            index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CMSLink {...link} appearance="link" className={cn("text-2xl font-mulish normal-case", underlineAnimation)} />
        </div>
      ))}

      {privateArea?.link && (
        <div
          className="opacity-0 transform transition-all duration-500 ease-out animate-fade-up"
          style={{ animationDelay: `${navItems.length * 100 + 200}ms` }}
        >
          <CMSLink
            {...privateArea.link}
            appearance="outline"
            className="mt-6"
            size="lg"
          />
        </div>
      )}

      <div
        className="opacity-0 transform transition-all duration-500 ease-out animate-fade-up"
        style={{ animationDelay: `${navItems.length * 100 + 300}ms` }}
      >
        <SocialLinks links={socialLinks} color="text-white" />
      </div>
    </div>
  )
}
