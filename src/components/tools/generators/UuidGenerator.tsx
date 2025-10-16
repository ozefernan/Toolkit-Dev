import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid());
    setUuids(newUuids);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">UUID Generator</h1>
              <p className="text-sm text-slate-400">Generate universally unique identifiers (v4)</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-300">Count:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, +e.target.value)))}
              className="w-20 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>

        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300">Generated UUIDs</label>
              <button
                onClick={copyAll}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy All</>}
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, idx) => (
                <div
                  key={idx}
                  className="font-mono text-sm text-slate-300 bg-slate-800/50 p-2 rounded"
                >
                  {uuid}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
