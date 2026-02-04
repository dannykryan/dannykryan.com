import { NextRequest, NextResponse } from 'next/server';
import type { NotionPage } from '@/types/notion';

export async function GET(request: NextRequest) {
    try {
        
        const response = await fetch(
            `https://api.notion.com/v1/databases/${process.env.BLOG_DATABASE_ID}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sorts: [
                        {
                            property: 'Publish Date',
                            direction: 'descending'
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();

        const posts = data.results.map((page: NotionPage) => ({
            id: page.id,
            title: page.properties.Title.title[0]?.plain_text || 'Untitled',
            slug: page.properties['URL Slug'].rich_text[0]?.plain_text || '',
            category: page.properties.Category.select?.name || '',
            publishDate: page.properties['Publish Date'].date?.start || '',
            featuredImage: page.properties['Featured Image URL'].files[0]?.file.url || null,
            tags: page.properties.Tags.multi_select.map((tag) => tag.name),
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
        }));
        
        return NextResponse.json({
            success: true,
            count: posts.length,
            results: posts
        });
        
    } catch (error) {
        console.error('❌ Error fetching posts:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to fetch posts',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}