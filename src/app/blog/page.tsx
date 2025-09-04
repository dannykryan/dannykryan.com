"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Type definitions
interface BlogPost {
    id: string;
    title: string;
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
    error: string;
}

interface ApiError {
    success: false;
    error: string;
    details?: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('http://localhost:5000/api/notion/database/2641ce48-62da-8098-a645-c2259d5e47f9/pages');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiResponse | ApiError = await response.json();
                
                if (data.success) {
                    setPosts(data.results);
                } else {
                    throw new Error(data.error || 'Failed to fetch posts');
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Loading blog posts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 mt-[75px]">Latest Blog Posts ({posts.length})</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: BlogPost) => (
                    <div key={post.id} className="blog-post-card border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-sm text-gray-600 mb-1">Category: {post.category}</p>
                        <p className="text-sm text-gray-600 mb-2">Published: {new Date(post.publishDate).toLocaleDateString()}</p>
                        <p className="text-sm mb-4">Tags: {post.tags.join(', ')}</p>
                        {post.featuredImage && (
                            <div className="w-[300px] h-[300px]">
                                <Image 
                                    src={post.featuredImage} 
                                    alt={post.title}
                                    className="object-cover rounded mb-4"
                                    fill={true}
                                />
                            </div>
                        )}
                        <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Read more →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}