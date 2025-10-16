import { Book, Wrench, Code2, ArrowRight, Coffee } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function Homepage() {
  const setActiveTool = useAppStore((state) => state.setActiveTool);

  const sections = [
    {
      icon: <Book className="w-8 h-8 text-blue-400" />,
      title: 'Documentação',
      description: 'Consulte docs de JavaScript, TypeScript, React e mais',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/50',
      onClick: () => setActiveTool('docs'),
    },
    {
      icon: <Wrench className="w-8 h-8 text-purple-400" />,
      title: 'Ferramentas',
      description: 'Formatadores, geradores, conversores e utilitários',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/50',
      onClick: () => setActiveTool('tools'),
    },
    {
      icon: <Code2 className="w-8 h-8 text-slate-400" />,
      title: 'Playground',
      description: 'Em breve...',
      color: 'from-slate-500/20 to-slate-600/20',
      borderColor: 'border-slate-500/50',
      onClick: () => setActiveTool('playground'),
    },
  ];

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <Coffee className="w-5 h-5 text-slate-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-100 mb-6 leading-tight">
            Toolkit Dev
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Um projeto pessoal pra facilitar o dia a dia. Documentação e ferramentas úteis, tudo em um lugar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 max-w-5xl mx-auto">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={section.onClick}
              className={`group bg-gradient-to-br ${section.color} backdrop-blur-sm border ${section.borderColor} rounded-xl p-8 sm:p-10 hover:scale-[1.02] active:scale-[0.98] transition-all text-left`}
            >
              <div className="mb-4">
                {section.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {section.title}
              </h3>

              <p className="text-sm text-slate-400">
                {section.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
