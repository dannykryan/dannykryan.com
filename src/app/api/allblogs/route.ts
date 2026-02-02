import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ 
    auth: process.env.NOTION_TOKEN 
});

export async function GET(request: NextRequest) {
    try {
        console.log(`🔍 Fetching all blog posts`);
        
        const response = await (notion.databases as any).query({
            database_id: process.env.BLOG_DATABASE_ID!,
        });

        const posts = response.results.map((page: any) => ({
            id: page.id,
            title: page.properties.Title.title[0]?.plain_text || 'Untitled',
            slug: page.properties['URL Slug'].rich_text[0]?.plain_text || '',
            category: page.properties.Category.select?.name || '',
            publishDate: page.properties['Publish Date'].date?.start || '',
            featuredImage: page.properties['Featured Image URL'].files[0]?.file.url || null,
            tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
        }));

        console.log(`📝 Found ${posts.length} blog posts`);
        
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