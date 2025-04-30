'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { EventsFinderBlock as EventsFinderBlockProps } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
} & EventsFinderBlockProps

export const EventsFinderBlock: React.FC<Props> = ({
  className,
  title,
  description,
  link,
  backgroundImage,
  showLogo,
}) => {
  return (
    <div className={`relative overflow-hidden pt-12 pb-16 ${className || ''} bg-white`}>
      {backgroundImage && (
        <Media
          resource={backgroundImage}
          fill
          imgClassName="object-cover object-center"
        />
      )}

      <div className="relative z-10 container mx-auto text-center px-4 text-black">
        {showLogo && (
          <div className="mb-6 flex justify-center">
            <Image
              src="/img/isotype.svg"
              alt="Logo"
              width={74}
              height={97}
              className="h-auto"
            />
          </div>
        )}

        {title && (
          <div className="mb-4">
            <RichText
              data={title}
              enableGutter={false}
              enableProse={false}
              className="text-2xl md:text-4xl font-bold"
            />
          </div>
        )}

        {description && (
          <p className="mb-6 text-base md:text-lg max-w-xl mx-auto">
            {description}
          </p>
        )}

        {/* Events Table */}
        <div className="mt-12">
          {/* TODO: Insert EventsTable component here */}
        </div>
        {link && (
          <div className="mt-4">
            <CMSLink {...link} appearance='pink' className='text-xl px-8' />
          </div>
        )}
      </div>
    </div>
  )
}
