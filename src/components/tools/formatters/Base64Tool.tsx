import { useState } from 'react';
import { Key, Copy, Check } from 'lucide-react';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setOutput('Error: ' + (err as Error).message);
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setOutput('Error: Invalid Base64 string');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Base64 Encoder/Decoder</h1>
              <p className="text-sm text-slate-400">Encode and decode Base64 strings</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={encode}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            Encode
          </button>
          <button
            onClick={decode}
            className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700 border border-slate-700"
          >
            Decode
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or Base64 to decode..."
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">Output</label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
                >
                  {copied ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
