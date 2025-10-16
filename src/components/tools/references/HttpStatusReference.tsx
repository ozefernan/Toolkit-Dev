import { useState } from 'react';
import { Server } from 'lucide-react';

const HTTP_CODES = [
  { code: 200, name: 'OK', description: 'Request succeeded' },
  { code: 201, name: 'Created', description: 'Resource created successfully' },
  { code: 204, name: 'No Content', description: 'Success but no content to return' },
  { code: 301, name: 'Moved Permanently', description: 'Resource permanently moved' },
  { code: 302, name: 'Found', description: 'Temporary redirect' },
  { code: 304, name: 'Not Modified', description: 'Resource not modified' },
  { code: 400, name: 'Bad Request', description: 'Invalid request syntax' },
  { code: 401, name: 'Unauthorized', description: 'Authentication required' },
  { code: 403, name: 'Forbidden', description: 'Access denied' },
  { code: 404, name: 'Not Found', description: 'Resource not found' },
  { code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded' },
  { code: 500, name: 'Internal Server Error', description: 'Server error occurred' },
  { code: 502, name: 'Bad Gateway', description: 'Invalid response from upstream' },
  { code: 503, name: 'Service Unavailable', description: 'Service temporarily unavailable' },
];

export function HttpStatusReference() {
  const [search, setSearch] = useState('');

  const filtered = HTTP_CODES.filter(
    (item) =>
      item.code.toString().includes(search) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const getColor = (code: number) => {
    if (code < 300) return 'bg-green-500/10 border-green-500/30 text-green-400';
    if (code < 400) return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    if (code < 500) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-red-500/10 border-red-500/30 text-red-400';
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">HTTP Status Codes</h1>
              <p className="text-sm text-slate-400">Common HTTP status codes reference</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search status codes..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-3">
          {filtered.map((item) => (
            <div
              key={item.code}
              className={`border-2 rounded-lg p-4 ${getColor(item.code)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{item.code}</span>
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
