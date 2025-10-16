import { useState } from 'react';
import { FileText } from 'lucide-react';

export function MarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nThis is **Markdown**!\n\n- Item 1\n- Item 2\n- Item 3\n\n```javascript\nconst hello = "world";\n```');

  // Simple markdown to HTML converter
  const markdownToHtml = (md: string) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-200 mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-100 mt-10 mb-6">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-100">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-300">$1</em>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-slate-900 border border-slate-700 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-slate-300 font-mono">$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded text-sm font-mono">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc text-slate-300">$1</li>');
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-slate-300">$1</li>');

    // Paragraphs
    html = html.replace(/\n\n/gim, '</p><p class="mb-4 text-slate-300 leading-relaxed">');
    html = '<p class="mb-4 text-slate-300 leading-relaxed">' + html + '</p>';

    return html;
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Markdown Preview</h1>
              <p className="text-sm text-slate-400">Write markdown and see it rendered in real-time</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Markdown</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="# Enter markdown here..."
              className="w-full h-[600px] bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Preview</label>
            <div
              className="w-full h-[600px] bg-slate-900 border border-slate-700 rounded-lg p-6 overflow-auto prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(input) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
