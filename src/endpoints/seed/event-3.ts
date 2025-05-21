import { Event } from "@/payload-types";

export const event1: Partial<Event> = {
  slug: "event-1",
  title: "Event 1",
  description: "Event 1 description",
  location: {
    name: "Event 1 Venue",
    address: "123 Main St",
    lat: 37.7749,
    lng: -122.4194,
  }
}
