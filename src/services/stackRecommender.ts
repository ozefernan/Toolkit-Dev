import type { ProjectType, ProjectSize, StackRecommendation, Technology } from '../types/stack';

const technologies: Record<string, Technology> = {
  // Frontend
  react: {
    name: 'React',
    category: 'frontend',
    description: 'A JavaScript library for building user interfaces',
    officialSite: 'https://react.dev',
    popularity: 'high',
  },
  vue: {
    name: 'Vue.js',
    category: 'frontend',
    description: 'Progressive JavaScript framework',
    officialSite: 'https://vuejs.org',
    popularity: 'high',
  },
  angular: {
    name: 'Angular',
    category: 'frontend',
    description: 'Platform for building web applications',
    officialSite: 'https://angular.io',
    popularity: 'high',
  },
  nextjs: {
    name: 'Next.js',
    category: 'frontend',
    description: 'React framework for production',
    officialSite: 'https://nextjs.org',
    popularity: 'high',
  },
  svelte: {
    name: 'Svelte',
    category: 'frontend',
    description: 'Cybernetically enhanced web apps',
    officialSite: 'https://svelte.dev',
    popularity: 'medium',
  },
  tailwind: {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first CSS framework',
    officialSite: 'https://tailwindcss.com',
    popularity: 'high',
  },

  // Backend
  nodejs: {
    name: 'Node.js',
    category: 'backend',
    description: 'JavaScript runtime built on Chrome\'s V8',
    officialSite: 'https://nodejs.org',
    popularity: 'high',
  },
  express: {
    name: 'Express',
    category: 'backend',
    description: 'Fast, minimalist web framework for Node.js',
    officialSite: 'https://expressjs.com',
    popularity: 'high',
  },
  nestjs: {
    name: 'NestJS',
    category: 'backend',
    description: 'Progressive Node.js framework',
    officialSite: 'https://nestjs.com',
    popularity: 'high',
  },
  fastify: {
    name: 'Fastify',
    category: 'backend',
    description: 'Fast and low overhead web framework',
    officialSite: 'https://fastify.dev',
    popularity: 'medium',
  },
  django: {
    name: 'Django',
    category: 'backend',
    description: 'High-level Python web framework',
    officialSite: 'https://djangoproject.com',
    popularity: 'high',
  },
  flask: {
    name: 'Flask',
    category: 'backend',
    description: 'Lightweight Python web framework',
    officialSite: 'https://flask.palletsprojects.com',
    popularity: 'high',
  },
  fastapi: {
    name: 'FastAPI',
    category: 'backend',
    description: 'Modern, fast Python web framework',
    officialSite: 'https://fastapi.tiangolo.com',
    popularity: 'high',
  },
  go: {
    name: 'Go (Golang)',
    category: 'backend',
    description: 'Efficient, statically typed language',
    officialSite: 'https://go.dev',
    popularity: 'high',
  },
  rust: {
    name: 'Rust',
    category: 'backend',
    description: 'Memory-safe systems programming',
    officialSite: 'https://rust-lang.org',
    popularity: 'medium',
  },

  // Mobile
  reactNative: {
    name: 'React Native',
    category: 'frontend',
    description: 'Build native apps with React',
    officialSite: 'https://reactnative.dev',
    popularity: 'high',
  },
  flutter: {
    name: 'Flutter',
    category: 'frontend',
    description: 'Google\'s UI toolkit for natively compiled apps',
    officialSite: 'https://flutter.dev',
    popularity: 'high',
  },

  // Database
  postgresql: {
    name: 'PostgreSQL',
    category: 'database',
    description: 'Advanced open-source relational database',
    officialSite: 'https://postgresql.org',
    popularity: 'high',
  },
  mongodb: {
    name: 'MongoDB',
    category: 'database',
    description: 'Document-oriented NoSQL database',
    officialSite: 'https://mongodb.com',
    popularity: 'high',
  },
  redis: {
    name: 'Redis',
    category: 'database',
    description: 'In-memory data structure store',
    officialSite: 'https://redis.io',
    popularity: 'high',
  },
  mysql: {
    name: 'MySQL',
    category: 'database',
    description: 'Popular open-source relational database',
    officialSite: 'https://mysql.com',
    popularity: 'high',
  },
  sqlite: {
    name: 'SQLite',
    category: 'database',
    description: 'Lightweight embedded database',
    officialSite: 'https://sqlite.org',
    popularity: 'medium',
  },

  // DevOps
  docker: {
    name: 'Docker',
    category: 'devops',
    description: 'Containerization platform',
    officialSite: 'https://docker.com',
    popularity: 'high',
  },
  kubernetes: {
    name: 'Kubernetes',
    category: 'devops',
    description: 'Container orchestration platform',
    officialSite: 'https://kubernetes.io',
    popularity: 'high',
  },
  nginx: {
    name: 'Nginx',
    category: 'devops',
    description: 'High-performance web server',
    officialSite: 'https://nginx.org',
    popularity: 'high',
  },

  // Testing
  jest: {
    name: 'Jest',
    category: 'testing',
    description: 'JavaScript testing framework',
    officialSite: 'https://jestjs.io',
    popularity: 'high',
  },
  vitest: {
    name: 'Vitest',
    category: 'testing',
    description: 'Blazing fast unit test framework',
    officialSite: 'https://vitest.dev',
    popularity: 'high',
  },
  pytest: {
    name: 'Pytest',
    category: 'testing',
    description: 'Python testing framework',
    officialSite: 'https://pytest.org',
    popularity: 'high',
  },
  cypress: {
    name: 'Cypress',
    category: 'testing',
    description: 'End-to-end testing framework',
    officialSite: 'https://cypress.io',
    popularity: 'high',
  },

  // Other
  typescript: {
    name: 'TypeScript',
    category: 'other',
    description: 'Typed superset of JavaScript',
    officialSite: 'https://typescriptlang.org',
    popularity: 'high',
  },
  graphql: {
    name: 'GraphQL',
    category: 'other',
    description: 'Query language for APIs',
    officialSite: 'https://graphql.org',
    popularity: 'high',
  },
  prisma: {
    name: 'Prisma',
    category: 'other',
    description: 'Next-generation ORM',
    officialSite: 'https://prisma.io',
    popularity: 'high',
  },
};

