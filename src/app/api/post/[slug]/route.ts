import { NextRequest, NextResponse } from 'next/server';
import type { NotionBlock, NotionMultiSelect } from '@/types/notion';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        
        const response = await fetch(
            `https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_BLOG_DATABASE_ID}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filter: {
                        property: 'URL Slug',
                        rich_text: {
                            equals: slug
                        }
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();

        if (data.results.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Post not found'
            }, { status: 404 });
        }
        
        const page = data.results[0];
        
        // Fetch ALL blocks with pagination
        let allBlocks: NotionBlock[] = [];
        let hasMore = true;
        let startCursor: string | undefined = undefined;

        while (hasMore) {
            const contentResponse: Response = await fetch(
                `https://api.notion.com/v1/blocks/${page.id}/children${startCursor ? `?start_cursor=${startCursor}` : ''}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                        'Notion-Version': '2022-06-28',
                    }
                }
            );

            if (!contentResponse.ok) {
                console.error(`Failed to fetch page content: ${contentResponse.status}`);
                break;
            }

            const contentData = await contentResponse.json();
            allBlocks.push(...contentData.results);
            hasMore = contentData.has_more;
            startCursor = contentData.next_cursor ?? undefined;
        }

        console.log('Available properties:', Object.keys(page.properties));
        
        const cleanedPage = {
            id: page.id,
            title: page.properties.Title.title[0]?.plain_text || 'Untitled',
            description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
            slug: page.properties['URL Slug'].rich_text[0]?.plain_text || '',
            category: page.properties.Category.select?.name || '',
            publishDate: page.properties['Publish Date'].date?.start || '',
            featuredImage: page.properties['Featured Image URL'].files[0]?.file.url || null,
            tags: page.properties.Tags.multi_select.map((tag: NotionMultiSelect) => tag.name),
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
            content: allBlocks
        };

        console.log('API cleanedPage keys:', Object.keys(cleanedPage));
        
        return NextResponse.json({
            success: true,
            result: cleanedPage,
            debug: {
                availableProperties: Object.keys(page.properties),
                cleanedPageKeys: Object.keys(cleanedPage),
                hasDescription: !!page.properties.Description,
                descriptionValue: page.properties.Description?.rich_text?.[0]?.plain_text,
            }
        });
        
    } catch (error) {
        console.error('❌ Error fetching post:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to fetch post',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}