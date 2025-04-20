'use client'

import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'


type Platform = 'facebook' | 'instagram' | 'tiktok'

export type SocialLink = {
  platform: Platform
  url: string
  id?: string | null
}

type Props = {
  links: SocialLink[]
  color?: string
  className?: string
}

const iconMap = {
  facebook: <FaFacebookF className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
}

export const SocialLinks: React.FC<Props> = ({ links, color = 'text-white' }) => {
  if (!links?.length) return null

  return (
    <div className="flex gap-4 items-center">
      {links.map(({ platform, url, id }) => (
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
