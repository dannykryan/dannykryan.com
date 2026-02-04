import { ContentBlock, ImageGalleryBlock, NotionBlock } from '@/types/blog';

// Function to group consecutive image blocks into an image gallery block
export const groupConsecutiveImages = (blocks: ContentBlock[]) => {
    const grouped: ContentBlock[] = [];
    let imageGroup = [] as NotionBlock[];

    blocks.forEach((block) => {
        if (block.type === 'image') {
            imageGroup.push(block);
        } else {
            if (imageGroup.length > 1) {
                grouped.push({
                    object: 'block',
                    id: crypto.randomUUID(),
                    type: 'image_gallery',
                    images: imageGroup,
                } as ImageGalleryBlock);
            } else if (imageGroup.length === 1) {
                grouped.push(imageGroup[0]);
            }
            imageGroup = [];
            grouped.push(block);
        }
    });

    if (imageGroup.length > 1) {
        grouped.push({
            object: 'block',
            type: 'image_gallery',
            images: imageGroup,
        } as ImageGalleryBlock);
    } else if (imageGroup.length === 1) {
        grouped.push(imageGroup[0]);
    }
    return grouped;
};