import { useState } from 'react';
import { Key } from 'lucide-react';

export function JwtDecoder() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');

  const decode = () => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setDecoded({ header, payload });
      setError('');
    } catch (err) {
      setError('Invalid JWT token');
      setDecoded(null);
    }
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
              <h1 className="text-2xl font-bold text-slate-100">JWT Decoder</h1>
              <p className="text-sm text-slate-400">Decode and inspect JWT tokens</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">JWT Token</label>
          <textarea
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            placeholder="Paste JWT token here..."
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={decode}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 mb-6"
        >
          Decode JWT
        </button>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {decoded && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Header</h3>
              <pre className="text-sm text-slate-400 font-mono overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Payload</h3>
              <pre className="text-sm text-slate-400 font-mono overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
