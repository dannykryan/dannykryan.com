"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

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
    content: ContentBlock[];
}

interface NotionBlock {
    object: string;
    id: string;
    type: string;
    [key: string]: any;
}

interface ImageGalleryBlock {
    object: 'block';
    id: string;
    type: 'image_gallery';
    images: NotionBlock[];
}

type ContentBlock = NotionBlock | ImageGalleryBlock;

interface ApiResponse {
    success: boolean;
    result: BlogPost;
}

interface ApiError {
    success: false;
    error: string;
    details?: string;
}

interface TOCItem {
    id: string;
    text: string;
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
                    : `http://localhost:5000/api/notion/database/2641ce4862da8098a645c2259d5e47f9/post/${slug}`;
                
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
                    
                    console.log('📄 Post content:', data.result.content);
                    console.log('📑 Table of Contents:', tocItems);
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

    // Helper function to create URL-safe ID from text
    const createAnchorId = (text: string): string => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    // Extract H2 headings for table of contents
    const extractTableOfContents = (blocks: ContentBlock[]): TOCItem[] => {
        const toc: TOCItem[] = [];
        
        blocks.forEach((block) => {
            if (block.type === 'heading_2') {
                const h2Text = block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || '';
                if (h2Text) {
                    toc.push({
                        id: createAnchorId(h2Text),
                        text: h2Text
                    });
                }
            }
        });
        
        return toc;
    };

    const groupConsecutiveImages = (blocks: ContentBlock[]) => {
        const grouped: ContentBlock[] = [];
        let imageGroup = [] as NotionBlock[];

        blocks.forEach((block) => {
            if (block.type === 'image') {
                imageGroup.push(block);
            } else {
                if (imageGroup.length > 1) {
                    grouped.push({
                        object: 'block',
                        id: crypto.randomUUID(),
                        type: 'image_gallery',
                        images: imageGroup,
                    } as ImageGalleryBlock);
                } else if (imageGroup.length === 1) {
                    grouped.push(imageGroup[0]);
                }
                imageGroup = [];
                grouped.push(block);
            }
        });

        if (imageGroup.length > 1) {
            grouped.push({
                object: 'block',
                type: 'image_gallery',
                images: imageGroup,
            } as ImageGalleryBlock);
        } else if (imageGroup.length === 1) {
            grouped.push(imageGroup[0]);
        }
        return grouped;
    };

    const renderRichText = (richTextArray: any[]) => {
        return richTextArray.map((text, index) => {
            let content = text.plain_text;
            
            const annotations = text.annotations;
            let className = '';
            
            if (annotations.bold) className += ' font-bold';
            if (annotations.italic) className += ' italic';
            if (annotations.underline) className += ' underline';
            if (annotations.strikethrough) className += ' line-through';
            if (annotations.code) className += ' bg-gray-100 px-1 rounded text-sm font-mono';
            
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
            
            if (text.href) {
                return (
                    <a 
                        key={index} 
                        href={text.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-orange hover:text-orangeDark dark:text-green dark:hover:text-greenDark underline${className}`}
                    >
                        {content}
                    </a>
                );
            }
            
            return (
                <span key={index} className={className.trim()}>
                    {content}
                </span>
            );
        });
    };

    // Render table of contents component
    const renderTableOfContents = () => {
        if (tableOfContents.length === 0) return null;
        
        return (
            <nav className="toc bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8 border-l-4 border-orange dark:border-green">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                    {tableOfContents.map((item) => (
                        <li key={item.id}>
                            <a 
                                href={`#${item.id}`}
                                className="text-orange hover:text-orangeDark dark:text-green dark:hover:text-greenDark hover:underline transition-colors"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    // Function to render Notion blocks
    const renderNotionBlock = (block: NotionBlock, index: number) => {
        const { type, id } = block;

        // Check for #!contents directive
        if (type === 'paragraph') {
            const text = block.paragraph?.rich_text?.map((text: any) => text.plain_text).join('') || '';
            if (text.trim() === '#!contents') {
                return renderTableOfContents();
            }
        }

        switch (type) {
            case 'paragraph':
                const paragraphRichText = block.paragraph?.rich_text || [];
                if (paragraphRichText.length === 0) return <br key={id} />;
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
                const h2Id = createAnchorId(h2Text);
                return (
                    <h2 
                        key={id} 
                        id={h2Id}
                        className="text-2xl font-bold mb-3 mt-6 scroll-mt-20"
                    >
                        {h2Text}
                    </h2>
                );

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
                            <div className="relative w-full h-[600px]">
                                <Image 
                                    src={imageUrl} 
                                    alt={caption || 'Image'}
                                    className="object-cover rounded"
                                    fill={true}
                                />
                            </div>
                        )}
                        {caption && <p className="caption text-sm text-gray-600 mt-2 text-center">{caption}</p>}
                    </div>
                );

            case 'image_gallery':
                return <ImageGallery key={id} images={block.images} />;

            case 'divider':
                return <hr key={id} className="my-8 border-b-2 border-orange dark:border-green" />;

            default:
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

    console.log('post object:', post)

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
                        post.content.map((block, index) => renderNotionBlock(block, index))
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
