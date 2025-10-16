import { useState } from 'react';
import { Lock, Copy, Check, RefreshCw } from 'lucide-react';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Password Generator</h1>
              <p className="text-sm text-slate-400">Generate secure random passwords</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(+e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-300">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-300">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-300">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-300">Symbols (!@#$%...)</span>
            </label>
          </div>

          <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 w-full justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Password
          </button>

          {password && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Generated Password</label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
                >
                  {copied ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-lg text-slate-100 break-all">
                {password}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
