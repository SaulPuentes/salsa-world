'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { isMedia } from '@/utilities/isMedia'

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

  return (
    <div
      className="relative flex items-center justify-center text-white overflow-x-hidden"
      data-theme="dark"
    >
      <div className="container my-20 md:mb-8 z-10 relative flex items-center">
        <div className="max-w-[45rem] text-highlight-warm">
          <h1 className="text-3xl md:text-5xl mb-6 md:leading-[1.2em]">
            {title}
          </h1>
          {richText && <RichText className="mb-6 max-w-[35rem] mx-0" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
              return (
                <li key={i}>
                <CMSLink {...link} appearance={i % 2 === 0 ? 'violet' : 'orange'} className='text-xl'/>
                </li>
              )
              })}
            </ul>
            )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {isMedia(media) && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {isMedia(overlayImage) && (
          <Media
            priority
            resource={overlayImage}
            imgClassName="absolute top-0 left-0 min-w-[130%] sm:min-w-[95%] lg:min-w-[75%] h-full object-cover object-right -z-5"
          />
        )}
      </div>
    </div>
  )
}
