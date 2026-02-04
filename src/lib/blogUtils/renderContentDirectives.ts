import type { TOCItem } from '@/types/blog';
import { renderTableOfContents } from './renderTableOfContents';

export const CONTENT_DIRECTIVES = {
    TABLE_OF_CONTENTS: '#!contents',
} as const;

/**
 * Renders components based on content directives
 * @param directive - The directive text (e.g., '#!contents')
 * @param data - Data to pass to the directive renderer (e.g., tableOfContents)
 * @returns JSX.Element or null if directive not found
 */

export const renderContentDirective = (
    directive: string,
    data: { tableOfContents?: TOCItem[] }
): JSX.Element | null => {
    switch (directive) {
        case CONTENT_DIRECTIVES.TABLE_OF_CONTENTS:
            return data.tableOfContents 
                ? renderTableOfContents(data.tableOfContents)
                : null;
        
        // Add more directives here as needed eg.
        // case CONTENT_DIRECTIVES.RELATED_POSTS:
        //     return renderRelatedPosts(data.relatedPosts);
        
        default:
            return null;
    }
};