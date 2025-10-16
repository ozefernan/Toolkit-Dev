import { useState } from 'react';
import { Code2 } from 'lucide-react';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const results = testString.match(regex);
      setMatches(results || []);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
    }
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Regex Tester</h1>
              <p className="text-sm text-slate-400">Test regular expressions</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m..."
              className="w-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={test}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            Test Regex
          </button>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {matches.length > 0 && (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Matches ({matches.length})
              </h3>
              <div className="space-y-2">
                {matches.map((match, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-2 rounded font-mono text-sm text-green-400">
                    {match}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!error && matches.length === 0 && testString && pattern && (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-400">No matches found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
