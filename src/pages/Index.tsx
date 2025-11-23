import { useState, useMemo } from "react";
import { TextInput } from "@/components/TextInput";
import { FormattedPreview } from "@/components/FormattedPreview";
import { ExportButton } from "@/components/ExportButton";
import { parseText } from "@/lib/textParser";

const Index = () => {
  const [inputText, setInputText] = useState("");

  const parsedContent = useMemo(() => {
    return parseText(inputText);
  }, [inputText]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">TOMO MEOW</h1>
            <p className="text-sm text-cement-gray mt-0.5">
              Premium Text Formatter
            </p>
          </div>
          <ExportButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-border">
        <TextInput value={inputText} onChange={setInputText} />
        <FormattedPreview parsedContent={parsedContent} />
      </div>
    </div>
  );
};

export default Index;
