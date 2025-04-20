import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Apply middleware to everything except:
    // - /api, /trpc, /_next, /_vercel, files with dots (e.g. favicon.ico)
    // - /admin (Payload CMS route)
    '/((?!api|trpc|_next|_vercel|.*\\..*|admin).*)'
  ]
}