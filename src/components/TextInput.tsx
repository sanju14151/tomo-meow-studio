import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Input</h2>
        <p className="text-sm text-cement-gray mt-1">
          Enter your text with markdown formatting
        </p>
      </div>
      <div className="flex-1 p-6">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing your text here...

Examples:
# Heading 1
## Heading 2

```javascript
const hello = 'world';
```

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |"
          className="h-full min-h-[500px] resize-none font-mono text-sm border-border focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}
