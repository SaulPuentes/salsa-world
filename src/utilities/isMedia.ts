import { Media } from "@/payload-types";

export function isMedia(maybeMedia: unknown): maybeMedia is Media {
  return typeof maybeMedia === 'object' && maybeMedia !== null && 'url' in maybeMedia;
}