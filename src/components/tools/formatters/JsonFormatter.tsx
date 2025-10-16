import { useState } from 'react';
import { FileJson, Copy, Check, AlertCircle } from 'lucide-react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileJson className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">JSON Formatter</h1>
              <p className="text-sm text-slate-400">Format and validate JSON data</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={formatJson}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Format (Pretty)
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Minify
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-destructive mb-1">Invalid JSON</h3>
                <p className="text-sm text-slate-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="w-full h-96 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">Output</label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="w-full h-96 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
