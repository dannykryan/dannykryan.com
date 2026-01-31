"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
    content: NotionBlock[];
}

interface NotionBlock {
    object: string;
    id: string;
    type: string;
    [key: string]: any; // For different block types
}

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

    console.log('🖼️ Featured Image URL:', post.featuredImage);
    console.log('📄 Post object:', JSON.stringify(post, null, 2));

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`http://localhost:5000/api/notion/database/2641ce48-62da-8098-a645-c2259d5e47f9/post/${slug}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Blog post not found');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiResponse | ApiError = await response.json();
                
                if (data.success) {
                    setPost(data.result);
                    console.log('📄 Post content:', data.result.content); // Debug log
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

    const renderRichText = (richTextArray: any[]) => {
        return richTextArray.map((text, index) => {
            let content = text.plain_text;
            
            // Apply annotations (styling)
            const annotations = text.annotations;
            let className = '';
            let styles: React.CSSProperties = {};
            
            if (annotations.bold) className += ' font-bold';
            if (annotations.italic) className += ' italic';
            if (annotations.underline) className += ' underline';
            if (annotations.strikethrough) className += ' line-through';
            if (annotations.code) className += ' bg-gray-100 px-1 rounded text-sm font-mono';
            
            // Handle colors
            if (annotations.color && annotations.color !== 'default') {
                const colorMap: { [key: string]: string } = {
                    gray: 'text-gray-600',
                    brown: 'text-amber-800',
                    orange: 'text-orange-600',
                    yellow: 'text-yellow-600',
                    green: 'text-green-600',
                    blue: 'text-blue-600',
                    purple: 'text-purple-600',
                    pink: 'text-pink-600',
                    red: 'text-red-600',
                };
                className += ` ${colorMap[annotations.color] || ''}`;
            }
            
            // Handle links
            if (text.href) {
                return (
                    <a 
                        key={index} 
                        href={text.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-blue-600 hover:text-blue-800 underline${className}`}
                    >
                        {content}
                    </a>
                );
            }
            
            // Return styled text
            return (
                <span key={index} className={className.trim()}>
                    {content}
                </span>
            );
        });
    };

    // Function to render Notion blocks
    const renderNotionBlock = (block: NotionBlock) => {
        const { type, id } = block;

        switch (type) {
            case 'paragraph':
                const paragraphRichText = block.paragraph?.rich_text || [];
                if (paragraphRichText.length === 0) return <br key={id} />; // Empty paragraph = line break
                return (
                    <p key={id} className="mb-4">
                        {renderRichText(paragraphRichText)}
                    </p>
                );

            case 'heading_1':
                const h1Text = block.heading_1?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return <h1 key={id} className="text-3xl font-bold mb-4 mt-8">{h1Text}</h1>;

            case 'heading_2':
                const h2Text = block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return <h2 key={id} className="text-2xl font-bold mb-3 mt-6">{h2Text}</h2>;

            case 'heading_3':
                const h3Text = block.heading_3?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return <h3 key={id} className="text-xl font-bold mb-2 mt-4">{h3Text}</h3>;

            case 'bulleted_list_item':
                const bulletText = block.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return <li key={id} className="mb-1 ml-6 list-disc">{bulletText}</li>;

            case 'numbered_list_item':
                const numberedText = block.numbered_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return <li key={id} className="mb-1 ml-6 list-decimal">{numberedText}</li>;

            case 'code':
                const codeText = block.code?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return (
                    <pre key={id} className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                        <code>{codeText}</code>
                    </pre>
                );

            case 'quote':
                const quoteText = block.quote?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                return (
                    <blockquote key={id} className="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-600">
                        {quoteText}
                    </blockquote>
                );

            case 'image':
                const imageUrl = block.image?.external?.url || block.image?.file?.url;
                const caption = block.image?.caption?.map((text: any) => text.plain_text).join('') || '';
                return (
                    <div key={id} className="mb-4">
                        {imageUrl && (
                            <img 
                                src={imageUrl} 
                                alt={caption || 'Image'} 
                                className="w-full rounded"
                            />
                        )}
                        {caption && <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>}
                    </div>
                );

            default:
                // For unsupported block types, show the raw data
                return (
                    <div key={id} className="mb-4 p-2 bg-gray-50 rounded text-sm">
                        <strong>Unsupported block type: {type}</strong>
                        <pre className="mt-2 text-xs overflow-x-auto">
                            {JSON.stringify(block, null, 2)}
                        </pre>
                    </div>
                );
        }
    };

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
                    <Link href="/blog" className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
                    <Link href="/blog" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-[75px]">
            <nav className="mb-8">
                <Link href="/blog" className="text-blue-500 hover:text-blue-600">
                    ← Back to Blog
                </Link>
            </nav>

            <article>
                <header className="mb-8">
                    {post.featuredImage && (
                        <div className="relative w-full h-64 mb-6">
                            <img 
                                src={post.featuredImage} 
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    )}
                    
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <span>Category: {post.category}</span>
                        <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>Tags: {post.tags.join(', ')}</span>
                    </div>
                </header>

                <div className="prose prose-lg max-w-none">
                    {post.content && post.content.length > 0 ? (
                        post.content.map((block) => renderNotionBlock(block))
                    ) : (
                        <p className="text-gray-500 italic">No content available for this post.</p>
                    )}
                </div>

                <div className="border-t mt-12 pt-8">
                    <Link href="/blog" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        ← Back to All Posts
                    </Link>
                </div>
            </article>
        </div>
    );
}