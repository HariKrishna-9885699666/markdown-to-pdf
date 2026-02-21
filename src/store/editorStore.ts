import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'default' | 'github' | 'academic' | 'dark';
export type PageSize = 'A4' | 'Letter' | 'A3';
export type Margin = 'none' | 'narrow' | 'normal' | 'wide';
export type ViewMode = 'split' | 'editor' | 'preview';

interface EditorState {
  markdown: string;
  theme: Theme;
  pageSize: PageSize;
  margin: Margin;
  viewMode: ViewMode;
  setMarkdown: (md: string) => void;
  setTheme: (t: Theme) => void;
  setPageSize: (p: PageSize) => void;
  setMargin: (m: Margin) => void;
  setViewMode: (v: ViewMode) => void;
}

const DEFAULT_MARKDOWN = `# Welcome to MDtoPDF

A beautiful **Markdown to PDF** converter. Start typing or paste your markdown here.

## Features

- ✨ Live preview as you type
- 📄 Export to PDF with one click
- 🎨 Multiple themes to choose from
- 📁 Drag & drop \`.md\` files

## Code Example

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| Live Preview | ✅ Done |
| PDF Export | ✅ Done |
| Themes | ✅ Done |
| File Upload | ✅ Done |

## Blockquote

> "Simplicity is the ultimate sophistication."

## Task List

- [x] Write markdown
- [x] Preview in real-time
- [ ] Export to PDF

---
`;

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      markdown: DEFAULT_MARKDOWN,
      theme: 'default',
      pageSize: 'A4',
      margin: 'normal',
      viewMode: 'split',
      setMarkdown: (markdown) => set({ markdown }),
      setTheme: (theme) => set({ theme }),
      setPageSize: (pageSize) => set({ pageSize }),
      setMargin: (margin) => set({ margin }),
      setViewMode: (viewMode) => set({ viewMode }),
    }),
    { name: 'mdtopdf-editor' }
  )
);
