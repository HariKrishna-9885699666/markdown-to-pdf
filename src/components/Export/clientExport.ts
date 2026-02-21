import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { PageSize, Margin, Theme } from '@/store/editorStore';

const PAGE_DIMENSIONS: Record<PageSize, { w: number; h: number }> = {
  A4: { w: 210, h: 297 },
  Letter: { w: 215.9, h: 279.4 },
  A3: { w: 297, h: 420 },
};

const MARGIN_VALUES: Record<Margin, number> = {
  none: 0,
  narrow: 10,
  normal: 20,
  wide: 30,
};

const PRINT_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, html { background: #fff; }
  .print-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1a1a2e;
    background: #ffffff;
    padding: 48px;
    line-height: 1.7;
    font-size: 15px;
    max-width: 800px;
  }
  h1 { font-size: 2em; font-weight: 700; margin: 1.2em 0 0.5em; padding-bottom: 0.3em; border-bottom: 2px solid #e2e8f0; color: #0f172a; }
  h2 { font-size: 1.5em; font-weight: 600; margin: 1em 0 0.4em; padding-bottom: 0.25em; border-bottom: 1px solid #e2e8f0; color: #0f172a; }
  h3 { font-size: 1.25em; font-weight: 600; margin: 0.8em 0 0.3em; color: #0f172a; }
  h4, h5, h6 { font-weight: 600; margin: 0.6em 0 0.2em; color: #0f172a; }
  p { margin-bottom: 1em; line-height: 1.75; color: #334155; }
  a { color: #0d9488; text-decoration: underline; }
  ul { list-style: disc; padding-left: 1.5em; margin-bottom: 1em; }
  ol { list-style: decimal; padding-left: 1.5em; margin-bottom: 1em; }
  li { margin-bottom: 0.35em; line-height: 1.75; color: #334155; }
  blockquote { border-left: 4px solid #0d9488; padding-left: 1em; margin: 1em 0; color: #64748b; font-style: italic; }
  code:not(pre code) { background: #f1f5f9; color: #0d9488; padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.9em; }
  pre { background: #1e293b !important; color: #e2e8f0; padding: 16px; border-radius: 8px; margin: 1em 0; overflow-x: auto; font-size: 0.875em; line-height: 1.6; }
  pre code { font-family: 'JetBrains Mono', 'Fira Code', monospace; background: transparent !important; color: inherit; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 1em 0; }
  th { background: #f1f5f9; font-weight: 600; text-align: left; padding: 10px 14px; border: 1px solid #e2e8f0; color: #0f172a; }
  td { padding: 10px 14px; border: 1px solid #e2e8f0; color: #334155; }
  tr:nth-child(even) { background: #f8fafc; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 2em 0; }
  img { max-width: 100%; border-radius: 8px; margin: 1em 0; }
  input[type="checkbox"] { margin-right: 8px; accent-color: #0d9488; }
  strong { color: #0f172a; }

  /* Syntax highlighting for print */
  .hljs-keyword { color: #c678dd; }
  .hljs-string { color: #98c379; }
  .hljs-number { color: #d19a66; }
  .hljs-function { color: #61afef; }
  .hljs-title { color: #61afef; }
  .hljs-params { color: #e06c75; }
  .hljs-comment { color: #5c6370; font-style: italic; }
  .hljs-built_in { color: #e6c07b; }
  .hljs-type { color: #e6c07b; }
  .hljs-attr { color: #d19a66; }
  .hljs-variable { color: #e06c75; }
`;

export async function clientExport({
  pageSize,
  margin,
}: {
  pageSize: PageSize;
  margin: Margin;
}) {
  const previewEl = document.getElementById('preview-content');
  if (!previewEl) return;

  // Wait for fonts
  await document.fonts.ready;

  // Create a print-friendly clone with white background + dark text
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.background = '#ffffff';

  // Inject print stylesheet
  const style = document.createElement('style');
  style.textContent = PRINT_CSS;
  container.appendChild(style);

  // Clone the rendered markdown content
  const contentClone = previewEl.querySelector('.markdown-preview')?.cloneNode(true) as HTMLElement;
  if (!contentClone) return;

  contentClone.className = 'print-root';
  container.appendChild(contentClone);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
    });

    const { w: pageW, h: pageH } = PAGE_DIMENSIONS[pageSize];
    const m = MARGIN_VALUES[margin];
    const contentW = pageW - 2 * m;
    const contentH = pageH - 2 * m;

    const imgW = contentW;
    const imgH = (canvas.height * imgW) / canvas.width;
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pageW, pageH],
    });

    let heightLeft = imgH;
    let position = 0;

    pdf.addImage(imgData, 'PNG', m, m + position, imgW, imgH);
    heightLeft -= contentH;

    while (heightLeft > 0) {
      position -= contentH;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', m, m + position, imgW, imgH);
      heightLeft -= contentH;
    }

    const h1 = previewEl.querySelector('h1');
    const filename = h1?.textContent?.trim() || 'document';
    pdf.save(`${filename}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
