import { ContentBlock, TOCItem } from '@/types/blog';
import { createAnchorId } from './createAnchorId';

// Extract H2 headings for table of contents
export const extractTableOfContents = (blocks: ContentBlock[]): TOCItem[] => {
    const toc: TOCItem[] = [];
    
    blocks.forEach((block) => {
        if (block.type === 'heading_2') {
            const h2Text = block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || '';
            if (h2Text) {
                toc.push({
                    id: createAnchorId(h2Text),
                    text: h2Text
                });
            }
        }
    });
    
    return toc;
};