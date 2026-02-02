import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ 
    auth: process.env.NOTION_TOKEN 
});

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        
        console.log(`🔍 Looking for post with slug: ${slug}`);
        
        const response = await notion.dataSources.query({
            data_source_id: process.env.BLOG_DATABASE_ID!,
            filter: {
                property: 'URL Slug',
                rich_text: {
                    equals: slug
                }
            }
        });

        if (response.results.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Post not found'
            }, { status: 404 });
        }
        
        const page = response.results[0] as any;
        
        // Fetch ALL blocks with pagination
        let allBlocks = [];
        let hasMore = true;
        let startCursor: string | undefined = undefined;

        while (hasMore) {
            const contentResponse = await notion.blocks.children.list({
                block_id: page.id,
                start_cursor: startCursor,
            });

            allBlocks.push(...contentResponse.results);
            hasMore = contentResponse.has_more;
            startCursor = contentResponse.next_cursor ?? undefined;
        }

        console.log(`📝 Found ${allBlocks.length} total blocks`);
        
        const cleanedPage = {
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
            content: allBlocks
        };
        
        return NextResponse.json({
            success: true,
            result: cleanedPage
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