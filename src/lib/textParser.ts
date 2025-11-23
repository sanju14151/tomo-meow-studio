export interface ParsedContent {
  type: 'heading' | 'code' | 'table' | 'text';
  content: string;
  level?: number;
  language?: string;
  rows?: string[][];
}

export function parseText(text: string): ParsedContent[] {
  if (!text.trim()) return [];
  
  const lines = text.split('\n');
  const result: ParsedContent[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check for headings (# Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      result.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      i++;
      continue;
    }

    // Check for code blocks (```language)
    const codeStartMatch = line.match(/^```(\w+)?$/);
    if (codeStartMatch) {
      const language = codeStartMatch[1] || 'plaintext';
      const codeLines: string[] = [];
      i++;
      
      while (i < lines.length && !lines[i].match(/^```$/)) {
        codeLines.push(lines[i]);
        i++;
      }
      
      result.push({
        type: 'code',
        language,
        content: codeLines.join('\n'),
      });
      i++; // Skip closing ```
      continue;
    }

    // Check for tables (| col1 | col2 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [line];
      i++;
      
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      
      const rows = tableLines
        .filter(l => !l.match(/^\|[\s-:|]+\|$/)) // Filter separator lines
        .map(l => 
          l.split('|')
            .slice(1, -1)
            .map(cell => cell.trim())
        );
      
      if (rows.length > 0) {
        result.push({
          type: 'table',
          content: '',
          rows,
        });
      }
      continue;
    }

    // Regular text
    if (line.trim()) {
      result.push({
        type: 'text',
        content: line,
      });
    }
    i++;
  }

  return result;
}
