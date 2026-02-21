import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportModal } from './ExportModal';

export function ExportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        className="h-8 gap-1.5 text-xs"
        onClick={() => setOpen(true)}
      >
        <Download className="w-3.5 h-3.5" />
        Export PDF
      </Button>
      <ExportModal open={open} onOpenChange={setOpen} />
    </>
  );
}
