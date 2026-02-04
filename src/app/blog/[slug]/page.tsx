import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Import helper functions
import { extractTableOfContents } from '@/lib/blogUtils/extractTableOfContents';
import { renderNotionBlock } from '@/lib/blogUtils/renderNotionBlock';
import { fetchPost } from '@/lib/blogUtils/fetchPost';

// Force dynamic rendering and no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for SEO
export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const post = await fetchPost(params.slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    console.log('post keys:', Object.keys(post));
    console.log('post description:', post.description);

    const imageUrl = post.featuredImage 
        ? `https://www.dannykryan.com/api/notion-featured-image/${post.id}` 
        : undefined;

    return {
        title: post.title,
        description: `Published on ${new Date(post.publishDate).toLocaleDateString()}`,
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

    console.log('Fetched post keys count:', Object.keys(post ?? {}).length);
console.log('Fetched post content count:', post?.content?.length ?? 0);

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
                    <div className="metadata flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <span>Category: {post.category}</span>
                        <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>Tags: {post.tags.join(', ')}</span>
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
        </div>
    );
}