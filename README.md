# Danny Ryan's Portfolio & Blog

![website-header](/public/dannykryan-screenshot.png)

**Visit:** [www.dannykryan.com](https://www.dannykryan.com/)

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Blog System](#blog-system)
  - [Content Directives](#content-directives)
  - [Adding New Directives](#adding-new-directives)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Introduction

This is a full-stack portfolio and blog website built with Next.js 14, TypeScript, and Tailwind CSS. It features a dynamic blog system powered by Notion API, allowing for seamless content management directly from Notion.

The website showcases my projects, skills, and testimonials with a modern, responsive design that includes dark/light mode support and smooth animations.

## ✨ Features

### Portfolio Section
- **Projects Showcase** - Displays featured projects with descriptions, technologies, and links
- **Skills Display** - Highlights technical skills and experience
- **Testimonials** - Client and colleague testimonials with LinkedIn links
- **Contact Section** - Easy ways to get in touch

### Blog System
- **Notion Integration** - Write blog posts directly in Notion, automatically synced to the website
- **Rich Content Support** - Headings, paragraphs, lists, quotes, code blocks, images, and image galleries
- **Table of Contents** - Auto-generated TOC with smooth scroll navigation
- **Content Directives** - Special commands to include dynamic content (e.g., auto-generated TOC)
- **Responsive Images** - Next.js Image optimization for fast loading
- **Dark Mode Support** - Beautiful dark mode for blog content

### General Features
- 🌓 **Dark/Light Mode Toggle** - Theme persistence across sessions
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Performance Optimized** - Image optimization, code splitting, lazy loading
- ♿ **Accessible** - ARIA labels, semantic HTML
- 🔍 **SEO Optimized** - Meta tags, Open Graph support
- 🎨 **Smooth Animations** - Hover effects and page transitions

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Swiper** - Image carousel/gallery component

### Backend (Serverless API Routes)
- **Next.js API Routes** - Serverless functions for Notion API calls
- **Notion API** - Content management

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Notion account with API access

### Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/dannykryan/dannykryan.com.git
cd dannykryan.com
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create two `.env.local` files in both the root directory and the backend folder:
```env
NOTION_TOKEN=your_notion_token_here
NEXT_PUBLIC_BLOG_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

4. **Start the development server:**
```bash
cd backend
npm install
npm run dev
```

This starts the Express server on `http://localhost:5000`

5. **Start the frontend (in a new terminal):**
```bash
npm run dev
```

6. **View the website:**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
dannykryan.com/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── blog/          # Blog pages
│   │   │   ├── page.tsx   # Blog listing page
│   │   │   └── [slug]/    # Individual blog post pages
│   │   ├── api/           # API routes
│   │   │   ├── allblogs/  # Fetch all blog posts
│   │   │   └── post/      # Fetch individual posts
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── blog/          # Blog-specific components
│   │   │   ├── ImageGallery.tsx
│   │   │   └── tableOfContents.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── DarkModeToggle.tsx
│   ├── lib/              # Utility functions
│   │   └── blogUtils/    # Blog-related utilities
│   │       ├── renderNotionBlock.tsx      # Render Notion blocks
│   │       ├── renderRichText.tsx         # Handle rich text formatting
│   │       ├── renderContentDirectives.ts # Handle content directives
│   │       ├── extractTableOfContents.ts  # Auto-generate TOC
│   │       ├── groupConsecutiveImages.ts  # Gallery creation
│   │       └── createAnchorId.ts          # Generate anchor IDs
│   └── types/            # TypeScript interfaces
│       ├── blog.ts       # Blog-related types
│       └── notion.ts     # Notion API types
├── backend/              # Express server
│   ├── server.js         # Main server file
│   ├── .env              # Backend environment variables
│   └── package.json
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json
```

## 📝 Blog System

### How Blog Posts Work

1. **Create in Notion** - Write blog posts in your Notion database
2. **API Fetch** - The app fetches posts via Notion API
3. **Transform** - Notion blocks are transformed into React components
4. **Render** - Content is displayed on the website with rich formatting

### Required Notion Database Properties

Your Notion database must have these properties:

| Property | Type | Description |
|----------|------|-------------|
| `Title` | Title | Blog post title |
| `URL Slug` | Rich Text | URL-friendly slug (e.g., "my-first-post") |
| `Category` | Select | Blog post category |
| `Publish Date` | Date | Publication date |
| `Featured Image URL` | Files | Cover image for the post |
| `Tags` | Multi-select | Post tags/keywords |

### Supported Content Types

The blog system supports all standard Notion blocks:

- ✅ Headings (H1, H2, H3)
- ✅ Paragraphs with rich text formatting
- ✅ Bold, italic, underline, strikethrough, code
- ✅ Links with hover effects
- ✅ Colored text
- ✅ Bulleted & numbered lists
- ✅ Code blocks
- ✅ Quotes
- ✅ Images with captions
- ✅ Image galleries (consecutive images auto-group)
- ✅ Dividers
- ✅ Content Directives (special commands)

### Content Directives

Content Directives are special commands that let you include dynamic content in your Notion posts. They're written as plain text in a paragraph block and trigger special rendering.

#### Using Content Directives

1. Create a new paragraph block in your Notion post
2. Type the directive text exactly as shown
3. Save - the website will automatically render the directive

#### Available Directives

##### Table of Contents (`#!contents`)

Auto-generates a clickable table of contents from all H2 headings in the post.

**Example:**
```
#!contents
```

**Renders:**
- A styled list of all H2 headings in the post
- Clickable links that scroll to each heading
- Only appears if there are H2 headings in the post

---

### Adding New Content Directives

To add a new directive, follow these steps:

#### Step 1: Define the Directive

Edit [`src/lib/blogUtils/renderContentDirectives.ts`](src/lib/blogUtils/renderContentDirectives.ts):

```typescript
export const CONTENT_DIRECTIVES = {
    TABLE_OF_CONTENTS: '#!contents',
    RELATED_POSTS: '#!related',      // Add your new directive here
    FEATURED_BOX: '#!featured',
} as const;
```

#### Step 2: Create the Renderer Component

Create a new component or function. For example, create `src/components/blog/relatedPosts.tsx`:

```typescript
import type { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
    posts: BlogPost[];
}

export const renderRelatedPosts = (posts: BlogPost[]) => {
    if (!posts || posts.length === 0) return null;
    
    return (
        <div className="related-posts bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
            <h3 className="text-lg font-bold mb-4">Related Posts</h3>
            <ul className="space-y-2">
                {posts.map((post) => (
                    <li key={post.id}>
                        <a 
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {post.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

#### Step 3: Update the Directive Handler

Edit [`src/lib/blogUtils/renderContentDirectives.ts`](src/lib/blogUtils/renderContentDirectives.ts) and add the case:

```typescript
import { renderRelatedPosts } from '../../components/blog/relatedPosts';

export const renderContentDirective = (
    directive: string,
    data: { tableOfContents?: TOCItem[]; relatedPosts?: BlogPost[] }
): JSX.Element | null => {
    switch (directive) {
        case CONTENT_DIRECTIVES.TABLE_OF_CONTENTS:
            return data.tableOfContents 
                ? renderTableOfContents(data.tableOfContents)
                : null;
        
        case CONTENT_DIRECTIVES.RELATED_POSTS:
            return data.relatedPosts
                ? renderRelatedPosts(data.relatedPosts)
                : null;
        
        default:
            return null;
    }
};
```

#### Step 4: Pass Data from Blog Post Page

Edit [`src/app/blog/[slug]/page.tsx`](src/app/blog/[slug]/page.tsx) and pass the new data:

```typescript
// In the fetchPost function, after you have the post data:
const relatedPosts = posts.filter(p => 
    p.category === post.category && p.id !== post.id
).slice(0, 3);

// In renderNotionBlock calls:
{renderNotionBlock(block, index, tableOfContents, relatedPosts)}
```

#### Step 5: Update renderNotionBlock Signature

Edit [`src/lib/blogUtils/renderNotionBlock.tsx`](src/lib/blogUtils/renderNotionBlock.tsx):

```typescript
export const renderNotionBlock = (
    block: ContentBlock, 
    index: number, 
    tableOfContents: TOCItem[],
    relatedPosts?: BlogPost[]  // Add new parameter
) => {
    // ... existing code ...
    
    if (text === CONTENT_DIRECTIVES.RELATED_POSTS) {
        return renderContentDirective(text, { relatedPosts });
    }
};
```

## 🔑 Environment Variables

### Frontend (.env.local)

```env
# Notion API token - Get from https://www.notion.so/my-integrations
NOTION_TOKEN=your_token_here

# Notion database ID for blog posts
NEXT_PUBLIC_BLOG_DATABASE_ID=your_database_id

# Backend URL (for development)
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

### Backend (backend/.env)

```env
NOTION_TOKEN=your_token_here
BLOG_DATABASE_ID=your_database_id
PORT=5000
```

### How to Get Your Notion Credentials

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "Create new integration"
3. Name it (e.g., "Blog API")
4. Copy the "Internal Integration Token"
5. Go to your Notion database
6. Click "..." → "Connections" → Add your integration
7. Copy the database ID from the URL: `https://notion.so/[DATABASE_ID]?v=...`

## 💻 Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import the repository
3. Add environment variables in project settings
4. Deploy automatically on push

### Environment Variables on Vercel

Add these in your Vercel project settings under "Environment Variables":
- `NOTION_TOKEN`
- `NEXT_PUBLIC_BLOG_DATABASE_ID`

## 📖 Example: Creating a Blog Post

1. **In Notion:**
   - Create a new page in your blog database
   - Fill in: Title, URL Slug, Category, Publish Date, Featured Image, Tags
   - Add content using Notion blocks

2. **Include a directive:**
   - Add a paragraph with `#!contents` to auto-generate table of contents
   - The website will automatically render it

3. **Publish:**
   - Your post appears on `/blog/[your-slug]` automatically!

## 🐛 Troubleshooting

### Blog posts not loading
- Check that `NOTION_TOKEN` is correct
- Verify the integration is connected to your database in Notion
- Check browser console for API errors

### Images not displaying
- Ensure image URLs in Notion are accessible
- Check that `next.config.js` includes the domain in `remotePatterns`

### Styles not applying
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📬 Contact

- **Website:** [dannykryan.com](https://dannykryan.com)
- **Email:** [dannykryan@gmail.com](mailto:dannykryan@gmail.com)
- **LinkedIn:** [linkedin.com/in/dannykryan](https://linkedin.com/in/dannykryan)
- **GitHub:** [@dannykryan](https://github.com/dannykryan)

---

**Last Updated:** January 2025