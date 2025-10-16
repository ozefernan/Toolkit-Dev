import { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

export function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbColor = hexToRgb(newHex);
    if (rgbColor) {
      setRgb(rgbColor);
      setHsl(rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbColor = hslToRgb(h, s, l);
    setRgb(rgbColor);
    setHex(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b));
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
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Color Converter</h1>
              <p className="text-sm text-slate-400">Convert between HEX, RGB, and HSL</p>
            </div>
          </div>
        </div>

        {/* Color Preview */}
        <div className="mb-8">
          <div
            className="w-full h-40 rounded-lg border-4 border-slate-700"
            style={{ backgroundColor: hex }}
          />
        </div>

        {/* Color Formats */}
        <div className="space-y-6">
          {/* HEX */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-300">HEX</label>
              <button
                onClick={() => copyToClipboard(hex, 'hex')}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied === 'hex' ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
              </button>
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* RGB */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-300">RGB</label>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied === 'rgb' ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">R</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb(+e.target.value, rgb.g, rgb.b)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">G</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb(rgb.r, +e.target.value, rgb.b)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">B</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb(rgb.r, rgb.g, +e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* HSL */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-300">HSL</label>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied === 'hsl' ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">H</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl(+e.target.value, hsl.s, hsl.l)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">S</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl(hsl.h, +e.target.value, hsl.l)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">L</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl(hsl.h, hsl.s, +e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
