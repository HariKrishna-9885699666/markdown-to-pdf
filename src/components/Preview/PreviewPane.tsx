import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';
import { useEditorStore } from '@/store/editorStore';
import 'highlight.js/styles/github-dark.css';

export function PreviewPane() {
  const { markdown, theme } = useEditorStore();

  return (
    <div className={`h-full overflow-auto bg-preview-bg theme-${theme}`}>
      <div className="max-w-3xl mx-auto p-8" id="preview-content">
        <div className="markdown-preview">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize, rehypeHighlight, rehypeSlug]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