export function getStackRecommendation(
  projectType: ProjectType,
  projectSize: ProjectSize
): StackRecommendation {
  const recommendations: Record<ProjectType, Record<ProjectSize, StackRecommendation>> = {
    'web-app': {
      small: {
        projectType: 'web-app',
        projectSize: 'small',
        technologies: [
          technologies.react,
          technologies.tailwind,
          technologies.nodejs,
          technologies.express,
          technologies.sqlite,
          technologies.vitest,
        ],
        reasoning:
          'Para aplicações web pequenas, React com Tailwind CSS oferece desenvolvimento rápido e moderno. Node.js com Express provê um backend simples e eficiente. SQLite é perfeito para começar sem complexidade de setup.',
        alternatives: [
          {
            technology: technologies.vue,
            reason: 'Vue.js é mais simples para iniciantes e tem curva de aprendizado menor',
          },
          {
            technology: technologies.svelte,
            reason: 'Svelte compila para JavaScript vanilla, resultando em apps mais leves',
          },
        ],
      },
      medium: {
        projectType: 'web-app',
        projectSize: 'medium',
        technologies: [
          technologies.nextjs,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.redis,
          technologies.prisma,
          technologies.jest,
          technologies.docker,
        ],
        reasoning:
          'Next.js oferece SSR e otimizações automáticas. TypeScript adiciona type-safety. NestJS traz estrutura escalável ao backend. PostgreSQL é robusto para dados relacionais, e Redis para caching. Prisma simplifica operações de banco.',
        alternatives: [
          {
            technology: technologies.angular,
            reason: 'Angular oferece framework completo com convenções estabelecidas',
          },
        ],
      },
      large: {
        projectType: 'web-app',
        projectSize: 'large',
        technologies: [
          technologies.nextjs,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.prisma,
          technologies.jest,
          technologies.cypress,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'Stack enterprise-ready com Next.js para frontend escalável, NestJS com arquitetura modular no backend. PostgreSQL para dados relacionais + MongoDB para dados não-estruturados. GraphQL para APIs flexíveis. K8s para orquestração de containers.',
        alternatives: [],
      },
      enterprise: {
        projectType: 'web-app',
        projectSize: 'enterprise',
        technologies: [
          technologies.angular,
          technologies.typescript,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.jest,
          technologies.cypress,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'Stack enterprise com Angular para frontend corporativo, NestJS para backend enterprise-grade. Múltiplos databases, GraphQL para flexibilidade de API, e infraestrutura completa de containers e orquestração.',
        alternatives: [],
      },
    },
    'mobile-app': {
      small: {
        projectType: 'mobile-app',
        projectSize: 'small',
        technologies: [
          technologies.reactNative,
          technologies.nodejs,
          technologies.express,
          technologies.mongodb,
          technologies.jest,
        ],
        reasoning:
          'React Native permite desenvolver para iOS e Android com uma só codebase. Backend simples com Node.js e Express, MongoDB para flexibilidade de schema.',
        alternatives: [
          {
            technology: technologies.flutter,
            reason: 'Flutter oferece performance nativa e widgets customizáveis',
          },
        ],
      },
      medium: {
        projectType: 'mobile-app',
        projectSize: 'medium',
        technologies: [
          technologies.reactNative,
          technologies.typescript,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.redis,
          technologies.jest,
          technologies.docker,
        ],
        reasoning:
          'React Native com TypeScript para type-safety. NestJS estrutura o backend de forma escalável. PostgreSQL para dados relacionais e Redis para caching e sessões.',
        alternatives: [
          {
            technology: technologies.flutter,
            reason: 'Flutter tem melhor performance e controle de UI',
          },
        ],
      },
      large: {
        projectType: 'mobile-app',
        projectSize: 'large',
        technologies: [
          technologies.flutter,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.jest,
          technologies.docker,
          technologies.kubernetes,
        ],
        reasoning:
          'Flutter oferece performance nativa superior para apps complexos. Backend robusto com NestJS, múltiplos databases, GraphQL para APIs eficientes. K8s para escalar conforme demanda.',
        alternatives: [],
      },
      enterprise: {
        projectType: 'mobile-app',
        projectSize: 'enterprise',
        technologies: [
          technologies.flutter,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.jest,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'Flutter para apps de alta performance. Infraestrutura enterprise completa com NestJS, múltiplos databases, GraphQL, containerização e orquestração.',
        alternatives: [],
      },
    },
    'api-backend': {
      small: {
        projectType: 'api-backend',
        projectSize: 'small',
        technologies: [
          technologies.nodejs,
          technologies.express,
          technologies.postgresql,
          technologies.jest,
        ],
        reasoning:
          'Express é minimalista e perfeito para APIs simples. PostgreSQL oferece confiabilidade. Setup rápido e direto ao ponto.',
        alternatives: [
          {
            technology: technologies.fastify,
            reason: 'Fastify oferece melhor performance que Express',
          },
          {
            technology: technologies.flask,
            reason: 'Flask é excelente para prototipagem rápida em Python',
          },
        ],
      },
      medium: {
        projectType: 'api-backend',
        projectSize: 'medium',
        technologies: [
          technologies.nodejs,
          technologies.nestjs,
          technologies.typescript,
          technologies.postgresql,
          technologies.redis,
          technologies.prisma,
          technologies.jest,
          technologies.docker,
        ],
        reasoning:
          'NestJS traz arquitetura estruturada e escalável. TypeScript adiciona segurança de tipos. Prisma simplifica operações de DB. Redis para caching e melhor performance.',
        alternatives: [
          {
            technology: technologies.fastapi,
            reason: 'FastAPI oferece performance superior e validação automática',
          },
        ],
      },
      large: {
        projectType: 'api-backend',
        projectSize: 'large',
        technologies: [
          technologies.nodejs,
          technologies.nestjs,
          technologies.typescript,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.prisma,
          technologies.jest,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'NestJS com arquitetura de microserviços. Múltiplos databases para diferentes necessidades. GraphQL para APIs flexíveis. K8s para alta disponibilidade e escalabilidade.',
        alternatives: [
          {
            technology: technologies.go,
            reason: 'Go oferece performance excepcional para APIs de alto throughput',
          },
        ],
      },
      enterprise: {
        projectType: 'api-backend',
        projectSize: 'enterprise',
        technologies: [
          technologies.go,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'Go oferece performance excepcional e baixo consumo de recursos. Infraestrutura distribuída com múltiplos databases, GraphQL, containerização completa e load balancing.',
        alternatives: [
          {
            technology: technologies.rust,
            reason: 'Rust oferece máxima performance e segurança de memória',
          },
        ],
      },
    },
    'fullstack': {
      small: {
        projectType: 'fullstack',
        projectSize: 'small',
        technologies: [
          technologies.nextjs,
          technologies.tailwind,
          technologies.postgresql,
          technologies.prisma,
          technologies.vitest,
        ],
        reasoning:
          'Next.js fullstack com App Router permite frontend e backend no mesmo projeto. Prisma simplifica operações de database. Setup rápido e produtivo.',
        alternatives: [],
      },
      medium: {
        projectType: 'fullstack',
        projectSize: 'medium',
        technologies: [
          technologies.nextjs,
          technologies.typescript,
          technologies.tailwind,
          technologies.postgresql,
          technologies.redis,
          technologies.prisma,
          technologies.jest,
          technologies.docker,
        ],
        reasoning:
          'Next.js fullstack com TypeScript para type-safety completo. Redis para caching. Prisma como ORM type-safe. Docker para ambientes consistentes.',
        alternatives: [],
      },
      large: {
        projectType: 'fullstack',
        projectSize: 'large',
        technologies: [
          technologies.nextjs,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.prisma,
          technologies.jest,
          technologies.cypress,
          technologies.docker,
          technologies.kubernetes,
        ],
        reasoning:
          'Separação de frontend (Next.js) e backend (NestJS) para melhor escalabilidade. Múltiplos databases, GraphQL, testing completo e infraestrutura de containers.',
        alternatives: [],
      },
      enterprise: {
        projectType: 'fullstack',
        projectSize: 'enterprise',
        technologies: [
          technologies.nextjs,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.nestjs,
          technologies.postgresql,
          technologies.mongodb,
          technologies.redis,
          technologies.graphql,
          technologies.prisma,
          technologies.jest,
          technologies.cypress,
          technologies.docker,
          technologies.kubernetes,
          technologies.nginx,
        ],
        reasoning:
          'Stack enterprise completo com frontend e backend separados, múltiplos databases, GraphQL, testing end-to-end, containerização e orquestração para alta disponibilidade.',
        alternatives: [],
      },
    },
    'desktop-app': {
      small: {
        projectType: 'desktop-app',
        projectSize: 'small',
        technologies: [
          technologies.react,
          technologies.typescript,
          technologies.tailwind,
          technologies.sqlite,
        ],
        reasoning:
          'Electron com React oferece desenvolvimento rápido de apps desktop cross-platform. SQLite para dados locais. TypeScript para type-safety.',
        alternatives: [],
      },
      medium: {
        projectType: 'desktop-app',
        projectSize: 'medium',
        technologies: [
          technologies.react,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.sqlite,
          technologies.jest,
        ],
        reasoning:
          'Electron com React e TypeScript. Node.js para operações nativas. SQLite para persistência local. Jest para testes.',
        alternatives: [],
      },
      large: {
        projectType: 'desktop-app',
        projectSize: 'large',
        technologies: [
          technologies.react,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.postgresql,
          technologies.jest,
          technologies.cypress,
        ],
        reasoning:
          'Electron para apps complexos com React e TypeScript. PostgreSQL para dados estruturados. Testing completo com Jest e Cypress.',
        alternatives: [
          {
            technology: technologies.rust,
            reason: 'Tauri com Rust oferece apps mais leves e performáticos',
          },
        ],
      },
      enterprise: {
        projectType: 'desktop-app',
        projectSize: 'enterprise',
        technologies: [
          technologies.react,
          technologies.typescript,
          technologies.tailwind,
          technologies.nodejs,
          technologies.postgresql,
          technologies.redis,
          technologies.jest,
          technologies.cypress,
        ],
        reasoning:
          'Electron enterprise-grade com infraestrutura robusta. PostgreSQL para dados, Redis para caching. Testing completo.',
        alternatives: [],
      },
    },
    'cli-tool': {
      small: {
        projectType: 'cli-tool',
        projectSize: 'small',
        technologies: [technologies.nodejs, technologies.typescript, technologies.jest],
        reasoning:
          'Node.js é perfeito para CLI tools rápidos. TypeScript adiciona type-safety. Jest para testes unitários.',
        alternatives: [
          {
            technology: technologies.go,
            reason: 'Go compila para binário único, facilitando distribuição',
          },
        ],
      },
      medium: {
        projectType: 'cli-tool',
        projectSize: 'medium',
        technologies: [technologies.nodejs, technologies.typescript, technologies.jest],
        reasoning:
          'Node.js com TypeScript para CLIs robustos. Jest para testing completo. NPM para fácil distribuição.',
        alternatives: [
          {
            technology: technologies.go,
            reason: 'Go oferece melhor performance e binários standalone',
          },
        ],
      },
      large: {
        projectType: 'cli-tool',
        projectSize: 'large',
        technologies: [technologies.go, technologies.docker],
        reasoning:
          'Go é ideal para CLIs complexos - performance excelente, binário único, cross-compilation fácil. Docker para containerização opcional.',
        alternatives: [
          {
            technology: technologies.rust,
            reason: 'Rust oferece máxima performance e segurança de memória',
          },
        ],
      },
      enterprise: {
        projectType: 'cli-tool',
        projectSize: 'enterprise',
        technologies: [technologies.go, technologies.docker, technologies.kubernetes],
        reasoning:
          'Go para CLIs enterprise com performance excepcional. Docker e K8s para deployment e orquestração em ambientes corporativos.',
        alternatives: [],
      },
    },
    library: {
      small: {
        projectType: 'library',
        projectSize: 'small',
        technologies: [technologies.typescript, technologies.vitest],
        reasoning:
          'TypeScript oferece type-safety essencial para libraries. Vitest para testes rápidos. NPM para fácil publicação.',
        alternatives: [],
      },
      medium: {
        projectType: 'library',
        projectSize: 'medium',
        technologies: [technologies.typescript, technologies.jest, technologies.docker],
        reasoning:
          'TypeScript com configuração robusta. Jest para testing completo. Docker para ambientes de teste consistentes.',
        alternatives: [],
      },
      large: {
        projectType: 'library',
        projectSize: 'large',
        technologies: [technologies.typescript, technologies.jest, technologies.cypress, technologies.docker],
        reasoning:
          'TypeScript com arquitetura modular. Testing completo (unitário + integração). Docker para CI/CD. Documentação gerada automaticamente.',
        alternatives: [],
      },
      enterprise: {
        projectType: 'library',
        projectSize: 'enterprise',
        technologies: [technologies.typescript, technologies.jest, technologies.cypress, technologies.docker],
        reasoning:
          'Library enterprise-grade com TypeScript estrito, testing extensivo, CI/CD robusto, documentação completa e versionamento semântico.',
        alternatives: [],
      },
    },
  };

  return recommendations[projectType][projectSize];
}

export const projectTypeLabels: Record<ProjectType, string> = {
  'web-app': 'Web Application',
  'mobile-app': 'Mobile Application',
  'api-backend': 'API / Backend',
  'desktop-app': 'Desktop Application',
  'cli-tool': 'CLI Tool',
  library: 'Library / Package',
  fullstack: 'Fullstack Application',
};

export const projectSizeLabels: Record<ProjectSize, string> = {
  small: 'Small (MVP, Prototype)',
  medium: 'Medium (Production-ready)',
  large: 'Large (Scalable)',
  enterprise: 'Enterprise (Mission-critical)',
};

export const projectSizeDescriptions: Record<ProjectSize, string> = {
  small: 'Ideal para MVPs, protótipos ou projetos pessoais. Foco em rapidez de desenvolvimento.',
  medium: 'Para aplicações production-ready que precisam de estrutura sólida e escalabilidade moderada.',
  large: 'Aplicações que lidam com alto tráfego e precisam escalar horizontalmente.',
  enterprise: 'Sistemas mission-critical com requisitos rigorosos de performance, segurança e disponibilidade.',
};
