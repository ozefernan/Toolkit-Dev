import { useState } from 'react';
import { Copy } from 'lucide-react';

export function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const getDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);

    const diff = [];
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 !== line2) {
        diff.push({
          lineNum: i + 1,
          type: !line1 ? 'added' : !line2 ? 'removed' : 'modified',
          old: line1,
          new: line2,
        });
      }
    }

    return diff;
  };

  const diff = getDiff();

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Diff Checker</h1>
              <p className="text-sm text-slate-400">Compare two texts</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text..."
              className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text..."
              className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {diff.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              Differences ({diff.length} changes)
            </h3>
            <div className="space-y-3">
              {diff.map((change, idx) => (
                <div key={idx} className="border border-slate-700 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-500">Line {change.lineNum}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        change.type === 'added'
                          ? 'bg-green-500/20 text-green-400'
                          : change.type === 'removed'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {change.type}
                    </span>
                  </div>
                  {change.old && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2 mb-1">
                      <span className="text-xs text-red-400">- </span>
                      <span className="text-sm text-slate-300 font-mono">{change.old}</span>
                    </div>
                  )}
                  {change.new && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                      <span className="text-xs text-green-400">+ </span>
                      <span className="text-sm text-slate-300 font-mono">{change.new}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {diff.length === 0 && text1 && text2 && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-sm text-green-400">Texts are identical</p>
          </div>
        )}
      </div>
    </div>
  );
}
