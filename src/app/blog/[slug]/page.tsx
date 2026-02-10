import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BackToTop from '@/components/blog/BackToTop';

// Import helper functions
import { extractTableOfContents } from '@/lib/blogUtils/extractTableOfContents';
import { renderNotionBlock } from '@/lib/blogUtils/renderNotionBlock';
import { fetchPost } from '@/lib/blogUtils/fetchPost';

// Force dynamic rendering and no caching
export const revalidate = 3600; // Revalidate every 1 hour

// Generate metadata for SEO
export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const post = await fetchPost(params.slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const imageUrl = post.featuredImage 
        ? `https://www.dannykryan.com/api/notion-featured-image/${post.id}` 
        : undefined;

    return {
        title: post.title,
        description: post.description || `${post.category} - ${post.tags.join(', ')}`,
        openGraph: {
            title: post.title,
            description: post.description || `${post.category} - ${post.tags.join(', ')}`,
            type: 'article',
            publishedTime: post.publishDate,
            authors: ['Danny Ryan'],
            ...(imageUrl && {
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description || `${post.category} - ${post.tags.join(', ')}`,
            ...(imageUrl && { 
                images: [imageUrl] }),
        },
    };
}

export default async function BlogPostPage(
    { params }: { params: { slug: string } }
) {
    const post = await fetchPost(params.slug);

    if (!post) {
        notFound();
    }

    const tableOfContents = extractTableOfContents(post.content);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-[75px]">
            <nav className="mb-8">
                <Link href="/blog" className="text-orange dark:text-green hover:text-orangeDark dark:hover:text-greenDark transition-colors">
                    ← Back to Blog
                </Link>
            </nav>

            <article>
                <header className="mb-8">
                    {post.featuredImage && (
                        <div className="relative w-full aspect-video mb-6">
                            <Image
                                src={`/api/notion-featured-image/${post.id}`}
                                alt={post.title}
                                className="object-cover rounded-lg"
                                fill={true}
                                priority
                            />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <div className="metadata flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 mb-6">
                        <span>Category: {post.category}</span>
                        <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                </header>

                <div className="prose prose-lg max-w-none">
                    {post.content && post.content.length > 0 ? (
                        post.content.map((block, index) => renderNotionBlock(block, index, tableOfContents))
                    ) : (
                        <p className="text-gray-500 italic">No content available for this post.</p>
                    )}
                </div>

                <div className="border-t mt-12 pt-8">
                    <Link href="/blog" className="inline-block bg-orange dark:bg-green text-white px-4 py-2 rounded hover:bg-orangeDark dark:hover:bg-greenDark transition-colors">
                        ← Back to All Posts
                    </Link>
                </div>
            </article>
            <BackToTop />
        </div>
    );
}