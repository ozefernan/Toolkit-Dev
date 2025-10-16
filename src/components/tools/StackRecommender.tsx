import { useState } from 'react';
import { Layers, Zap, Check, ExternalLink, Info } from 'lucide-react';
import type { ProjectType, ProjectSize } from '../../types/stack';
import {
  getStackRecommendation,
  projectTypeLabels,
  projectSizeLabels,
  projectSizeDescriptions,
} from '../../services/stackRecommender';

export function StackRecommender() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [projectSize, setProjectSize] = useState<ProjectSize | null>(null);

  const recommendation =
    projectType && projectSize ? getStackRecommendation(projectType, projectSize) : null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return '🎨';
      case 'backend':
        return '⚙️';
      case 'database':
        return '💾';
      case 'devops':
        return '🚀';
      case 'testing':
        return '🧪';
      default:
        return '📦';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'backend':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'database':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'devops':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'testing':
        return 'bg-pink-500/10 border-pink-500/30 text-pink-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Stack Recommender</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Descubra a stack tecnológica ideal para seu projeto baseado no tipo e tamanho
          </p>
        </div>

        {/* Selection Form */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Project Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-4">
              Tipo de Projeto
            </label>
            <div className="space-y-2">
              {(Object.entries(projectTypeLabels) as [ProjectType, string][]).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    projectType === type
                      ? 'bg-primary/20 border-primary text-primary-foreground'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{label}</span>
                    {projectType === type && <Check className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Project Size */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-4">
              Tamanho do Projeto
            </label>
            <div className="space-y-2">
              {(Object.entries(projectSizeLabels) as [ProjectSize, string][]).map(([size, label]) => (
                <button
                  key={size}
                  onClick={() => setProjectSize(size)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    projectSize === size
                      ? 'bg-primary/20 border-primary text-primary-foreground'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{label}</span>
                      {projectSize === size && <Check className="w-5 h-5" />}
                    </div>
                    <span className="text-xs text-slate-500">
                      {projectSizeDescriptions[size]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Result */}
        {recommendation ? (
          <div className="space-y-8">
            {/* Info Banner */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-200 mb-2">
                    Recomendação Personalizada
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {recommendation.reasoning}
                  </p>
                </div>
              </div>
            </div>

            {/* Technologies Grid */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Stack Recomendada
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendation.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className={`rounded-lg border-2 p-4 transition-all hover:scale-105 ${getCategoryColor(
                      tech.category
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryIcon(tech.category)}</span>
                        <div>
                          <h3 className="font-bold text-lg">{tech.name}</h3>
                          <span className="text-xs uppercase tracking-wider opacity-70">
                            {tech.category}
                          </span>
                        </div>
                      </div>
                      {tech.popularity === 'high' && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs font-semibold text-yellow-400">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-3 opacity-80 leading-relaxed">{tech.description}</p>
                    {tech.officialSite && (
                      <a
                        href={tech.officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                      >
                        <span>Site oficial</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            {recommendation.alternatives && recommendation.alternatives.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-4">Alternativas</h2>
                <div className="space-y-3">
                  {recommendation.alternatives.map((alt, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">
                          {getCategoryIcon(alt.technology.category)}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-200">
                              {alt.technology.name}
                            </h3>
                            {alt.technology.officialSite && (
                              <a
                                href={alt.technology.officialSite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                              >
                                <span>Ver mais</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">
                            {alt.technology.description}
                          </p>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-green-400 font-semibold">Motivo:</span>
                            <span className="text-slate-300">{alt.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-6 border-t border-slate-800 text-center">
              <button
                onClick={() => {
                  setProjectType(null);
                  setProjectSize(null);
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium text-slate-200 transition-colors"
              >
                Fazer Nova Recomendação
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
              <Layers className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-500">
              Selecione o tipo e tamanho do projeto para ver a recomendação
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
