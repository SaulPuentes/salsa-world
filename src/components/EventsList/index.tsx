'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa6'
import { useEvents } from '@/providers/EventsProvider'
import { isMedia } from '@/utilities/isMedia'
import { CheckIcon, CopyIcon, EyeIcon, MapPinIcon, Share2Icon } from 'lucide-react'

export function EventsList() {
  const { events } = useEvents()
  const [copiedEventId, setCopiedEventId] = useState<number | null>(null)

  const handleCopyLink = async (url: string, eventId: number) => {
    await navigator.clipboard.writeText(url)
    setCopiedEventId(eventId)
    setTimeout(() => setCopiedEventId(null), 2000)
  }

  const handleShare = async (eventId: number, title: string) => {
    const url = `${window.location.origin}/events/${eventId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `¡Mira este evento!`,
          text: title,
          url,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopiedEventId(eventId)
      setTimeout(() => setCopiedEventId(null), 2000)
    }
  }

  return (
    <ul className="space-y-4">
      {events?.map(event => {
        const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/events/${event.id}`

        return (
          <li
            key={event.id}
            className="flex flex-col md:flex-row items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Event Image */}
            {isMedia(event?.featuredImage) && (
              <div className="relative w-full md:w-[200px] h-[150px] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={event.featuredImage.url || '/placeholder.jpg'}
                  alt={event.featuredImage.alt || ''}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-white text-sm text-pink-600 rounded-full px-2 py-1 flex items-center gap-1 shadow">
                  <EyeIcon className="w-4 h-4" />
                  {event.viewCount}
                </span>
              </div>
            )}

            {/* Event Info */}
            <div className="flex-1 space-y-1">
              <div className="text-orange-500 text-sm font-medium">
                {event?.dates?.[0]?.startDate ?? 'Fecha no disponible'}
              </div>
              <h3 className="text-xl font-bold">{event.title}</h3>
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 text-violet-500" />
                {event.location.address}
              </div>
            </div>

            {/* Share Section */}
            <div className="flex flex-col items-center justify-center gap-2 ml-auto text-sm">
              {typeof navigator !== 'undefined' ? (
                <button
                  onClick={() => handleShare(event.id, event.title)}
                  className="flex items-center gap-2 px-3 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg"
                >
                  <Share2Icon className="w-4 h-4" />
                  Compartir
                </button>
              ) : (
                <>
                  <Link
                    href={`https://wa.me/?text=${encodeURIComponent(`${event.title} - ${url}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg"
                  >
                    <Image src="/icons/whatsapp.svg" width={16} height={16} alt="WhatsApp" />
                    WhatsApp
                  </Link>
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg"
                  >
                    <FaFacebook className="w-4 h-4" />
                    Facebook
                  </Link>
                  <button
                    onClick={() => handleCopyLink(url, event.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                  >
                    {copiedEventId === event.id ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4" />
                        Copiar link
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}