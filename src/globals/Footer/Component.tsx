import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { SocialLinks } from '@/components/SocialLinks'
import Image from 'next/image'
import { isMedia } from '@/utilities/isMedia'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const shortcuts = footerData?.shortcuts || []
  const contact = footerData?.contact
  const featuredEventImage = footerData?.featuredEvent?.image

  return (
    <footer className="mt-auto bg-purple text-white flex-col text-md md:text-lg">
      <div className="container pt-20 pb-8 px-5 gap-8 md:flex flex-col md:flex-row md:justify-between">
        <Link className='hidden md:block' href="/">
          <Logo />
        </Link>

        <div className="flex flex-col items-start md:flex-row gap-10">
          <nav className="flex flex-col gap-4">
            <h1 className='text-2xl md:text-[28px]'>Accesos directos</h1>
            {shortcuts.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
          <div className="flex flex-col gap-4 max-w-[300px]">
            <h1 className='text-2xl md:text-[28px]'>Donde encontrarnos</h1>
              <p className="text-white">
                {contact?.address}
              </p>
              <p className="text-white">
                {contact?.email}
              </p>
              <p className="text-white">
                {contact?.phone}
              </p>
              <SocialLinks color='text-pink' />
          </div>
          <div className='flex flex-col gap-4 text-white max-w-[380px]'>
            <h1 className='text-2xl md:text-[28px]'>Evento destacado del mes</h1>
            {isMedia(featuredEventImage) && (
              <Image
                src={featuredEventImage?.url || ''}
                alt={featuredEventImage?.alt || ''}
                width={378}
                height={143}
                objectPosition='center'
                objectFit='cover'
              />
            )}
            <h3 className='text-lg'>
              Salsa Fest
            </h3>
            <p>
              Frase resumida del evento para enganchar que accedan a apuntarse
            </p>
          </div>
        </div>
      </div>
      <hr className="container block w-full border-t border-border border-white w-[90%] md:w-full" />
      <div className='container flex-col justify-center items-center pt-8 pb-10'>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap text-pink text-sm">
          <Link href="/aviso-legal" className="hover:underlin">Aviso Legal</Link>
          <Link href="/politica-privacidad" className="hover:underline">Política de Privacidad</Link>
          <Link href="/politica-cookies" className="hover:underline">Política de Cookies</Link>
        </div>
        <div className="mt-10 md:mt-4 text-white text-center font-lilita text-lg">
          © {new Date().getFullYear()} Salsa World. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}