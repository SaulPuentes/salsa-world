'use client'
import React, { Fragment } from 'react'

import Image from 'next/image'
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
  return (
    <div
      className="relative flex items-center justify-center text-white overflow-x-hidden"
    >
      <div className="container my-20 md:mb-8 z-10 relative flex items-center">
        <div className="w-full max-w-[45rem] text-highlight-warm">
          <h1 className="text-3xl md:text-5xl mb-6 md:leading-[1.2em]">
            {title}
          </h1>
          {richText && <RichText className="mb-6 max-w-[35rem] mx-0" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4 flex-col md:flex-row">
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
          <Fragment>
            <div className="absolute top-0 left-0 w-full h-full md:hidden">
            <Image
              src='/img/overlay-mobile.svg'
              alt="Overlay mobile"
              fill
              className="object-cover object-center"
              priority
            />
            </div>
            <div className="absolute top-0 left-0 min-w-[120%] lg:min-w-[80%] xl:min-w-[75%] h-full hidden md:block">
              <Image
                src='/img/overlay.svg'
                alt="Overlay desktop"
                fill
                className="object-cover object-right"
                priority
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
