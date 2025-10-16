import { useAppStore } from '../../store/useAppStore';
import { AVAILABLE_LANGUAGES } from '../../services/docs/devdocs';
import { X, Book, Code2, Boxes, Cpu } from 'lucide-react';
import { useMemo } from 'react';

export function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useAppStore((state) => state.setSelectedLanguage);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  // Group languages by type
  const groupedLanguages = useMemo(() => {
    const groups: Record<string, typeof AVAILABLE_LANGUAGES> = {
      language: [],
      framework: [],
      runtime: [],
    };

    AVAILABLE_LANGUAGES.forEach((lang) => {
      if (groups[lang.type]) {
        groups[lang.type].push(lang);
      }
    });

    return groups;
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'language':
        return <Code2 className="w-4 h-4" />;
      case 'framework':
        return <Boxes className="w-4 h-4" />;
      case 'runtime':
        return <Cpu className="w-4 h-4" />;
      default:
        return <Book className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'language':
        return 'Languages';
      case 'framework':
        return 'Frameworks';
      case 'runtime':
        return 'Runtimes';
      default:
        return type;
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={toggleSidebar}
      />

      <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto animate-fadeIn">
        {/* Sidebar header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Book className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-semibold text-slate-100">DevHub</h2>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-slate-800 rounded-md transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      {/* Languages list */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedLanguages).map(([type, languages]) => {
          if (languages.length === 0) return null;

          return (
            <div key={type} className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className="text-slate-500">
                  {getTypeIcon(type)}
                </div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {getTypeLabel(type)}
                </h3>
              </div>
              <div className="space-y-1">
                {languages.map((language) => {
                  const isSelected = selectedLanguage?.slug === language.slug;

                  return (
                    <button
                      key={language.slug}
                      onClick={() => {
                        setSelectedLanguage(language);
                        // Close sidebar on mobile after selection
                        if (window.innerWidth < 1024) {
                          toggleSidebar();
                        }
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all group ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-slate-800/50 text-slate-300 hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{language.name}</div>
                        {language.version && (
                          <div className={`text-xs px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-700'
                          }`}>
                            v{language.version}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
    </>
  );
}
