import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { SocialLinks } from '@/components/SocialLinks'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const shortcuts = footerData?.shortcuts || []
  const contact = footerData?.contact

  return (
    <footer className="mt-auto bg-purple text-white flex-col">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-10">
          <nav className="flex flex-col gap-4">
            <h1 className='text-2xl uppercase'>Accesos directos</h1>
            {shortcuts.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
          <div className="flex flex-col gap-4 max-w-[270px]">
            <h1 className='text-2xl uppercase'>Donde encontrarnos</h1>
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
          <div className='flex flex-col gap-4 text-white'>
            <h1 className='text-2xl uppercase'>Evento destacado del mes</h1>
            <h3 className='text-lg'>
              Salsa Fest
            </h3>
            <p>
              Salsa World Festival 2024
            </p>
          </div>
        </div>
      </div>
      <hr className="container block w-full border-t border-border border-white" />
      <div className='container flex-col justify-center items-center pt-8 pb-10'>
        <div className="flex justify-center gap-6 flex-wrap text-pink">
          <Link href="/aviso-legal" className="hover:underlin">Aviso Legal</Link>
          <Link href="/politica-privacidad" className="hover:underline">Política de Privacidad</Link>
          <Link href="/politica-cookies" className="hover:underline">Política de Cookies</Link>
        </div>
        <div className="mt-4 text-white text-center font-lilita text-lg">
          © {new Date().getFullYear()} Salsa World. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}