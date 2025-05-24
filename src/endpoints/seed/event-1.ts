import { Event } from "@/payload-types";

export const event1: Partial<Event> = {
  slug: "bachata-social-mama-rumba",
  title: "Bachata Social en Mama Rumba",
  description: "Ven a disfrutar de una noche llena de ritmo y sabor en uno de los lugares más icónicos para bailar en la Ciudad de México. Música en vivo, DJ invitados y mucha bachata.",
  location: {
    name: "Mama Rumba",
    address: "Querétaro 230, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX",
    lat: 19.412,
    lng: -99.1602,
  },
  dates: [
    {
      startDate: "2025-06-15T21:00:00Z",
      endDate: "2025-06-16T02:00:00Z",
    }
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  organization: '{{ORGANIZATION}}',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  featuredImage: '{{IMAGE_1}}',
}
