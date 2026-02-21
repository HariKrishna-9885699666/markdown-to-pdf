import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function DropZone({ children }: { children: React.ReactNode }) {
  const [dragging, setDragging] = useState(false);
  const { setMarkdown } = useEditorStore();
  const { toast } = useToast();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: 'File too large', description: 'Max 5 MB.', variant: 'destructive' });
        return;
      }
      if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
        toast({ title: 'Invalid file', description: 'Only .md and .txt.', variant: 'destructive' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          setMarkdown(ev.target.result);
          toast({ title: 'File loaded', description: file.name });
        }
      };
      reader.readAsText(file);
    },
    [setMarkdown, toast]
  );

  return (
    <div
      className="relative h-full"
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {children}
      {dragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm border-2 border-dashed border-primary rounded-lg">
          <div className="flex flex-col items-center gap-2 text-primary">
            <Upload className="w-10 h-10" />
            <p className="font-medium">Drop your .md or .txt file here</p>
          </div>
        </div>
      )}
    </div>
  );
}
