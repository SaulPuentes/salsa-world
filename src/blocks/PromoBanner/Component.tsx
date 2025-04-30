import type { PromoBannerBlock as PromoBannerBlockProps } from 'src/payload-types'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { isMedia } from '@/utilities/isMedia'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { DiamondLine } from '@/components/ui/diamond-line'

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
      <div className="container my-20 z-10 relative flex flex-col md:flex-row md:justify-between w-full items-center">
        {/* First Column */}
        <div className="w-full md:w-[45%] flex flex-col justify-center pr-8">
          {title && (
            <RichText
              data={title}
              enableGutter={false}
              enableProse={false}
              className='text-3xl md:text-5xl leading-[1.3em] text-highlight-warm'
            />
          )}
          <h2 className="text-3xl md:text-5xl mb-3 text-pink leading-[1.3em]">
          Salsa World
          </h2>
          <DiamondLine count={5} color='text-orange mb-10 md:mb-0'/>
        </div>

        {/* Second Column */}
        <div
          className="w-full h-fit md:w-[55%] max-w-[557px] flex flex-col justify-center bg-violet py-12 px-14 rounded"
        >
          {description && (
            <p className="text-lg text-highlight-warm text-center">{description}</p>
          )}
          <DiamondLine count={5} size={'w-2 h-2'} className='mx-auto my-6' />
          <div className="flex flex-wrap gap-4 mx-auto">
            <CMSLink {...link} appearance={'pink'} className='text-xl px-10 h-12'/>
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
          className="object-cover object-center"
          priority
        />
        </div>
        <div className="absolute top-0 left-0 w-full h-full hidden md:block">
          <Image
            src={overlayDesktopUrl}
            alt="Overlay desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  )
}