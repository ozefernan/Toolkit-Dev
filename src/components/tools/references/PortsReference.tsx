import { useState } from 'react';
import { Server } from 'lucide-react';

const COMMON_PORTS = [
  { port: 20, name: 'FTP Data', description: 'File Transfer Protocol (Data)' },
  { port: 21, name: 'FTP', description: 'File Transfer Protocol (Control)' },
  { port: 22, name: 'SSH', description: 'Secure Shell' },
  { port: 23, name: 'Telnet', description: 'Telnet protocol' },
  { port: 25, name: 'SMTP', description: 'Simple Mail Transfer Protocol' },
  { port: 53, name: 'DNS', description: 'Domain Name System' },
  { port: 80, name: 'HTTP', description: 'Hypertext Transfer Protocol' },
  { port: 110, name: 'POP3', description: 'Post Office Protocol v3' },
  { port: 143, name: 'IMAP', description: 'Internet Message Access Protocol' },
  { port: 443, name: 'HTTPS', description: 'HTTP Secure' },
  { port: 3000, name: 'Dev Server', description: 'Common development server port' },
  { port: 3306, name: 'MySQL', description: 'MySQL database' },
  { port: 5432, name: 'PostgreSQL', description: 'PostgreSQL database' },
  { port: 6379, name: 'Redis', description: 'Redis data store' },
  { port: 8080, name: 'HTTP Alt', description: 'Alternative HTTP port' },
  { port: 27017, name: 'MongoDB', description: 'MongoDB database' },
];

export function PortsReference() {
  const [search, setSearch] = useState('');

  const filtered = COMMON_PORTS.filter(
    (item) =>
      item.port.toString().includes(search) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Port Numbers</h1>
              <p className="text-sm text-slate-400">Common network port reference</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ports..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-3">
          {filtered.map((item) => (
            <div
              key={item.port}
              className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-primary">{item.port}</span>
                <span className="text-sm font-semibold text-slate-300">{item.name}</span>
              </div>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
