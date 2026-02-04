export interface NotionRichText {
    plain_text: string;
    type: string;
    text?: {
        content: string;
        link: string | null;
    };
    annotations?: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    href: string | null;
}

export interface NotionFile {
    file: {
        url: string;
    };
}

export interface NotionSelect {
    name: string;
}

export interface NotionMultiSelect {
    name: string;
}

export interface NotionDate {
    start: string;
    end: string | null;
}

export interface NotionPage {
    id: string;
    url: string;
    created_time: string;
    last_edited_time: string;
    properties: {
        Title: {
            title: NotionRichText[];
        };
        Description: {
            rich_text: NotionRichText[];
        };
        'URL Slug': {
            rich_text: NotionRichText[];
        };
        Category: {
            select: NotionSelect | null;
        };
        'Publish Date': {
            date: NotionDate | null;
        };
        'Featured Image URL': {
            files: NotionFile[];
        };
        Tags: {
            multi_select: NotionMultiSelect[];
        };
    };
}

export interface NotionBlock {
    object: 'block';
    id: string;
    type: string;
    created_time: string;
    last_edited_time: string;
    has_children: boolean;
    archived: boolean;
    // Dynamic content based on type (heading_2, paragraph, image, etc.)
    [key: string]: any; // Kept flexible since blocks vary
}

export interface NotionPageWithContent extends NotionPage {
    content: NotionBlock[];
}