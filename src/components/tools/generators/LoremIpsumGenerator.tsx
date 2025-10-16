import { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

const LOREM_TEXT = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';

export function LoremIpsumGenerator() {
  const [text, setText] = useState('');
  const [paragraphs, setParagraphs] = useState(3);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const words = LOREM_TEXT.split(' ');
    let result = '';

    for (let i = 0; i < paragraphs; i++) {
      const sentenceCount = Math.floor(Math.random() * 3) + 3;
      let paragraph = '';

      for (let j = 0; j < sentenceCount; j++) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        let sentence = '';

        for (let k = 0; k < wordCount; k++) {
          const word = words[Math.floor(Math.random() * words.length)];
          sentence += (k === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
        }

        paragraph += sentence.trim() + '. ';
      }

      result += paragraph.trim() + '\n\n';
    }

    setText(result.trim());
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Lorem Ipsum Generator</h1>
              <p className="text-sm text-slate-400">Generate placeholder text</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-slate-300">Paragraphs:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(+e.target.value)}
            className="w-20 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={generate}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            Generate
          </button>
        </div>

        {text && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-300">Generated Text</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
              </button>
            </div>
            <textarea
              value={text}
              readOnly
              className="w-full h-96 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm resize-none leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
