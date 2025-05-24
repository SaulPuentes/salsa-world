import { Event } from "@/payload-types";

export const event3: Partial<Event> = {
  slug: "playa-bachata-social",
  title: "Social de Baile Playa Bachata",
  description: "Baila bajo las estrellas en la playa de Zicatela con ritmos latinos y un ambiente relajado. Perfecto para locales y turistas.",
  location: {
    name: "Playa Zicatela",
    address: "Zicatela, Puerto Escondido, Oaxaca, México",
    lat: 15.8494,
    lng: -97.0591,
  },
  dates: [
    {
      startDate: "2025-08-10T19:00:00Z",
      endDate: "2025-08-11T00:00:00Z",
    }
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  organization: '{{ORGANIZATION}}',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  featuredImage: '{{IMAGE_1}}',
}
