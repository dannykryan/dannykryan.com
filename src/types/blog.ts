export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
    publishDate: string;
    featuredImage: string | null;
    tags: string[];
    url: string;
    created_time: string;
    last_edited_time: string;
    content: ContentBlock[];
}

export interface NotionBlock {
    object: string;
    id: string;
    type: string;
    [key: string]: any;
}

export interface ImageGalleryBlock {
    object: 'block';
    id: string;
    type: 'image_gallery';
    images: NotionBlock[];
}

export type ContentBlock = NotionBlock | ImageGalleryBlock;

export interface TOCItem {
    id: string;
    text: string;
}