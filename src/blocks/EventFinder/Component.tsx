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
    <div className={`relative overflow-hidden py-16 ${className || ''}`}>
      {backgroundImage && (
        <Media
          resource={backgroundImage}
          fill
          imgClassName="object-cover object-center"
        />
      )}

      <div className="relative z-10 container mx-auto text-center text-white px-4">
        {showLogo && (
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo.png" // Adjust path if needed
              alt="Logo"
              width={160}
              height={60}
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
          <p className="mb-6 text-base md:text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Events Table */}
        <div className="mt-12">
          {/* TODO: Insert EventsTable component here */}
        </div>
        {link && (
          <div className="mt-4">
            <CMSLink {...link} appearance='pink' />
          </div>
        )}
      </div>
    </div>
  )
}
