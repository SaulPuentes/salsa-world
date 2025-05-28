import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, bgImage, richText, title, theme }) => {
  const logoImg = theme === 'dark' ? '/img/isotype.svg': '/img/isotype-variant.svg'
  return (
    <div className="">
      <div className="container mb-8 text-center">
        <Image
          src={logoImg}
          alt="Logo"
          width={74}
          height={97}
          className="h-auto mx-auto"
        />
        {title && (
          <h1 className="text-3xl md:text-5xl mb-3 text-white leading-[1.3em]">
            {title}
          </h1>
        )}
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {bgImage && typeof bgImage === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={bgImage}
            />
            {bgImage?.caption && (
              <div className="mt-3">
                <RichText data={bgImage.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
