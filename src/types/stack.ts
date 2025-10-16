export type ProjectType =
  | 'web-app'
  | 'mobile-app'
  | 'api-backend'
  | 'desktop-app'
  | 'cli-tool'
  | 'library'
  | 'fullstack';

export type ProjectSize = 'small' | 'medium' | 'large' | 'enterprise';

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'testing' | 'other';
  description: string;
  icon?: string;
  officialSite?: string;
  popularity: 'high' | 'medium' | 'low';
}

export interface StackRecommendation {
  projectType: ProjectType;
  projectSize: ProjectSize;
  technologies: Technology[];
  reasoning: string;
  alternatives?: {
    technology: Technology;
    reason: string;
  }[];
}
