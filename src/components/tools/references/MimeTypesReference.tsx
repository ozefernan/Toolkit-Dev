import { useState } from 'react';
import { FileJson } from 'lucide-react';

const MIME_TYPES = [
  { type: 'application/json', extension: '.json', description: 'JSON data' },
  { type: 'application/pdf', extension: '.pdf', description: 'PDF document' },
  { type: 'application/zip', extension: '.zip', description: 'ZIP archive' },
  { type: 'text/html', extension: '.html', description: 'HTML document' },
  { type: 'text/css', extension: '.css', description: 'CSS stylesheet' },
  { type: 'text/javascript', extension: '.js', description: 'JavaScript file' },
  { type: 'text/plain', extension: '.txt', description: 'Plain text' },
  { type: 'image/png', extension: '.png', description: 'PNG image' },
  { type: 'image/jpeg', extension: '.jpg', description: 'JPEG image' },
  { type: 'image/gif', extension: '.gif', description: 'GIF image' },
  { type: 'image/svg+xml', extension: '.svg', description: 'SVG vector image' },
  { type: 'video/mp4', extension: '.mp4', description: 'MP4 video' },
  { type: 'audio/mpeg', extension: '.mp3', description: 'MP3 audio' },
];

export function MimeTypesReference() {
  const [search, setSearch] = useState('');

  const filtered = MIME_TYPES.filter(
    (item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.extension.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileJson className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">MIME Types</h1>
              <p className="text-sm text-slate-400">Common MIME type reference</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search MIME types..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-mono text-primary">{item.type}</span>
                <span className="text-sm font-semibold text-slate-400">{item.extension}</span>
              </div>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
