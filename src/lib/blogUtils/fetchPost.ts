import type { BlogPost } from '@/types/blog';
import { groupConsecutiveImages } from './groupConsecutiveImages';

interface ApiResponse {
    success: boolean;
    result: BlogPost & { description?: string }; // Allow description explicitly
}

const getSiteUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
};

export async function fetchPost(slug: string): Promise<BlogPost | null> {
    try {
        const response = await fetch(
            `${getSiteUrl()}/api/post/${slug}`,
            { cache: 'no-store' }
        );

        if (!response.ok) return null;

        const data: ApiResponse = await response.json();

        if (data.success && data.result) {
            console.log('data.result keys:', Object.keys(data.result));
    console.log('data.result.description:', data.result.description);

            const post: BlogPost = {
                ...data.result,
                content: groupConsecutiveImages(data.result.content)
            };
            
            console.log('fetchPost final post keys:', Object.keys(post));
            
            return post;
        }

        return null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}