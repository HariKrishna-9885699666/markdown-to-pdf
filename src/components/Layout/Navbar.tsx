import { FileText, Download, Upload } from 'lucide-react';
import { ViewToggle } from './ViewToggle';
import { ThemeSelector } from '../Theme/ThemeSelector';
import { ExportButton } from '../Export/ExportButton';
import { FileUploadButton } from '../FileUpload/FileUploadButton';

export function Navbar() {
  return (
    <header className="h-12 flex items-center justify-between px-4 bg-toolbar-bg border-b border-toolbar-border shrink-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm tracking-tight">
            MD<span className="text-primary">to</span>PDF
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <FileUploadButton />
        <ViewToggle />
        <ThemeSelector />
        <ExportButton />
      </div>
    </header>
  );
}
