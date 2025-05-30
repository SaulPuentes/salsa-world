'use client'

import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTiktok
} from 'react-icons/tb'
import { FaRegEnvelope } from 'react-icons/fa6'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'email'

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
  email: <FaRegEnvelope className="w-6 h-6" />,
}

export const defaultSocialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/salsaworldmx' },
  { platform: 'facebook', url: 'https://www.facebook.com/salsaworldmx' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@salsaworldmx' },
]

export const SocialLinks: React.FC<Props> = ({ links, color = 'text-white', className }) => {
  const socialLinksToUse = links?.length ? links : defaultSocialLinks

  return (
    <div className={cn("flex gap-4 items-center", className)}>
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
