import { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/store/editorStore';

export function EditorPane() {
  const { markdown, setMarkdown } = useEditorStore();

  const handleChange = useCallback(
    (value: string | undefined) => {
      setMarkdown(value ?? '');
    },
    [setMarkdown]
  );

  return (
    <div className="h-full w-full bg-editor-bg">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={markdown}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineHeight: 22,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'gutter',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          bracketPairColorization: { enabled: true },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
