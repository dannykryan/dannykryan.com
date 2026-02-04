import type { TOCItem } from '@/types/blog';

// Render table of contents component
export const renderTableOfContents = (tableOfContents: TOCItem[]) => {
    if (tableOfContents.length === 0) return null;
    
    return (
        <nav className="toc bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8 border-l-4 border-orange dark:border-green">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
                {tableOfContents.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`}
                            className="text-orange hover:text-orangeDark dark:text-green dark:hover:text-greenDark hover:underline transition-colors"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};