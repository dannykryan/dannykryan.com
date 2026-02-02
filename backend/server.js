const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Client } = require('@notionhq/client');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🌍 Environment variables:', {
    hasNotionToken: !!process.env.NOTION_TOKEN,
    port: PORT
});

// Initialize Notion client
const notion = new Client({ 
    auth: process.env.NOTION_TOKEN 
});

app.use(cors());
app.use(express.json());

// Get all pages from a specific database
app.get('/allblogs', async (req, res) => {
    try {
        const databaseId = process.env.BLOG_DATABASE_ID;
        
        // Debug logs
        console.log('🔍 Debug info:', {
            databaseId: databaseId,
            hasToken: !!process.env.NOTION_TOKEN,
            tokenLength: process.env.NOTION_TOKEN?.length
        });
        
        if (!databaseId) {
            throw new Error('BLOG_DATABASE_ID not found in environment variables');
        }
        
        if (!process.env.NOTION_TOKEN) {
            throw new Error('NOTION_TOKEN not found in environment variables');
        }
        
        console.log(`📡 Making request to: https://api.notion.com/v1/databases/${databaseId}/query`);
        
        // Make direct HTTP request to Notion API
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
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
        });

        console.log(`📡 Response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Notion API error:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        
        console.log(`📄 Found ${data.results.length} pages in database`);

        if (data.results.length > 0) {
            console.log('🔍 First page property names:', Object.keys(data.results[0].properties));
            console.log('📋 First page full data:', JSON.stringify(data.results[0].properties, null, 2));
        }
        
        const cleanedPages = data.results.map(page => ({
            id: page.id,
            title: page.properties.Title.title[0]?.plain_text || 'Untitled',
            slug: page.properties['URL Slug'].rich_text[0]?.plain_text || '',
            category: page.properties.Category.select?.name || '',
            publishDate: page.properties['Publish Date'].date?.start || '',
            featuredImage: page.properties['Featured Image URL'].files[0]?.file.url || null,
            tags: page.properties.Tags.multi_select.map(tag => tag.name),
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time
        }));

        console.log('cleaned pages:', cleanedPages);
        
        // 🔥 SEND THE RESPONSE
        res.json({
            success: true,
            count: cleanedPages.length,
            results: cleanedPages
        });
        
    } catch (error) {
        console.error('❌ Detailed error:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        res.status(500).json({ 
            success: false,
            error: 'Failed to query database',
            details: error.message 
        });
    }
});

// Get database information
app.get('/api/notion/database/:databaseId/info', async (req, res) => {
    try {
        const { databaseId } = req.params;
        
        console.log(`📊 Getting info for database: ${databaseId}`);
        
        const database = await notion.databases.retrieve({
            database_id: databaseId,
        });
        
        res.json({
            success: true,
            database: database
        });
        
    } catch (error) {
        console.error('❌ Error fetching database info:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch database info',
            details: error.message 
        });
    }
});

app.get('/api/notion/database/:databaseId/post/:slug', async (req, res) => {
    try {
        const { databaseId, slug } = req.params;
        
        console.log(`🔍 Looking for post with slug: ${slug}`);
        
        // First get all pages to find the one with matching slug
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
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
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.results.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Post not found'
            });
        }
        
        const page = data.results[0];
        
        // Fetch ALL blocks with pagination
        console.log(`📄 Fetching content for page ID: ${page.id}`);
        
        let allBlocks = [];
        let hasMore = true;
        let startCursor = undefined;

        while (hasMore) {
            const contentResponse = await fetch(
                `https://api.notion.com/v1/blocks/${page.id}/children?${startCursor ? `start_cursor=${startCursor}` : ''}`,
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
            startCursor = contentData.next_cursor;
        }

        console.log(`📝 Found ${allBlocks.length} total blocks`);
        
        // Clean the data
        const cleanedPage = {
            id: page.id,
            title: page.properties.Title.title[0]?.plain_text || 'Untitled',
            slug: page.properties['URL Slug'].rich_text[0]?.plain_text || '',
            category: page.properties.Category.select?.name || '',
            publishDate: page.properties['Publish Date'].date?.start || '',
            featuredImage: page.properties['Featured Image URL'].files[0]?.file.url || null,
            tags: page.properties.Tags.multi_select.map(tag => tag.name),
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
            content: allBlocks
        };
        
        res.json({
            success: true,
            result: cleanedPage
        });
        
    } catch (error) {
        console.error('❌ Error fetching post:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch post',
            details: error.message 
        });
    }
});

// Error handling
process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Test the API at: http://localhost:${PORT}/api/test`);
    console.log(`📊 Database info: http://localhost:${PORT}/api/notion/database/YOUR_DATABASE_ID/info`);
    console.log(`📄 Database pages: http://localhost:${PORT}/api/notion/database/YOUR_DATABASE_ID/pages`);
});