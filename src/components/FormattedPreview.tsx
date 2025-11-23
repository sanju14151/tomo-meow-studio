import { ParsedContent } from '@/lib/textParser';

interface FormattedPreviewProps {
  parsedContent: ParsedContent[];
}

export function FormattedPreview({ parsedContent }: FormattedPreviewProps) {
  const renderContent = (item: ParsedContent, index: number) => {
    switch (item.type) {
      case 'heading':
        const HeadingTag = `h${item.level || 1}` as keyof JSX.IntrinsicElements;
        const headingClasses = [
          'font-bold text-foreground mb-4 mt-6',
          item.level === 1 && 'text-3xl',
          item.level === 2 && 'text-2xl',
          item.level === 3 && 'text-xl',
          item.level === 4 && 'text-lg',
          item.level === 5 && 'text-base',
          item.level === 6 && 'text-sm',
        ].filter(Boolean).join(' ');
        
        return (
          <HeadingTag key={index} className={headingClasses}>
            {item.content}
          </HeadingTag>
        );

      case 'code':
        return (
          <div key={index} className="my-4 rounded-lg overflow-hidden border border-code-border bg-code-bg">
            <div className="px-4 py-2 bg-cement-gray-light border-b border-code-border flex items-center justify-between">
              <span className="text-xs font-medium text-cement-gray uppercase tracking-wide">
                {item.language}
              </span>
            </div>
            <div className="overflow-x-auto">
              <pre className="m-0 p-4">
                <code className="text-sm font-mono text-foreground whitespace-pre">
                  {item.content}
                </code>
              </pre>
            </div>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-cement-gray-light">
                <tr>
                  {item.rows?.[0]?.map((header, i) => (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {item.rows?.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-muted transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 text-sm text-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'list':
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2 text-foreground">
            {item.items?.map((listItem, i) => (
              <li key={i} className="leading-relaxed">
                {listItem}
              </li>
            ))}
          </ul>
        );

      case 'text':
        return (
          <p key={index} className="text-foreground mb-4 leading-relaxed">
            {item.content}
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
        <p className="text-sm text-cement-gray mt-1">
          Formatted output with premium styling
        </p>
      </div>
      <div id="preview-content" className="flex-1 p-6 overflow-y-auto">
        {parsedContent.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-cement-gray text-center">
              Your formatted content will appear here...
            </p>
          </div>
        ) : (
          <div className="max-w-4xl">
            {parsedContent.map((item, index) => renderContent(item, index))}
          </div>
        )}
      </div>
    </div>
  );
}
