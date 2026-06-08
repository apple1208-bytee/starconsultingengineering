import { client } from "@/sanity/lib/client";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
};

export async function getAllBlogs(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    date,
    "image": image.asset->url,
    "content": body
  }`;
  
  return await client.fetch(query);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    date,
    "image": image.asset->url,
    "content": body
  }`;
  
  return await client.fetch(query, { slug });
}
