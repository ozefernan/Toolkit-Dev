import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../store/useAppStore';
import { fetchDocIndex, searchDocs } from '../../services/docs/devdocs';
import { cache } from '../../services/cache/db';
import { Loader2, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { DocEntry } from '../../types';

export function DocBrowser() {
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setCurrentDocPath = useAppStore((state) => state.setCurrentDocPath);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set([''])); // Empty string for ungrouped

  const { data: docIndex, isLoading, error } = useQuery({
    queryKey: ['doc-index', selectedLanguage?.slug],
    queryFn: async () => {
      if (!selectedLanguage) return null;

      console.log('Fetching doc index for:', selectedLanguage.slug);

      // Try cache first
      const cacheKey = selectedLanguage.slug;
      const cached = await cache.get('docIndexes', cacheKey);
      if (cached) {
        console.log('Found in cache:', cacheKey);
        return cached;
      }

      // Fetch from API
      console.log('Fetching from API:', selectedLanguage.slug);
      const index = await fetchDocIndex(selectedLanguage.slug);
      console.log('Fetched entries:', index.entries.length);

      // Cache for 7 days
      await cache.set('docIndexes', cacheKey, index, 7 * 24 * 60 * 60 * 1000);

      return index;
    },
    enabled: !!selectedLanguage,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const filteredEntries = useMemo(() => {
    if (!docIndex?.entries) return [];
    if (!searchQuery.trim()) return docIndex.entries.slice(0, 100); // Show first 100 when no search

    return searchDocs(docIndex.entries, searchQuery, 100);
  }, [docIndex, searchQuery]);

  // Group entries by type or category
  const groupedEntries = useMemo(() => {
    const groups: Record<string, DocEntry[]> = {};

    filteredEntries.forEach((entry) => {
      const groupName = entry.type || 'Other';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(entry);
    });

    return groups;
  }, [filteredEntries]);

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  if (!selectedLanguage) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading index...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-destructive text-sm mb-1">Error Loading Index</p>
              <p className="text-xs text-slate-400">{(error as Error).message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('DocIndex:', docIndex);
  console.log('FilteredEntries:', filteredEntries.length);

  const groupNames = Object.keys(groupedEntries).sort();
  const shouldGroup = !searchQuery && groupNames.length > 1;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {searchQuery ? 'Search Results' : 'Browse Documentation'}
        </h3>
        <p className="text-xs text-slate-500">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'item' : 'items'}
          {shouldGroup && ` in ${groupNames.length} ${groupNames.length === 1 ? 'category' : 'categories'}`}
        </p>
      </div>
      <div className="space-y-1">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-slate-400">
              {searchQuery ? 'No results found' : 'No documentation available'}
            </p>
          </div>
        ) : shouldGroup ? (
          // Grouped view
          groupNames.map((groupName) => {
            const isExpanded = expandedGroups.has(groupName);
            const entries = groupedEntries[groupName];

            return (
              <div key={groupName} className="mb-2">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800/30 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="flex-1 text-left">{groupName}</span>
                  <span className="text-xs text-slate-500">({entries.length})</span>
                </button>

                {/* Group Items */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {entries.map((entry) => (
                      <button
                        key={entry.path}
                        onClick={() => setCurrentDocPath(entry.path)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-800/50 active:bg-slate-800/70 transition-all flex items-start gap-3 group border border-transparent hover:border-slate-700/50"
                      >
                        <FileText className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-200 truncate group-hover:text-primary transition-colors">
                            {entry.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          // Flat view (when searching or only one group)
          filteredEntries.map((entry) => (
            <button
              key={entry.path}
              onClick={() => setCurrentDocPath(entry.path)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800/50 active:bg-slate-800/70 transition-all flex items-start gap-3 group border border-transparent hover:border-slate-700/50"
            >
              <FileText className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-200 truncate group-hover:text-primary transition-colors">
                  {entry.name}
                </div>
                {entry.type && (
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">{entry.type}</div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
