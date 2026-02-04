import type { TOCItem } from '@/types/blog';
import type { NotionBlock, NotionRichText } from '@/types/notion';
import { renderRichText } from './renderRichText';
import { createAnchorId } from './createAnchorId';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';
import { renderContentDirective, CONTENT_DIRECTIVES } from './renderContentDirectives';


// Function to render Notion blocks
export const renderNotionBlock = (block: NotionBlock, index: number, tableOfContents: TOCItem[]) => {
        const { type, id } = block;

        // Check for content directive
        if (type === 'paragraph' && block.paragraph?.rich_text) {
            const text = block.paragraph.rich_text.map((t: NotionRichText) => t.plain_text).join('').trim();
            
            if (text === CONTENT_DIRECTIVES.TABLE_OF_CONTENTS) {
                return renderContentDirective(text, { tableOfContents });
            }
        }

        switch (type) {
            case 'paragraph':
                const paragraphRichText = block.paragraph?.rich_text || [];
                if (paragraphRichText.length === 0) return <br key={id} />;
                return (
                    <p key={id} className="mb-4">
                        {renderRichText(paragraphRichText)}
                    </p>
                );

            case 'heading_1':
                const h1Text = block.heading_1?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return <h1 key={id} className="text-3xl font-bold mb-4 mt-8">{h1Text}</h1>;

            case 'heading_2':
                const h2Text = block.heading_2?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                const h2Id = createAnchorId(h2Text);
                return (
                    <h2 
                        key={id} 
                        id={h2Id}
                        className="text-2xl font-bold mb-4 mt-6 scroll-mt-20"
                    >
                        {h2Text}
                    </h2>
                );

            case 'heading_3':
                const h3Text = block.heading_3?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return <h3 key={id} className="text-xl font-bold mb-2 mt-4">{h3Text}</h3>;

            case 'bulleted_list_item':
                const bulletText = block.bulleted_list_item?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return <li key={id} className="mb-1 ml-6 list-disc">{bulletText}</li>;

            case 'numbered_list_item':
                const numberedText = block.numbered_list_item?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return <li key={id} className="mb-1 ml-6 list-decimal">{numberedText}</li>;

            case 'code':
                const codeText = block.code?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return (
                    <pre key={id} className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                        <code>{codeText}</code>
                    </pre>
                );

            case 'quote':
                const quoteText = block.quote?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return (
                    <blockquote key={id} className="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-600">
                        {quoteText}
                    </blockquote>
                );

            case 'image':
                const imageUrl = block.image?.external?.url || block.image?.file?.url;
                const caption = block.image?.caption?.map((text: NotionRichText) => text.plain_text).join('') || '';
                return (
                    <div key={id} className="mb-8 mt-4">
                        {imageUrl && (
                            <div className="relative w-full h-[600px]">
                                <Image 
                                    src={imageUrl} 
                                    alt={caption || 'Image'}
                                    className="object-cover rounded"
                                    fill={true}
                                />
                            </div>
                        )}
                        {caption && <p className="caption text-sm text-gray-600 mt-2 text-center">{caption}</p>}
                    </div>
                );

            case 'image_gallery':
                return <ImageGallery key={id} images={block.images} />;

            case 'divider':
                return <hr key={id} className="my-8 border-b-2 border-orange dark:border-green" />;

            default:
                return (
                    <div key={id} className="mb-4 p-2 bg-gray-50 rounded text-sm">
                        <strong>Unsupported block type: {type}</strong>
                        <pre className="mt-2 text-xs overflow-x-auto">
                            {JSON.stringify(block, null, 2)}
                        </pre>
                    </div>
                );
        }
    };