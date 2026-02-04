import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/blogUtils/getBaseUrl';

export const metadata: Metadata = {
  title: 'Blog | Danny Ryan',
  description: 'Web development insights, tutorials, and personal projects from Danny Ryan.',
  openGraph: {
    title: 'Blog | Danny Ryan',
    description: 'Web development insights, tutorials, and personal projects from Danny Ryan.',
    url: 'https://www.dannykryan.com/blog',
    siteName: 'Danny Ryan Portfolio',
    images: [
      {
        url: '/dannykryan-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Danny Ryan Blog',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Danny Ryan',
    description: 'Web development insights, tutorials, and personal projects.',
  },
};

// Type definitions
interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  publishDate: string;
  featuredImage: string | null;
  tags: string[];
  url: string;
  created_time: string;
  last_edited_time: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  results: BlogPost[];
}

export const dynamic = 'force-dynamic';

async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${getBaseUrl()}/api/allblogs`, { cache: 'no-store' });  // Use absolute URL
  if (!res.ok) return [];
  const data: ApiResponse = await res.json();
  return data.success ? data.results : [];
}

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mt-[75px]">Latest Blog Posts ({posts.length})</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div key={post.id} className="blog-post-card border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-1">Category: {post.category}</p>
            <p className="text-sm text-gray-600 mb-2">Published: {new Date(post.publishDate).toLocaleDateString()}</p>
            <p className="text-sm mb-4">Tags: {post.tags.join(', ')}</p>
            {post.featuredImage && (
              <div className="relative w-full h-[300px] mb-4">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  className="object-cover rounded"
                  fill={true}
                  priority={index === 0}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block bg-orange dark:bg-green text-white px-4 py-2 rounded hover:bg-orangeDark dark:hover:bg-greenDark transition-colors"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}