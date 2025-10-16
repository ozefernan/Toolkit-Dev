// Documentation types
export interface DocEntry {
  name: string;
  path: string;
  type: string;
}

export interface DocIndex {
  entries: DocEntry[];
}

export interface DocContent {
  title: string;
  html: string;
  path: string;
}

export interface Language {
  name: string;
  slug: string;
  type: string;
  version?: string;
  links: {
    home: string;
    code?: string;
  };
}

// Search types
export interface SearchResult {
  title: string;
  path: string;
  language: string;
  snippet?: string;
  score?: number;
}

// Playground types
export interface CodeFile {
  name: string;
  language: string;
  value: string;
}

export interface PlaygroundState {
  files: CodeFile[];
  activeFile: string;
  output?: string;
  error?: string;
}

// Cache types
export interface CacheEntry<T> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
}
