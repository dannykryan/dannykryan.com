import type { BlogPost } from '@/types/blog';
import { groupConsecutiveImages } from './groupConsecutiveImages';
import { getBaseUrl } from '@/lib/blogUtils/getBaseUrl';

interface ApiResponse {
    success: boolean;
    result: BlogPost & { description?: string };
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
    try {
        const url = `${getBaseUrl()}/api/post/${slug}`;
        
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            console.error(`[fetchPost] Failed: ${response.status}`, await response.text());
            return null;
        }

        const data: ApiResponse = await response.json();

        if (data.success && data.result) {
            const post: BlogPost = {
                ...data.result,
                content: groupConsecutiveImages(data.result.content)
            };

            return post;
        }

        return null;
    } catch (error) {
        console.error('[fetchPost] Error:', error);
        return null;
    }
}