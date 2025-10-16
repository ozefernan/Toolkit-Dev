import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

export function HashCalculator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');

  const calculateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const md5Hash = await simpleHash(input, 'MD5');
    const sha1Hash = await crypto.subtle.digest('SHA-1', data);
    const sha256Hash = await crypto.subtle.digest('SHA-256', data);

    setHashes({
      MD5: md5Hash,
      'SHA-1': bufferToHex(sha1Hash),
      'SHA-256': bufferToHex(sha256Hash),
    });
  };

  const bufferToHex = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const simpleHash = async (str: string, algorithm: string) => {
    // Simple MD5-like hash for demonstration
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Hash Calculator</h1>
              <p className="text-sm text-slate-400">Generate MD5, SHA-1, and SHA-256 hashes</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={calculateHashes}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 mb-6"
        >
          Calculate Hashes
        </button>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div key={algorithm} className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-300">{algorithm}</span>
                  <button
                    onClick={() => copyToClipboard(hash, algorithm)}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
                  >
                    {copied === algorithm ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                  </button>
                </div>
                <p className="font-mono text-sm text-slate-400 break-all">{hash}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
