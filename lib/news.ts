import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type PostMeta = {
  title: string
  dek: string
  date: string
  author: string
  slug: string
  heroImage?: string
  tags?: string[]
  /** Set `published: false` in frontmatter to hide a post from the index, sitemap, and routes. */
  published?: boolean
}

export type Post = PostMeta & {
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'content/news')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return data as PostMeta
    })
    .filter((post) => post.published !== false)

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((fn) => fn.endsWith('.md'))
    .filter((fn) => {
      const fileContents = fs.readFileSync(path.join(postsDirectory, fn), 'utf8')
      const { data } = matter(fileContents)
      return (data as PostMeta).published !== false
    })
    .map((fn) => fn.replace(/\.md$/, ''))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  if ((data as PostMeta).published === false) return null

  const processed = await remark().use(html).process(content)

  return {
    ...(data as PostMeta),
    contentHtml: processed.toString(),
  }
}
