'use client'

import Link from 'next/link'
import React from 'react'
import { TbBrandFacebook, TbBrandInstagram, TbBrandTiktok } from "react-icons/tb"


type Platform = 'facebook' | 'instagram' | 'tiktok'

export type SocialLink = {
  platform: Platform
  url: string
  id?: string | null
}

type Props = {
  links?: SocialLink[]
  color?: string
  className?: string
}

const iconMap = {
  facebook: <TbBrandFacebook className="w-6 h-6" />,
  instagram: <TbBrandInstagram className="w-6 h-6" />,
  tiktok: <TbBrandTiktok className="w-6 h-6" />,
}

const defaultSocialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/salsaworld' },
  { platform: 'facebook', url: 'https://www.facebook.com/salsaworld' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@salsaworld' },
]

export const SocialLinks: React.FC<Props> = ({ links , color = 'text-white' }) => {
  // if (!links?.length) return null

  const socialLinksToUse = links?.length ? links : defaultSocialLinks

  return (
    <div className="flex gap-4 items-center">
      {socialLinksToUse.map(({ platform, url, id }) => (
        <Link
          key={id ?? platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:opacity-80 transition-opacity ${color}`}
        >
          <span className="sr-only">{platform}</span>
          {iconMap[platform]}
        </Link>
      ))}
    </div>
  )
}
