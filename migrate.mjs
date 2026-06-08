import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: 'skb41KTz5YdDVlAcx726M8hqIDyaJjhRyZCph0PKoS85jhQ1BcVmERZ1aWjLyufYdbcw66nS08vJ9apElYF99HiuqSxtu3VnTIyEZ80t6oA1mbiv74KiiFSeDNP6wM4Gs0Vzprq49t9Bp5MQqGhU0ZpfybPj9Xivc83C8Eaiwf3lrfPYN5ld',
  useCdn: false,
})

const blogDir = path.join(process.cwd(), 'src/content/blogs')

async function migrate() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))

  console.log(`Found ${files.length} markdown files. Starting migration...`)

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const { data, content } = matter(fileContent)
    
    let imageAsset = undefined

    // Check if there is an image and it's a URL
    if (data.image && typeof data.image === 'string' && data.image.startsWith('http')) {
      console.log(`Downloading image for ${slug}...`)
      try {
        const response = await fetch(data.image)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        console.log(`Uploading image for ${slug}...`)
        imageAsset = await client.assets.upload('image', buffer, { filename: `${slug}-image.jpg` })
      } catch (e) {
        console.error(`Failed to upload image for ${slug}`, e.message)
      }
    }

    const doc = {
      _type: 'post',
      title: data.title,
      slug: { _type: 'slug', current: slug },
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime,
      date: data.date,
      body: content,
    }

    if (imageAsset) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    }

    try {
      console.log(`Creating document for ${slug}...`)
      await client.create(doc)
      console.log(`Successfully migrated ${slug}!`)
    } catch (e) {
      console.error(`Failed to create document for ${slug}`, e.message)
    }
  }

  console.log('Migration complete!')
}

migrate()
