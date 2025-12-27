import { useState, useEffect } from "react";
import { EnhancedButton } from "./ui/enhanced-button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Search,
  X,
  Users,
  FileText,
  Code,
  MessageSquare,
  Hash,
  User,
  Calendar,
  Clock
} from "lucide-react";

interface SearchResult {
  id: string;
  type: "team" | "note" | "code" | "user" | "channel" | "message";
  title: string;
  description: string;
  metadata?: string;
  url: string;
  timestamp?: Date;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    type: "team",
    title: "DevCrew",
    description: "A collaborative space for developers to share knowledge and build projects",
    metadata: "847 members",
    url: "/teams/1",
    timestamp: new Date("2024-01-15T10:30:00")
  },
  {
    id: "2",
    type: "note",
    title: "React Hook Optimization",
    description: "Custom hook for debounced search functionality with performance tips",
    metadata: "Code Snippets",
    url: "/notes/2",
    timestamp: new Date("2024-01-14T16:45:00")
  },
  {
    id: "3",
    type: "user",
    title: "Nidheesh Kumar",
    description: "Full-stack developer passionate about AI and collaboration tools",
    metadata: "@nidheesh",
    url: "/profile/1",
    timestamp: new Date("2023-06-15T09:00:00")
  },
  {
    id: "4",
    type: "code",
    title: "useDebounce.js",
    description: "Custom React hook for implementing search debouncing",
    metadata: "JavaScript",
    url: "/code/1",
    timestamp: new Date("2024-01-15T14:30:00")
  },
  {
    id: "5",
    type: "channel",
    title: "#code-review",
    description: "Channel for sharing and reviewing code in DevCrew team",
    metadata: "DevCrew • 245 members",
    url: "/teams/1/code-review",
    timestamp: new Date("2024-01-15T11:20:00")
  },
  {
    id: "6",
    type: "message",
    title: "PR #47 needs review",
    description: "New pull request for the authentication system refactor",
    metadata: "DevCrew • #code-review",
    url: "/teams/1/code-review",
    timestamp: new Date("2024-01-15T09:15:00")
  }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Simulate search with filtering
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            // Navigate to selected result
            window.location.href = results[selectedIndex].url;
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case "team": return Users;
      case "note": return FileText;
      case "code": return Code;
      case "user": return User;
      case "channel": return Hash;
      case "message": return MessageSquare;
      default: return Search;
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case "team": return "text-primary";
      case "note": return "text-secondary";
      case "code": return "text-accent";
      case "user": return "text-primary";
      case "channel": return "text-secondary";
      case "message": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-card border border-border rounded-lg shadow-glow overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search teams, notes, code, people..."
              className="flex-1 border-none bg-transparent focus:ring-0 text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="ml-3 p-1 hover:bg-surface rounded transition-smooth"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {searchTerm.trim() === "" ? (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Search CollabSphere</h3>
                <p className="text-muted-foreground">
                  Find teams, notes, code snippets, people, and more...
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="secondary">teams</Badge>
                  <Badge variant="secondary">notes</Badge>
                  <Badge variant="secondary">code</Badge>
                  <Badge variant="secondary">@people</Badge>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No results found for "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((result, index) => {
                  const ResultIcon = getResultIcon(result.type);
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <div
                      key={result.id}
                      className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                        isSelected ? "bg-primary/20" : "hover:bg-surface"
                      }`}
                      onClick={() => {
                        window.location.href = result.url;
                        onClose();
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-surface ${getResultTypeColor(result.type)}`}>
                          <ResultIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{result.title}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            {result.metadata && (
                              <span className="text-xs text-muted-foreground">
                                {result.metadata}
                              </span>
                            )}
                            {result.timestamp && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {result.timestamp.toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="p-3 border-t border-border bg-surface/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Navigate with ↑↓ arrows</span>
                <span>Press Enter to select</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}