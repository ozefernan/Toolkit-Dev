import { create } from 'zustand';
import type { Language, DocEntry } from '../types';

interface AppState {
  // Selected language
  selectedLanguage: Language | null;
  setSelectedLanguage: (language: Language | null) => void;

  // Documentation
  docEntries: DocEntry[];
  setDocEntries: (entries: DocEntry[]) => void;

  // Current doc path
  currentDocPath: string | null;
  setCurrentDocPath: (path: string | null) => void;

  // Search query
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Active tool
  activeTool: 'home' | 'docs' | 'playground' | 'tools';
  setActiveTool: (tool: 'home' | 'docs' | 'playground' | 'tools') => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Language
  selectedLanguage: null,
  setSelectedLanguage: (language) => set({
    selectedLanguage: language,
    currentDocPath: null, // Reset current doc when changing language
    searchQuery: '', // Reset search when changing language
  }),

  // Documentation
  docEntries: [],
  setDocEntries: (entries) => set({ docEntries: entries }),

  // Current doc
  currentDocPath: null,
  setCurrentDocPath: (path) => set({ currentDocPath: path }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // UI
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Active tool
  activeTool: 'home',
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
