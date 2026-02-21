import { Columns2, PanelLeft, PanelRight } from 'lucide-react';
import { useEditorStore, ViewMode } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const modes: { value: ViewMode; icon: React.ReactNode; label: string }[] = [
  { value: 'editor', icon: <PanelLeft className="w-4 h-4" />, label: 'Editor only' },
  { value: 'split', icon: <Columns2 className="w-4 h-4" />, label: 'Split view' },
  { value: 'preview', icon: <PanelRight className="w-4 h-4" />, label: 'Preview only' },
];

export function ViewToggle() {
  const { viewMode, setViewMode } = useEditorStore();

  return (
    <div className="flex items-center bg-secondary rounded-md p-0.5">
      {modes.map(({ value, icon, label }) => (
        <Tooltip key={value}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setViewMode(value)}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === value
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
