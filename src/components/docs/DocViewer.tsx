import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../store/useAppStore';
import { fetchDocContent, fetchDocDatabase } from '../../services/docs/devdocs';
import { cache } from '../../services/cache/db';
import { Loader2, ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function DocViewer() {
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const currentDocPath = useAppStore((state) => state.currentDocPath);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position to show/hide scroll to top button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 400);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // First, load the complete database for the selected language
  const { data: database, isLoading: isDatabaseLoading } = useQuery({
    queryKey: ['doc-database', selectedLanguage?.slug],
    queryFn: async () => {
      if (!selectedLanguage) return null;

      console.log('Loading database for:', selectedLanguage.slug);

      // Try to get from cache first
      const cacheKey = selectedLanguage.slug;
      const cached = await cache.get<Record<string, string>>('docDatabases', cacheKey);
      if (cached) {
        console.log('Database found in cache:', cacheKey, 'with', Object.keys(cached).length, 'entries');
        return cached;
      }

      // Fetch from API
      console.log('Database not cached, fetching from API...');
      const db = await fetchDocDatabase(selectedLanguage.slug);

      // Cache for 30 days (databases don't change often)
      await cache.set('docDatabases', cacheKey, db, 30 * 24 * 60 * 60 * 1000);

      return db;
    },
    enabled: !!selectedLanguage,
    staleTime: Infinity, // Databases rarely change
    cacheTime: Infinity,
  });

  // Then, get the specific document content from the database
  const { data, isLoading, error } = useQuery({
    queryKey: ['doc-content', selectedLanguage?.slug, currentDocPath],
    queryFn: async () => {
      if (!selectedLanguage || !currentDocPath || !database) return null;

      console.log('Getting doc content from database for:', selectedLanguage.slug, currentDocPath);

      // Use the pre-loaded database
      const content = await fetchDocContent(selectedLanguage.slug, currentDocPath, database);

      return content;
    },
    enabled: !!(selectedLanguage && currentDocPath && database),
    staleTime: Infinity, // Content doesn't change
    cacheTime: Infinity,
  });

  // Scroll to top when document changes
  useEffect(() => {
    if (data && containerRef.current) {
      // Use timeout to ensure DOM is updated
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, 0);
    }
  }, [data]);

  if (!selectedLanguage) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-6">
          <div className="mb-6 relative">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-3">Welcome to DevHub</h2>
          <p className="text-slate-400 leading-relaxed">
            Select a programming language or framework from the sidebar to explore comprehensive documentation
          </p>
        </div>
      </div>
    );
  }

  if (isDatabaseLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-6">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            Loading {selectedLanguage.name} Documentation
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Downloading documentation database...
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <p className="text-xs text-slate-500">
              This may take a moment on first load. The documentation will be cached locally for offline access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentDocPath) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-6">
          <div className="mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-3">{selectedLanguage.name} Documentation</h2>
          <p className="text-slate-400 leading-relaxed">
            Use the search bar or browse the documentation index to find what you're looking for
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-slate-400">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Error Loading Documentation</h3>
          <p className="text-sm text-slate-400 bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  console.log('Rendering doc:', {
    title: data.title,
    path: data.path,
    htmlLength: data.html.length,
    htmlPreview: data.html.substring(0, 200)
  });

  const devDocsUrl = `https://devdocs.io/${selectedLanguage.slug}/${data.path}`;

  // Check if documentation is deprecated
  const isDeprecated = data.html.toLowerCase().includes('deprecated') ||
                       data.html.toLowerCase().includes('obsolete') ||
                       data.title.toLowerCase().includes('deprecated');

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Deprecated warning banner */}
        {isDeprecated && (
          <div className="mb-6 bg-orange-500/10 border-2 border-orange-500/30 rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-orange-300">
                    Deprecated Feature
                  </h3>
                  <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-xs font-semibold text-orange-400">
                    DEPRECATED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This feature is deprecated and may be removed in future versions. It is recommended to use alternative approaches. Check the documentation for migration guidance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info banner */}
        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-200 mb-1">
                Simplified Documentation View
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                This is a streamlined version focused on essential information. Links and external references have been removed for a cleaner reading experience.
              </p>
              <a
                href={devDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View complete documentation on DevDocs</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
          {data.title}
        </h1>

        {/* Path breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <span className="font-semibold text-primary">{selectedLanguage.name}</span>
            <span>/</span>
            <span className="font-mono">{data.path}</span>
            {isDeprecated && (
              <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-xs font-bold text-orange-400 uppercase tracking-wide">
                Deprecated
              </span>
            )}
          </div>
        </div>

        {/* Content - H1 was removed to avoid duplication */}
        <article
          className="prose prose-lg prose-invert prose-slate max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:text-slate-100 prose-h1:mb-6 prose-h1:mt-0 first:prose-h1:mt-0 prose-h1:pb-4 prose-h1:border-b prose-h1:border-slate-700
            prose-h2:text-3xl prose-h2:text-slate-200 prose-h2:mb-4 prose-h2:mt-10
            prose-h3:text-2xl prose-h3:text-slate-300 prose-h3:mb-3 prose-h3:mt-8
            prose-h4:text-xl prose-h4:text-slate-400 prose-h4:mb-2 prose-h4:mt-6
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
            prose-strong:text-slate-100 prose-strong:font-semibold
            prose-em:text-slate-400 prose-em:italic
            prose-code:text-emerald-400 prose-code:bg-slate-800/60 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-code:font-medium
            prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:p-5 prose-pre:overflow-x-auto prose-pre:my-6
            prose-pre:code:text-slate-300 prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-sm
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-800/40 prose-blockquote:pl-5 prose-blockquote:py-3 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-slate-300
            prose-ul:text-slate-300 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
            prose-ol:text-slate-300 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-slate-300 prose-li:my-2 prose-li:leading-relaxed
            prose-li:marker:text-blue-400
            prose-table:my-8 prose-table:rounded-lg prose-table:text-sm
            prose-thead:bg-slate-800/50 prose-thead:text-slate-200
            prose-th:border prose-th:border-slate-700 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-xs
            prose-td:border prose-td:border-slate-700 prose-td:px-3 prose-td:py-2 prose-td:text-slate-300 prose-td:text-xs
            prose-tr:border-slate-700 hover:prose-tr:bg-slate-800/20 prose-tr:transition-colors
            prose-hr:border-slate-700 prose-hr:my-10
            prose-kbd:bg-slate-800 prose-kbd:text-slate-300 prose-kbd:px-2 prose-kbd:py-1 prose-kbd:rounded prose-kbd:text-xs prose-kbd:font-mono prose-kbd:border prose-kbd:border-slate-700 prose-kbd:shadow-sm"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Content source:{' '}
              <a
                href="https://devdocs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                DevDocs
              </a>
            </p>
            <a
              href={devDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-200 transition-all hover:border-primary/50"
            >
              <span>Full documentation</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
          <span className="absolute -top-10 right-0 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back to top
          </span>
        </button>
      )}
    </div>
  );
}
