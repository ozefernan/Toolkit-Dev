import { Menu, Home, Book, Wrench, Code2, Trash2, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cache } from '../../services/cache/db';
import { useQueryClient } from '@tanstack/react-query';

export function Header() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const activeTool = useAppStore((state) => state.activeTool);
  const setActiveTool = useAppStore((state) => state.setActiveTool);
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const currentDocPath = useAppStore((state) => state.currentDocPath);
  const queryClient = useQueryClient();

  const handleToolChange = (tool: 'home' | 'docs' | 'playground' | 'tools') => {
    setActiveTool(tool);
    // Close sidebar on mobile when switching tools
    if (window.innerWidth < 1024 && isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleClearCache = async () => {
    try {
      console.log('>>> CLEARING ALL CACHES <<<');

      // Clear IndexedDB cache
      await cache.clearAll();
      console.log('>>> IndexedDB cache cleared');

      // Clear React Query cache
      queryClient.clear();
      console.log('>>> React Query cache cleared');

      // Reload the page to ensure fresh start
      console.log('>>> Reloading page in 500ms...');
      setTimeout(() => {
        window.location.reload();
      }, 500);

      alert('Cache cleared! Page will reload...');
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('Error clearing cache. Check console for details.');
    }
  };

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Home', icon: <Home className="w-3 h-3" />, onClick: () => handleToolChange('home') }];

    if (activeTool === 'docs') {
      crumbs.push({ label: 'Documentation', icon: <Book className="w-3 h-3" />, onClick: () => {} });
      if (selectedLanguage) {
        crumbs.push({ label: selectedLanguage.name, icon: null, onClick: () => {} });
      }
    } else if (activeTool === 'tools') {
      crumbs.push({ label: 'Developer Tools', icon: <Wrench className="w-3 h-3" />, onClick: () => {} });
    } else if (activeTool === 'playground') {
      crumbs.push({ label: 'Code Playground', icon: <Code2 className="w-3 h-3" />, onClick: () => {} });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Only show menu button in docs section */}
        {activeTool === 'docs' && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-slate-600" />}
              <button
                onClick={crumb.onClick}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-slate-100 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {crumb.icon}
                <span>{crumb.label}</span>
              </button>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Tool tabs */}
        <nav className="flex gap-1 bg-slate-900/50 rounded-lg p-1">
          <button
            onClick={() => handleToolChange('home')}
            className={`p-2 rounded-md transition-all ${
              activeTool === 'home'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            aria-label="Home"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolChange('docs')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTool === 'docs'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Book className="w-4 h-4" />
            <span className="hidden sm:inline">Docs</span>
          </button>
          <button
            onClick={() => handleToolChange('tools')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTool === 'tools'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span className="hidden sm:inline">Tools</span>
          </button>
          <button
            onClick={() => handleToolChange('playground')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTool === 'playground'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Play</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
