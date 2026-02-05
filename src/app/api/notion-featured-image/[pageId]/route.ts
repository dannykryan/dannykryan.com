import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { pageId: string } }
) {
    const { pageId } = params;

    try {
        // Fetch the page from Notion to get fresh property data
        const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Failed to fetch page: ${response.status}`);
            return new NextResponse('Failed to fetch page', { status: response.status });
        }

        const page = await response.json();
        
        // Get the fresh featured image URL from properties
        const featuredImageUrl = page.properties['Featured Image URL']?.files?.[0]?.file?.url;

        if (!featuredImageUrl) {
            return new NextResponse('No featured image found', { status: 404 });
        }

        // Fetch the actual image
        const imageResponse = await fetch(featuredImageUrl, { cache: 'no-store' });

        if (!imageResponse.ok) {
            return new NextResponse('Failed to fetch image', { status: imageResponse.status });
        }

        const blob = await imageResponse.blob();
        const contentType = imageResponse.headers.get('Content-Type') || 'image/jpeg';

        return new NextResponse(blob, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', // Cache for 1 minute, allow stale for 5 minutes
            },
        });
    } catch (error) {
        console.error('Featured image fetch error:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}