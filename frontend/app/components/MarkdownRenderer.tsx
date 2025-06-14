'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="mb-2 leading-relaxed break-words" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-1" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1 break-words" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-500 underline break-words inline-block" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
          code: ({ inline, className, ...props }: { inline?: boolean; className?: string; [key: string]: any }) => 
            inline ? 
              <code className={`bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded ${className || ''}`} {...props} /> : 
              <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-x-auto my-2 text-xs"><code className={className} {...props} /></pre>,
          table: ({ node, ...props }) => <div className="overflow-x-auto my-2"><table className="min-w-full border-collapse" {...props} /></div>,
          th: ({ node, ...props }) => <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 bg-gray-100 dark:bg-gray-800" {...props} />,
          td: ({ node, ...props }) => <td className="border border-gray-300 dark:border-gray-700 px-2 py-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 