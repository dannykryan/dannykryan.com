"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Import helper functions
import { groupConsecutiveImages } from '@/lib/blogUtils/groupConsecutiveImages';
import { extractTableOfContents } from '@/lib/blogUtils/extractTableOfContents';
import { renderNotionBlock } from '@/lib/blogUtils/renderNotionBlock';

// Import Types
import type { BlogPost, TOCItem } from '@/types/blog';

interface ApiResponse {
    success: boolean;
    result: BlogPost;
}

interface ApiError {
    success: false;
    error: string;
    details?: string;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                
                const apiUrl = process.env.NODE_ENV === 'production'
                    ? `/api/post/${slug}`
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notion/database/${process.env.NEXT_PUBLIC_BLOG_DATABASE_ID}}/post/${slug}`;
                
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Blog post not found');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiResponse | ApiError = await response.json();
                
                if (data.success) {
                    data.result.content = groupConsecutiveImages(data.result.content);
                    setPost(data.result);
                    
                    // Extract H2 headings for table of contents
                    const tocItems = extractTableOfContents(data.result.content);
                    setTableOfContents(tocItems);
                    
                } else if ('error' in data) {
                    throw new Error(data.error || 'Failed to fetch post');
                } else {
                    throw new Error('Failed to fetch post');
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Loading blog post...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 mt-[75px]">
                <div className="text-red-500 text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p>{error}</p>
                    <Link href="/blog" className="inline-block mt-4 bg-orange dark:bg-green text-white px-4 py-2 rounded hover:bg-orangeDark dark:hover:bg-greenDark transition-colors">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-8 mt-[75px]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="inline-block bg-orange dark:bg-green text-white px-4 py-2 rounded hover:bg-orangeDark dark:hover:bg-greenDark transition-colors">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

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
                                src={post.featuredImage} 
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
