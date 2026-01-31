import { BOOKS } from '~/utils/book'

// Static pages
const staticPages = [
  asSitemapUrl({ loc: '/', changefreq: 'weekly', priority: 1.0 }),
  asSitemapUrl({ loc: '/help', changefreq: 'monthly', priority: 0.7 }),
]

export default defineSitemapEventHandler(() => {
  const urls = [...staticPages]

  // Generate URLs for all Bible chapters
  for (const [abbr, , chapters] of BOOKS) {
    for (let chapter = 1; chapter <= chapters; chapter++) {
      urls.push(
        asSitemapUrl({
          loc: `/bible/${abbr}.${chapter}`,
          changefreq: 'monthly',
          priority: 0.8,
        })
      )
    }
  }

  return urls
})
