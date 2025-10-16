import { useState } from "react";
import {
  Layers,
  FileJson,
  Key,
  Hash,
  BookOpen,
  Code2,
  Sparkles,
  Lock,
  Calendar,
  Globe,
  Palette,
  FileText,
  Copy,
  Server,
  Terminal,
} from "lucide-react";
import { StackRecommender } from "./StackRecommender";
import { JsonFormatter } from "./formatters/JsonFormatter";
import { Base64Tool } from "./formatters/Base64Tool";
import { UrlEncodeTool } from "./formatters/UrlEncodeTool";
import { MarkdownPreview } from "./formatters/MarkdownPreview";
import { ColorConverter } from "./formatters/ColorConverter";
import { UuidGenerator } from "./generators/UuidGenerator";
import { PasswordGenerator } from "./generators/PasswordGenerator";
import { LoremIpsumGenerator } from "./generators/LoremIpsumGenerator";
import { FakeDataGenerator } from "./generators/FakeDataGenerator";
import { QrCodeGenerator } from "./generators/QrCodeGenerator";
import { HashCalculator } from "./calculators/HashCalculator";
import { JwtDecoder } from "./calculators/JwtDecoder";
import { TimestampConverter } from "./calculators/TimestampConverter";
import { RegexTester } from "./calculators/RegexTester";
import { DiffChecker } from "./calculators/DiffChecker";
import { HttpStatusReference } from "./references/HttpStatusReference";
import { MimeTypesReference } from "./references/MimeTypesReference";
import { PortsReference } from "./references/PortsReference";
import { CodeSnippets } from "./snippets/CodeSnippets";

type ToolId =
  | "stack-recommender"
  | "json-formatter"
  | "base64"
  | "url-encode"
  | "markdown-preview"
  | "color-converter"
  | "uuid-generator"
  | "password-generator"
  | "lorem-ipsum"
  | "fake-data"
  | "qr-code"
  | "hash-calculator"
  | "jwt-decoder"
  | "timestamp-converter"
  | "regex-tester"
  | "diff-checker"
  | "http-status"
  | "mime-types"
  | "ports"
  | "code-snippets";

interface Tool {
  id: ToolId;
  name: string;
  icon: React.ReactNode;
  category: string;
  component: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: "stack-recommender",
    name: "Stack Recommender",
    icon: <Layers className="w-4 h-4" />,
    category: "Project Tools",
    component: <StackRecommender />,
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    icon: <FileJson className="w-4 h-4" />,
    category: "Formatters",
    component: <JsonFormatter />,
  },
  {
    id: "base64",
    name: "Base64 Encode/Decode",
    icon: <Key className="w-4 h-4" />,
    category: "Formatters",
    component: <Base64Tool />,
  },
  {
    id: "url-encode",
    name: "URL Encode/Decode",
    icon: <Globe className="w-4 h-4" />,
    category: "Formatters",
    component: <UrlEncodeTool />,
  },
  {
    id: "markdown-preview",
    name: "Markdown Preview",
    icon: <FileText className="w-4 h-4" />,
    category: "Formatters",
    component: <MarkdownPreview />,
  },
  {
    id: "color-converter",
    name: "Color Converter",
    icon: <Palette className="w-4 h-4" />,
    category: "Formatters",
    component: <ColorConverter />,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    icon: <Sparkles className="w-4 h-4" />,
    category: "Generators",
    component: <UuidGenerator />,
  },
  {
    id: "password-generator",
    name: "Password Generator",
    icon: <Lock className="w-4 h-4" />,
    category: "Generators",
    component: <PasswordGenerator />,
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    icon: <FileText className="w-4 h-4" />,
    category: "Generators",
    component: <LoremIpsumGenerator />,
  },
  {
    id: "fake-data",
    name: "Fake Data Generator (BR)",
    icon: <Copy className="w-4 h-4" />,
    category: "Generators",
    component: <FakeDataGenerator />,
  },
  {
    id: "qr-code",
    name: "QR Code Generator",
    icon: <Sparkles className="w-4 h-4" />,
    category: "Generators",
    component: <QrCodeGenerator />,
  },
  {
    id: "hash-calculator",
    name: "Hash Calculator",
    icon: <Hash className="w-4 h-4" />,
    category: "Calculators",
    component: <HashCalculator />,
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    icon: <Key className="w-4 h-4" />,
    category: "Calculators",
    component: <JwtDecoder />,
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    icon: <Calendar className="w-4 h-4" />,
    category: "Calculators",
    component: <TimestampConverter />,
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    icon: <Code2 className="w-4 h-4" />,
    category: "Calculators",
    component: <RegexTester />,
  },
  {
    id: "diff-checker",
    name: "Diff Checker",
    icon: <Copy className="w-4 h-4" />,
    category: "Calculators",
    component: <DiffChecker />,
  },
  {
    id: "http-status",
    name: "HTTP Status Codes",
    icon: <Server className="w-4 h-4" />,
    category: "References",
    component: <HttpStatusReference />,
  },
  {
    id: "mime-types",
    name: "MIME Types",
    icon: <FileJson className="w-4 h-4" />,
    category: "References",
    component: <MimeTypesReference />,
  },
  {
    id: "ports",
    name: "Port Numbers",
    icon: <Server className="w-4 h-4" />,
    category: "References",
    component: <PortsReference />,
  },
  {
    id: "code-snippets",
    name: "Code Snippets",
    icon: <Terminal className="w-4 h-4" />,
    category: "Code",
    component: <CodeSnippets />,
  },
];

const categories = Array.from(new Set(tools.map((t) => t.category)));

export function Tools() {
  const [activeTool, setActiveTool] = useState<ToolId>("stack-recommender");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Project Tools");

  const currentTool = tools.find((t) => t.id === activeTool);
  const filteredTools = tools.filter((t) => t.category === selectedCategory);

  return (
    <div className="h-full flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Developer Tools
          </h2>
          <p className="text-xs text-slate-500 mt-1">Ferramentas essenciais</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {categories.map((category) => {
            const categoryTools = tools.filter((t) => t.category === category);
            const isExpanded = selectedCategory === category;

            return (
              <div key={category} className="border-b border-slate-800">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${
                    isExpanded
                      ? "bg-slate-800/50 text-slate-100"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/30"
                  }`}
                >
                  {category}
                </button>
                {isExpanded && (
                  <div className="bg-slate-900/50">
                    {categoryTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`w-full text-left px-6 py-2.5 text-sm flex items-center gap-3 transition-all ${
                          activeTool === tool.id
                            ? "bg-primary/20 text-primary border-l-2 border-primary"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }`}
                      >
                        {tool.icon}
                        <span>{tool.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{currentTool?.component}</main>
    </div>
  );
}
