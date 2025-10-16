import { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const SNIPPETS = {
  'Git Commands': [
    { name: 'Clone repository', code: 'git clone <repository-url>' },
    { name: 'Create branch', code: 'git checkout -b <branch-name>' },
    { name: 'Commit changes', code: 'git add .\ngit commit -m "message"' },
    { name: 'Push to remote', code: 'git push origin <branch-name>' },
    { name: 'Pull latest changes', code: 'git pull origin main' },
    { name: 'Merge branch', code: 'git checkout main\ngit merge <branch-name>' },
    { name: 'Undo last commit', code: 'git reset --soft HEAD~1' },
    { name: 'View commit history', code: 'git log --oneline' },
  ],
  'Docker Commands': [
    { name: 'Build image', code: 'docker build -t <image-name> .' },
    { name: 'Run container', code: 'docker run -d -p 8080:80 <image-name>' },
    { name: 'List containers', code: 'docker ps -a' },
    { name: 'Stop container', code: 'docker stop <container-id>' },
    { name: 'Remove container', code: 'docker rm <container-id>' },
    { name: 'List images', code: 'docker images' },
    { name: 'Remove image', code: 'docker rmi <image-id>' },
    { name: 'View logs', code: 'docker logs <container-id>' },
    { name: 'Docker Compose up', code: 'docker-compose up -d' },
    { name: 'Docker Compose down', code: 'docker-compose down' },
  ],
  'NPM/Yarn Commands': [
    { name: 'Install dependencies', code: 'npm install\n# or\nyarn install' },
    { name: 'Add package', code: 'npm install <package>\n# or\nyarn add <package>' },
    { name: 'Add dev dependency', code: 'npm install -D <package>\n# or\nyarn add -D <package>' },
    { name: 'Remove package', code: 'npm uninstall <package>\n# or\nyarn remove <package>' },
    { name: 'Run script', code: 'npm run <script>\n# or\nyarn <script>' },
    { name: 'Update packages', code: 'npm update\n# or\nyarn upgrade' },
  ],
  'Algorithms': [
    {
      name: 'Binary Search',
      code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    },
    {
      name: 'Quicksort',
      code: `function quicksort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  return [...quicksort(left), pivot, ...quicksort(right)];
}`,
    },
  ],
  'Design Patterns': [
    {
      name: 'Singleton',
      code: `class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}`,
    },
    {
      name: 'Factory',
      code: `class Factory {
  static create(type) {
    switch(type) {
      case 'A': return new ProductA();
      case 'B': return new ProductB();
      default: throw new Error('Unknown type');
    }
  }
}`,
    },
  ],
};

export function CodeSnippets() {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(SNIPPETS)[0]);
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (code: string, name: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Code Snippets</h1>
              <p className="text-sm text-slate-400">Useful code snippets and commands</p>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(SNIPPETS).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Snippets */}
        <div className="grid md:grid-cols-2 gap-4">
          {SNIPPETS[selectedCategory as keyof typeof SNIPPETS].map((snippet, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-200">{snippet.name}</h3>
                <button
                  onClick={() => copyToClipboard(snippet.code, snippet.name)}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
                >
                  {copied === snippet.name ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-950 border border-slate-800 rounded p-3 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono">{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
