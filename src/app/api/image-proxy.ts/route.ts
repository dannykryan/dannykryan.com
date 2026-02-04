import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const imageUrl = request.nextUrl.searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('Missing URL parameter', { status: 400 });
    }

    try {
        console.log('🖼️ Proxying image:', imageUrl.substring(0, 100) + '...');
        
        // Fetch the image from Notion's S3 with proper headers
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.notion.so/',
            },
            // Don't follow redirects automatically
            redirect: 'follow',
        });
        
        console.log('📡 Image fetch status:', response.status);
        console.log('📡 Content-Type:', response.headers.get('Content-Type'));
        
        if (!response.ok) {
            const text = await response.text();
            console.error(`❌ Failed to fetch image: ${response.status}`, text.substring(0, 200));
            return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
        }

        const contentType = response.headers.get('Content-Type');
        
        // Verify it's actually an image
        if (!contentType || !contentType.startsWith('image/')) {
            console.error('❌ Response is not an image, got:', contentType);
            const text = await response.text();
            console.error('Response body preview:', text.substring(0, 500));
            return new NextResponse('Response is not a valid image', { status: 400 });
        }

        const blob = await response.blob();

        return new NextResponse(blob, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, immutable', // Cache for 24 hours
            },
        });
    } catch (error) {
        console.error('❌ Image proxy error:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}