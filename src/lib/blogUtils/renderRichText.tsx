import { NotionRichText } from "@/types/notion";

// Function to render rich text with annotations and hyperlinks
export const renderRichText = (richTextArray: NotionRichText[]) => {
    return richTextArray.map((text, index) => {
        let content = text.plain_text;
        
        const annotations = text.annotations;
        let className = '';
        
        if (annotations?.bold) className += ' font-bold';
        if (annotations?.italic) className += ' italic';
        if (annotations?.underline) className += ' underline';
        if (annotations?.strikethrough) className += ' line-through';
        if (annotations?.code) className += ' bg-gray-100 px-1 rounded text-sm font-mono';
        
        if (annotations?.color && annotations.color !== 'default') {
            const colorMap: { [key: string]: string } = {
                gray: 'text-gray-600',
                brown: 'text-amber-800',
                orange: 'text-orange-600',
                yellow: 'text-yellow-600',
                green: 'text-green-600',
                blue: 'text-blue-600',
                purple: 'text-purple-600',
                pink: 'text-pink-600',
                red: 'text-red-600',
            };
            className += ` ${colorMap[annotations.color] || ''}`;
        }
        
        if (text.href) {
            return (
                <a 
                    key={index} 
                    href={text.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-orange hover:text-orangeDark dark:text-green dark:hover:text-greenDark underline${className}`}
                >
                    {content}
                </a>
            );
        }
        
        return (
            <span key={index} className={className.trim()}>
                {content}
            </span>
        );
    });
};