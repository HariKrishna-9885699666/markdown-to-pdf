import { useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FileUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setMarkdown } = useEditorStore();
  const { toast } = useToast();

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: 'File too large', description: 'Max file size is 5 MB.', variant: 'destructive' });
        return;
      }
      if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
        toast({ title: 'Invalid file type', description: 'Only .md and .txt files are supported.', variant: 'destructive' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setMarkdown(text);
          toast({ title: 'File loaded', description: file.name });
        }
      };
      reader.readAsText(file);
    },
    [setMarkdown, toast]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = '';
    },
    [handleFile]
  );

  return (
    <>
      <input ref={inputRef} type="file" accept=".md,.txt" className="hidden" onChange={handleChange} />
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Open</span>
      </Button>
    </>
  );
}
