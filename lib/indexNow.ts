import { SITE_URL } from './seo'

// IndexNow tells Bing (and the engines that share its feed, which several AI
// assistants search through) which picks pages changed, instead of waiting
// for a crawl. The key is public by design: search engines fetch it from
// /<key>.txt to confirm the site sent the list.
export const INDEXNOW_KEY = '0b99970045ac42ce904b4c83906bfced'
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
export const INDEXNOW_HOST = 'intori.com'
/** IndexNow takes at most 10,000 URLs in one post. */
export const INDEXNOW_MAX_URLS = 9_999
