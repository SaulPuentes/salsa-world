import { Event } from "@/payload-types";

export const event2: Partial<Event> = {
  slug: "salsa-night-la-santa",
  title: "Salsa Night en La Santa",
  description: "Una noche de salsa con DJ internacional y pista abierta para todos los niveles. ¡No te lo pierdas en La Santa Guadalajara!",
  location: {
    name: "La Santa",
    address: "Av. Adolfo López Mateos Sur 1710, Jardines del Bosque, 44520 Guadalajara, Jal.",
    lat: 20.6597,
    lng: -103.3918,
  },
  dates: [
    {
      startDate: "2025-07-06T20:00:00Z",
      endDate: "2025-07-07T01:00:00Z",
    }
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  organization: '{{ORGANIZATION}}',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  featuredImage: '{{IMAGE_1}}',
}
