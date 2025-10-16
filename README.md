# DevHub - Central do Desenvolvedor

![DevHub](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)

**DevHub** é uma ferramenta all-in-one para desenvolvedores que combina documentação de múltiplas linguagens/frameworks, code playground e ferramentas auxiliares - tudo em um único lugar.

## Características

### 📚 DocHub - Sistema de Documentação

- **Múltiplas Linguagens**: Acesso a documentação de 15+ linguagens e frameworks (JavaScript, TypeScript, React, Python, Go, Rust, etc.)
- **Busca Inteligente**: Fuzzy search para encontrar rapidamente o que você precisa
- **Offline First**: Cache inteligente com IndexedDB - documentação funciona offline
- **Interface Clean**: Design moderno e minimalista focado em produtividade

### 💻 Code Playground *(Em Desenvolvimento)*

- Editor de código com syntax highlighting
- Execução de código client-side
- Split view com documentação

### 🛠️ Developer Tools *(Planejado)*

- JSON/YAML formatter
- RegEx tester
- Color picker
- API tester
- Hash generators

## Stack Técnica

- **Frontend**: React 18 + TypeScript
- **Estado**: Zustand (state management)
- **Data Fetching**: TanStack Query (React Query)
- **Cache**: Dexie.js (IndexedDB wrapper)
- **Styling**: Tailwind CSS + Radix UI
- **Code Editor**: Monaco Editor (VS Code engine)
- **API**: DevDocs API
- **Build**: Vite

## Instalação

```bash
# Clone o repositório
git clone https://github.com/ozefernan/Toolkit-Dev.git

# Entre na pasta
cd Toolkit-Dev

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou próxima porta disponível).

## Estrutura do Projeto

```
devhub/
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Layout, Header, Sidebar
│   │   ├── docs/         # DocViewer, Search, Browser
│   │   ├── playground/   # Code editor (em desenvolvimento)
│   │   └── tools/        # Developer tools (planejado)
│   ├── services/         # Serviços e integrações
│   │   ├── docs/         # DevDocs API integration
│   │   ├── cache/        # IndexedDB cache system
│   │   └── search/       # Search utilities
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── lib/              # Utilities e helpers
├── public/               # Assets estáticos
└── ...
```

## Features Diferenciais

✨ **Tudo Offline** - Funciona completamente sem conexão após cache inicial
✨ **Zero Backend** - Totalmente client-side, super rápido
✨ **Learn & Try** - Docs + playground lado a lado
✨ **Cross-Reference** - Compare sintaxe entre linguagens
✨ **Knowledge Base** - Salve snippets e docs favoritas

## Contribuindo

Contribuições são bem-vindas! Este é um projeto de portfólio mas pull requests e sugestões são apreciados.

## Licença

MIT

## Autor

**Oséas Fernandes**
Software Engineer
[GitHub](https://github.com/ozefernan) | [LinkedIn](https://www.linkedin.com/in/oseasfernandes/)

