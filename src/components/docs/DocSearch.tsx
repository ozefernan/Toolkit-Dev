import { Search, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function DocSearch() {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={selectedLanguage ? `Search ${selectedLanguage.name} docs...` : 'Search documentation...'}
        className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 text-slate-200 rounded-lg border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-slate-800 placeholder:text-slate-500 transition-all"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
