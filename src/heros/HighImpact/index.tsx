'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Media as MediaType, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  title,
  overlayImage
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const overlay = overlayImage as MediaType

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
     <div
        className="absolute top-0 left-0 h-full w-full -ml-[25%] bg-no-repeat bg-cover bg-right"
        style={{
          backgroundImage: overlay?.url ? `url(${overlay.url})` : undefined,
        }}
      />
      <div className="container mb-8 z-10 relative flex items-center">
        <div className="max-w-[36.5rem]">
          <h1 className="text-4xl md:text-5xl mb-6">
            {title}
          </h1>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
              return (
                <li key={i}>
                <CMSLink {...link} appearance={i % 2 === 0 ? 'violet' : 'orange'}/>
                </li>
              )
              })}
            </ul>
            )}
        </div>
      </div>
      <div className="min-h-[85vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
