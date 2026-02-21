import { Palette } from 'lucide-react';
import { useEditorStore, Theme } from '@/store/editorStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const themes: { value: Theme; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'github', label: 'GitHub' },
  { value: 'academic', label: 'Academic' },
  { value: 'dark', label: 'Minimal Dark' },
];

export function ThemeSelector() {
  const { theme, setTheme } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{themes.find(t => t.value === theme)?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(t => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={theme === t.value ? 'text-primary' : ''}
          >
            {t.label}
            {theme === t.value && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
