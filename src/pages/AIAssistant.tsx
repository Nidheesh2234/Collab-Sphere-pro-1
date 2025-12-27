import { useState, useRef, useEffect } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Code, 
  FileText, 
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickPrompts = [
  { 
    text: "Help me optimize this React component", 
    icon: Code,
    category: "Development" 
  },
  { 
    text: "Create a project roadmap for my startup idea", 
    icon: FileText,
    category: "Planning" 
  },
  { 
    text: "Suggest team collaboration best practices", 
    icon: Lightbulb,
    category: "Leadership" 
  },
  { 
    text: "Review my code for security vulnerabilities", 
    icon: Code,
    category: "Security" 
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI assistant, ready to help you with development, design, project management, and collaboration. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Help me debug a React issue",
        "Create a team onboarding plan", 
        "Optimize my database queries",
        "Design a user feedback system"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("react")) {
      return "Great question about React! Here are some key optimization strategies:\n\n1. **Use React.memo()** for component memoization\n2. **Implement useMemo() and useCallback()** for expensive calculations\n3. **Code splitting** with React.lazy() and Suspense\n4. **Optimize bundle size** by analyzing with webpack-bundle-analyzer\n\nWould you like me to elaborate on any of these techniques or help you implement them in your specific use case?";
    }
    
    if (userInput.toLowerCase().includes("team") || userInput.toLowerCase().includes("collaboration")) {
      return "Excellent! Building effective team collaboration is crucial. Here's a comprehensive approach:\n\n**Communication Framework:**\n- Daily standups (15 min max)\n- Weekly retrospectives\n- Clear documentation standards\n\n**Tools & Processes:**\n- Version control best practices\n- Code review guidelines\n- Project management workflows\n\n**Team Culture:**\n- Psychological safety\n- Knowledge sharing sessions\n- Cross-functional pairing\n\nWhat specific aspect of team collaboration would you like to dive deeper into?";
    }

    return "I understand you're looking for help with that. Let me provide some insights:\n\nBased on your query, I'd recommend starting with a structured approach. Break down the problem into smaller, manageable components and tackle them systematically.\n\nWould you like me to provide more specific guidance? Feel free to share more details about your particular situation, and I can offer more targeted assistance.";
  };

  const generateSuggestions = (userInput: string): string[] => {
    const suggestions = [
      "Show me a code example",
      "What are the best practices?",
      "How do I implement this?",
      "Are there any common pitfalls?"
    ];
    
    return suggestions.slice(0, 3);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">
              Your intelligent collaboration partner
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Quick Prompts Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="w-full p-3 text-left rounded-lg border border-border hover:bg-surface transition-smooth"
                >
                  <div className="flex items-start gap-3">
                    <prompt.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{prompt.text}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {prompt.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span>Code review & optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Documentation generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Project planning & strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Team collaboration advice</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 surface-elevated flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-3xl ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground order-2" 
                          : "bg-surface order-1"
                      }`}>
                        {message.type === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${message.type === "user" ? "order-1" : "order-2"}`}>
                        <div className={`p-4 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-surface"
                        }`}>
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        
                        {message.type === "ai" && (
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => copyToClipboard(message.content)}
                              className="text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-foreground transition-smooth">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-foreground transition-smooth">
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm text-muted-foreground">Suggested follow-ups:</p>
                            <div className="space-y-2">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSendMessage(suggestion)}
                                  className="block w-full text-left text-sm p-2 rounded border border-border hover:bg-surface transition-smooth"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface rounded-lg">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-surface p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about development, collaboration, or project management..."
                    className="w-full p-3 bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth custom-scrollbar"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>
                <EnhancedButton
                  variant="hero"
                  size="lg"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </EnhancedButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}