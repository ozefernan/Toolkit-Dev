import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Date.now().toString());
  const [date, setDate] = useState('');

  const timestampToDate = (ts: string) => {
    try {
      const d = new Date(parseInt(ts));
      return d.toLocaleString();
    } catch {
      return 'Invalid timestamp';
    }
  };

  const dateToTimestamp = (dateStr: string) => {
    try {
      return new Date(dateStr).getTime().toString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Timestamp Converter</h1>
              <p className="text-sm text-slate-400">Convert between Unix timestamps and dates</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Unix Timestamp</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="mt-2 text-sm text-slate-400">
              = {timestampToDate(timestamp)}
            </p>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Date/Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {date && (
              <p className="mt-2 text-sm text-slate-400">
                = {dateToTimestamp(date)} (Unix timestamp)
              </p>
            )}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-slate-300">
              <strong>Current timestamp:</strong> {Date.now()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
