import type { PromoBannerBlock as PromoBannerBlockProps } from 'src/payload-types'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { isMedia } from '@/utilities/isMedia'
import { Media } from '@/components/Media'
import Image from 'next/image'

type Props = {
  className?: string
} & PromoBannerBlockProps

export const PromoBannerBlock: React.FC<Props> = ({
  className,
  title,
  media,
  description,
  link,
}) => {
  // 👉 Define overlay URLs inside the component
  const overlayMobileUrl = '/img/overlay-mobile.svg'
  const overlayDesktopUrl = '/img/overlay.svg'

  return (
    <div
      className={cn(
        'relative flex items-center justify-center text-white overflow-x-hidden',
        className,
      )}
      data-theme="dark"
    >
      <div className="container my-20 md:mb-8 z-10 relative flex flex-col md:flex-row w-full items-stretch">
        {/* First Column */}
        <div className="w-full md:w-[45%] flex flex-col justify-center pr-8">
          {title && (
            <RichText data={title} enableGutter={false} enableProse={false} className='text-3xl'/>
          )}
          <h2 className="text-3xl mb-6 text-pink">
          Salsa World
          </h2>
        </div>

        {/* Second Column */}
        <div className="w-full md:w-[55%] flex flex-col justify-center bg-violet-600 p-8 rounded">
          {description && (
            <p className="text-base mb-6 text-white">{description}</p>
          )}
            <div className="flex flex-wrap gap-4">
              <CMSLink {...link} />
            </div>
        </div>
      </div>

      {/* Background Images */}
      <div className="absolute inset-0 -z-10">
        {isMedia(media) && (
          <Media
            fill
            imgClassName="object-cover"
            priority
            resource={media}
          />
        )}
        {/* Overlay Images */}
        <div className="absolute top-0 left-0 w-full h-full md:hidden">
        <Image
          src={overlayMobileUrl}
          alt="Overlay mobile"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        </div>
        <div className="absolute top-0 left-0 w-full h-full hidden md:block">
          <Image
            src={overlayDesktopUrl}
            alt="Overlay desktop"
            fill
            className="object-cover object-center opacity-50"
            priority
          />
        </div>
      </div>
    </div>
  )
}