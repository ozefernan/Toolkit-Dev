# Toolkit Dev

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)

**Toolkit Dev** é um projeto pessoal para facilitar o dia a dia do desenvolvedor. Documentação de múltiplas linguagens/frameworks e ferramentas úteis - tudo em um único lugar.

## Características

### 📚 Navegador de Documentação

- **Múltiplas Linguagens**: Acesso a documentação de 15+ linguagens e frameworks (JavaScript, TypeScript, React, Python, Go, Rust, etc.)
- **Busca Inteligente**: Fuzzy search para encontrar rapidamente o que você precisa
- **Offline First**: Cache inteligente com IndexedDB - documentação funciona offline
- **Interface Clean**: Design moderno e minimalista focado em produtividade

### 💻 Code Playground *(Em Desenvolvimento)*

- Editor de código com syntax highlighting
- Execução de código client-side
- Split view com documentação

### 🛠️ Developer Tools

**Formatters**
- JSON Formatter
- Base64 Encode/Decode
- URL Encode/Decode
- Markdown Preview
- Color Converter

**Generators**
- UUID Generator
- Password Generator
- Lorem Ipsum Generator
- Fake Data Generator (BR)
- QR Code Generator

**Calculators**
- Hash Calculator (MD5, SHA-1, SHA-256)
- JWT Decoder
- Timestamp Converter
- Regex Tester
- Diff Checker

**References**
- HTTP Status Codes
- MIME Types
- Port Numbers

**Code**
- Code Snippets Library

**Project Tools**
- Stack Recommender

## Stack Técnica

- **Frontend**: React 19.1.1 + TypeScript
- **Estado**: Zustand (state management)
- **Data Fetching**: TanStack Query (React Query)
- **Cache**: Dexie.js (IndexedDB wrapper)
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React
- **API**: DevDocs API
- **Build**: Vite 7.1.7

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
Toolkit-Dev/
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Layout, Header, Sidebar
│   │   ├── home/         # Homepage
│   │   ├── docs/         # DocViewer, Search, Browser
│   │   └── tools/        # Developer tools
│   │       ├── formatters/      # JSON, Base64, URL, Markdown, Color
│   │       ├── generators/      # UUID, Password, Lorem Ipsum, Fake Data, QR
│   │       ├── calculators/     # Hash, JWT, Timestamp, Regex, Diff
│   │       ├── references/      # HTTP Status, MIME Types, Ports
│   │       └── snippets/        # Code Snippets
│   ├── services/         # Serviços e integrações
│   │   ├── docs/         # DevDocs API integration
│   │   └── cache/        # IndexedDB cache system
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript types
├── public/               # Assets estáticos
└── ...
```

## Roadmap

### Fase 1 - MVP ✅ (Completado)

- [x] Setup do projeto
- [x] Integração DevDocs API
- [x] Sistema de cache com IndexedDB
- [x] Interface de documentação
- [x] Busca de documentação
- [x] 15+ linguagens disponíveis
- [x] Homepage interativa
- [x] Sistema de navegação por tabs
- [x] Favicon customizado

### Fase 2 - Developer Tools ✅ (Completado)

- [x] Stack Recommender
- [x] JSON formatter
- [x] Base64 encoder/decoder
- [x] URL encoder/decoder
- [x] Markdown preview
- [x] Color converter
- [x] UUID generator
- [x] Password generator
- [x] Lorem Ipsum generator
- [x] Fake Data generator (BR)
- [x] QR Code generator
- [x] Hash calculator (MD5, SHA-1, SHA-256)
- [x] JWT decoder
- [x] Timestamp converter
- [x] RegEx tester
- [x] Diff checker
- [x] HTTP Status reference
- [x] MIME Types reference
- [x] Port Numbers reference
- [x] Code Snippets library

### Fase 3 - Playground (Próxima)

- [ ] Monaco Editor integration
- [ ] JavaScript execution
- [ ] TypeScript execution
- [ ] Split view com docs
- [ ] Snippets salvos

### Fase 4 - Features Avançadas

- [ ] PWA support
- [ ] Sync de snippets (GitHub Gist)
- [ ] Temas customizáveis
- [ ] Atalhos de teclado
- [ ] Multi-language comparison view
- [ ] API tester

## Features Diferenciais

✨ **Tudo Offline** - Funciona completamente sem conexão após cache inicial
✨ **Zero Backend** - Totalmente client-side, super rápido
✨ **All-in-One** - Documentação + ferramentas em um único lugar
✨ **Interface Moderna** - Design clean e responsivo com Tailwind CSS
✨ **Múltiplas Ferramentas** - 20+ ferramentas úteis para desenvolvedores
✨ **Dados Brasileiros** - Gerador de dados fake com CPF, CEP, telefones BR

## Contribuindo

Contribuições são bem-vindas! Este é um projeto de portfólio mas pull requests e sugestões são apreciados.

## Licença

MIT

## Autor

**Oséas Fernandes**
Software Engineer
[GitHub](https://github.com/ozefernan) | [LinkedIn](https://www.linkedin.com/in/oseasfernandes/)

