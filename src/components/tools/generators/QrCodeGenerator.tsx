import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function QrCodeGenerator() {
  const [text, setText] = useState('');

  const generateQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">QR Code Generator</h1>
              <p className="text-sm text-slate-400">Generate QR codes from text or URLs</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to encode..."
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {text && (
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg">
              <img src={generateQrUrl(text)} alt="QR Code" className="w-72 h-72" />
            </div>
            <a
              href={generateQrUrl(text)}
              download="qrcode.png"
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
