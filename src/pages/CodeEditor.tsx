import { useState, useRef } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Code,
  Play,
  Save,
  Share2,
  Download,
  Upload,
  Copy,
  FileText,
  Plus,
  Folder,
  Settings,
  Terminal,
  Users,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
  lastModified: Date;
  isShared: boolean;
  collaborators: string[];
}

const mockFiles: CodeFile[] = [
  {
    id: "1",
    name: "useDebounce.js",
    language: "javascript",
    content: `// Custom hook for debounced search
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage example
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
};`,
    lastModified: new Date("2024-01-15T14:30:00"),
    isShared: true,
    collaborators: ["nidheesh", "sarah"]
  },
  {
    id: "2",
    name: "api-utils.ts",
    language: "typescript",
    content: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface RequestConfig {
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

class ApiClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;

  constructor(baseURL: string, config: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = {
      timeout: 5000,
      retries: 3,
      cache: true,
      ...config
    };
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const mergedConfig = { ...this.defaultConfig, ...config };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(mergedConfig.timeout!),
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        message: 'Success'
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, payload: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const mergedConfig = { ...this.defaultConfig, ...config };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(mergedConfig.timeout!),
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        message: 'Success'
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export default ApiClient;`,
    lastModified: new Date("2024-01-14T16:45:00"),
    isShared: false,
    collaborators: []
  },
  {
    id: "3",
    name: "Button.jsx",
    language: "jsx",
    content: `import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ].join(' ');

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };`,
    lastModified: new Date("2024-01-13T11:20:00"),
    isShared: true,
    collaborators: ["nidheesh", "alex"]
  }
];

const languageMap: { [key: string]: string } = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  jsx: "React JSX",
  tsx: "React TSX",
  python: "Python",
  css: "CSS",
  html: "HTML",
  json: "JSON"
};

export default function CodeEditor() {
  const [files, setFiles] = useState<CodeFile[]>(mockFiles);
  const [activeFile, setActiveFile] = useState<CodeFile | null>(files[0]);
  const [code, setCode] = useState(files[0]?.content || "");
  const [fileName, setFileName] = useState(files[0]?.name || "");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const handleFileSelect = (file: CodeFile) => {
    setActiveFile(file);
    setCode(file.content);
    setFileName(file.name);
  };

  const saveFile = () => {
    if (activeFile) {
      const updatedFile = {
        ...activeFile,
        name: fileName,
        content: code,
        lastModified: new Date()
      };
      
      setFiles(prev => prev.map(file => 
        file.id === activeFile.id ? updatedFile : file
      ));
      setActiveFile(updatedFile);
    }
  };

  const createNewFile = () => {
    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: "untitled.js",
      language: "javascript",
      content: "// New file\nconsole.log('Hello, CollabSphere!');",
      lastModified: new Date(),
      isShared: false,
      collaborators: []
    };
    
    setFiles(prev => [newFile, ...prev]);
    setActiveFile(newFile);
    setCode(newFile.content);
    setFileName(newFile.name);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    // Simulate code execution
    setTimeout(() => {
      if (code.includes("console.log")) {
        const logs = code.match(/console\.log\(['"`]([^'"`]+)['"`]\)/g);
        if (logs) {
          const outputs = logs.map(log => {
            const match = log.match(/console\.log\(['"`]([^'"`]+)['"`]\)/);
            return match ? match[1] : "";
          });
          setOutput(outputs.join("\n"));
        } else {
          setOutput("Code executed successfully!");
        }
      } else {
        setOutput("Code executed successfully!\nNo console output to display.");
      }
      setIsRunning(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const insertSnippet = (snippet: string) => {
    if (codeRef.current) {
      const textarea = codeRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + snippet + code.substring(end);
      setCode(newCode);
    }
  };

  const commonSnippets = [
    { name: "useState", code: "const [state, setState] = useState();" },
    { name: "useEffect", code: "useEffect(() => {\n  // Effect logic\n}, []);" },
    { name: "Function", code: "function functionName() {\n  // Function body\n}" },
    { name: "Arrow Function", code: "const functionName = () => {\n  // Function body\n};" },
    { name: "Try/Catch", code: "try {\n  // Code that might throw\n} catch (error) {\n  console.error(error);\n}" }
  ];

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-surface flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Code Editor
            </h2>
            <EnhancedButton variant="surface" size="sm" onClick={createNewFile}>
              <Plus className="h-4 w-4" />
            </EnhancedButton>
          </div>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Recent Files
            </h3>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file)}
                  className={`p-3 rounded-lg cursor-pointer transition-smooth border ${
                    activeFile?.id === file.id 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm truncate flex-1">{file.name}</h4>
                    {file.isShared && <Users className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {languageMap[file.language] || file.language}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {file.lastModified.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Snippets */}
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Quick Snippets
          </h3>
          <div className="space-y-1">
            {commonSnippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => insertSnippet(snippet.code)}
                className="w-full text-left p-2 text-xs rounded hover:bg-surface-elevated transition-smooth"
              >
                {snippet.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {activeFile ? (
          <>
            {/* Editor Header */}
            <div className="p-4 border-b border-border bg-card/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="bg-transparent border-none p-0 text-lg font-medium focus:ring-0"
                  />
                  <Badge variant="secondary">
                    {languageMap[activeFile.language] || activeFile.language}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <EnhancedButton variant="surface" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                  >
                    {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </EnhancedButton>
                  <EnhancedButton variant="surface" size="sm">
                    <Share2 className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton variant="accent" size="sm" onClick={runCode} disabled={isRunning}>
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run"}
                  </EnhancedButton>
                  <EnhancedButton variant="hero" size="sm" onClick={saveFile}>
                    <Save className="h-4 w-4" />
                    Save
                  </EnhancedButton>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Last modified: {activeFile.lastModified.toLocaleString()}</span>
                {activeFile.collaborators.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {activeFile.collaborators.length} collaborators
                  </span>
                )}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex">
              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <textarea
                  ref={codeRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Start coding..."
                  className="flex-1 p-6 bg-background border-none resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed custom-scrollbar"
                  style={{ tabSize: 2 }}
                />
              </div>

              {/* Output Panel */}
              {(output || isRunning) && (
                <div className="w-80 border-l border-border bg-surface">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-medium flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      Output
                    </h3>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono bg-background p-3 rounded border">
                      {output}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No File Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a file from the sidebar or create a new one
              </p>
              <EnhancedButton variant="hero" onClick={createNewFile}>
                <Plus className="h-4 w-4" />
                Create New File
              </EnhancedButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}