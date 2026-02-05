import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { blockId: string } }
) {
  const { blockId } = params;

  try {
    const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Failed to fetch block: ${response.status}`);
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    const block = await response.json();
    const imageUrl = block.image?.external?.url || block.image?.file?.url;

    if (!imageUrl) {
      return new NextResponse('No image found', { status: 404 });
    }

    const imageResponse = await fetch(imageUrl, { cache: 'no-store' });

    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: imageResponse.status });
    }

    const blob = await imageResponse.blob();
    const contentType = imageResponse.headers.get('Content-Type') || 'image/jpeg';

    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=2400, stale-while-revalidate=600, must-revalidate', // Cache for 40 minutes, allow stale for 10 minutes
      },
    });
  } catch (error) {
    console.error('Image fetch error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}