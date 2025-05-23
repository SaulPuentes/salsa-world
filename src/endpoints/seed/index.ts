import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import * as fs from 'fs'
import * as path from 'path'
import { contactForm as contactFormData } from './contact-form'
import { contact  as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { image3 } from './image-3'
import { imageHero1 } from './image-hero-1'
import { event1 } from './event-1'
import { event2 } from './event-2'
import { event3 } from './event-3'

const collections: CollectionSlug[] = [
  'categories',
  'events',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    payload.logger.info('Seeding database...')

    // we need to clear the media directory before seeding
    // as well as the collections and globals
    // this is because while `yarn seed` drops the database
    // the custom `/api/seed` endpoint does not
    payload.logger.info(`— Clearing collections and globals...`)

    // clear the database
    // await Promise.all(
    //   globals.map((global) =>
    //     payload.updateGlobal({
    //       slug: global,
    //       data: {},
    //       depth: 0,
    //       context: {
    //         disableRevalidate: true,
    //       },
    //     }),
    //   ),
    // )

    await Promise.all(
      collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
    )
    await Promise.all(
      collections
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
    )
    payload.logger.info(`— Seeding demo author and user...`)

    await payload.delete({
      collection: 'users',
      depth: 0,
      where: {
        email: {
          equals: 'demo-author@example.com',
        },
      },
    })

    payload.logger.info(`— Seeding media...`)

    // Load local images instead of fetching from URLs
    const seedImageDir = path.join(process.cwd(), 'src', 'endpoints', 'seed')
    const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
      readLocalFile(path.join(seedImageDir, 'image-event1.webp')),
      readLocalFile(path.join(seedImageDir, 'image-event2.webp')),
      readLocalFile(path.join(seedImageDir, 'image-event3.webp')),
      readLocalFile(path.join(seedImageDir, 'image-hero1.webp')),
    ])

    const [
      demoAuthor,
      image1Doc,
      image2Doc,
      image3Doc,
      imageHomeDoc,
      salsaCategory,
      bachataCategory,
      kizombaCategory,
      cumbiaCategory,
      ruedaCategory,
      beginnerCategory,
    ] = await Promise.all([
      payload.create({
        collection: 'users',
        data: {
          name: 'Demo Author',
          email: 'demo-author@example.com',
          password: 'password',
          role: 'organizer',
        },
      }),
      payload.create({
        collection: 'media',
        data: image1,
        file: image1Buffer,
      }),
      payload.create({
        collection: 'media',
        data: image2,
        file: image2Buffer,
      }),
      payload.create({
        collection: 'media',
        data: image3,
        file: image3Buffer,
      }),
      payload.create({
        collection: 'media',
        data: imageHero1,
        file: hero1Buffer,
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Salsa',
          breadcrumbs: [
            {
              label: 'Salsa',
              url: '/salsa',
            },
          ],
        },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Bachata',
          breadcrumbs: [
            {
              label: 'Bachata',
              url: '/bachata',
            },
          ],
        },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Kizomba',
          breadcrumbs: [
            {
              label: 'Kizomba',
              url: '/kizomba',
            },
          ],
        },
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'Cumbia',
          breadcrumbs: [
            {
              label: 'Cumbia',
              url: '/cumbia',
            },
          ],
        },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Rueda de Casino',
          breadcrumbs: [
            {
              label: 'Rueda de Casino',
              url: '/rueda-de-casino',
            },
          ],
        },
      }),

      payload.create({
        collection: 'categories',
        data: {
          title: 'Beginner Friendly',
          breadcrumbs: [
            {
              label: 'Beginner Friendly',
              url: '/beginner-friendly',
            },
          ],
        },
      }),
    ])

    let demoAuthorID: number | string = demoAuthor.id

    let image1ID: number | string = image1Doc.id
    const image2ID: number | string = image2Doc.id
    const image3ID: number | string = image3Doc.id
    let imageHomeID: number | string = imageHomeDoc.id

    if (payload.db.defaultIDType === 'text') {
      image1ID = `"${image1Doc.id}"`
      imageHomeID = `"${imageHomeDoc.id}"`
      demoAuthorID = `"${demoAuthorID}"`
    }

    payload.logger.info(`— Seeding events...`)

    // Do not create events with `Promise.all` because we want the events to be created in order
    // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
    
    const event1Doc = await payload.create({
      collection: 'events',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: JSON.parse(
        JSON.stringify({ ...event1, categories: [
          salsaCategory.id,
          bachataCategory.id,
          cumbiaCategory.id,
        ] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{ORGANIZATION\}\}"/g, String(demoAuthorID)),
      )
    })

    const event2Doc = await payload.create({
      collection: 'events',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: JSON.parse(
        JSON.stringify({ ...event2, categories: [
          salsaCategory.id,
          ruedaCategory.id,
          beginnerCategory.id,
        ] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
        .replace(/"\{\{ORGANIZATION\}\}"/g, String(demoAuthorID)),
      )
    })

    const event3Doc = await payload.create({
      collection: 'events',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: JSON.parse(
        JSON.stringify({ ...event3, categories: [
          bachataCategory.id,
          kizombaCategory.id,
          beginnerCategory.id,
        ] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
        .replace(/"\{\{ORGANIZATION\}\}"/g, String(demoAuthorID)),
      )
    })
    
    
    payload.logger.info(`— Seeding event categories...`)
    // update each event with related events
    await payload.update({
      id: event1Doc.id,
      collection: 'events',
      data: {
        relatedEvents: [event2Doc.id, event3Doc.id],
      },
    })
    await payload.update({
      id: event2Doc.id,
      collection: 'events',
      data: {
        relatedEvents: [event1Doc.id, event3Doc.id],
      },
    })
    await payload.update({
      id: event3Doc.id,
      collection: 'events',
      data: {
        relatedEvents: [event1Doc.id, event2Doc.id],
      },
    })

    payload.logger.info(`— Seeding contact form...`)

    const contactForm = await payload.create({
      collection: 'forms',
      depth: 0,
      data: JSON.parse(JSON.stringify(contactFormData)),
    })

    let contactFormID: number | string = contactForm.id

    if (payload.db.defaultIDType === 'text') {
      contactFormID = `"${contactFormID}"`
    }

    payload.logger.info(`— Seeding pages...`)

    const [_, contactPage] = await Promise.all([
      payload.create({
        collection: 'pages',
        depth: 0,
        data: JSON.parse(
          JSON.stringify(home)
            .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
            // .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID)),
        ),
      }),
      payload.create({
        collection: 'pages',
        depth: 0,
        data: JSON.parse(
          JSON.stringify(contactPageData).replace(
            /"\{\{CONTACT_FORM_ID\}\}"/g,
            String(contactFormID),
          ),
        ),
      }),
    ])

    payload.logger.info(`— Seeding globals...`)

    // await Promise.all([
    //   payload.updateGlobal({
    //     slug: 'header',
    //     data: {
    //       navItems: [
    //         {
    //           link: {
    //             type: 'custom',
    //             label: 'Posts',
    //             url: '/posts',
    //           },
    //         },
    //         {
    //           link: {
    //             type: 'reference',
    //             label: 'Contact',
    //             reference: {
    //               relationTo: 'pages',
    //               value: contactPage.id,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   }),
    //   payload.updateGlobal({
    //     slug: 'footer',
    //     data: {
    //       contact: {
    //         email: process.env.DEFAULT_CONTACT_EMAIL,
    //       },
    //       featuredEvent: {
    //         title: 'Salsa Fest',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //       }
    //     },
    //   }),
    // ])

    payload.logger.info('Seeded database successfully!')
  } catch (error) {
    console.log('Error seeding database:', error)
  }
}

// Helper function to read local files
async function readLocalFile(filePath: string): Promise<File> {
  try {
    const data = fs.readFileSync(filePath)
    const extension = path.extname(filePath).substring(1)

    return {
      name: path.basename(filePath),
      data: Buffer.from(data),
      mimetype: `image/${extension}`,
      size: data.length,
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    throw error
  }
}
