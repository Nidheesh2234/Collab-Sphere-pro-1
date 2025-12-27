import { useState, useRef, useEffect } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Tag,
  Calendar,
  Users,
  Pin,
  Trash2,
  Edit3,
  Share2,
  Download,
  Upload,
  Folder,
  Star,
  Clock,
  CheckSquare,
  Image,
  Paperclip,
  Bold,
  Italic,
  List,
  Code,
  Mic,
  Save
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder: string;
  isPinned: boolean;
  isShared: boolean;
  collaborators: string[];
  lastModified: Date;
  createdAt: Date;
  attachments: string[];
}

interface Folder {
  id: string;
  name: string;
  color: string;
  noteCount: number;
}

const mockFolders: Folder[] = [
  { id: "1", name: "Project Ideas", color: "bg-primary", noteCount: 12 },
  { id: "2", name: "Meeting Notes", color: "bg-secondary", noteCount: 8 },
  { id: "3", name: "Code Snippets", color: "bg-accent", noteCount: 15 },
  { id: "4", name: "Personal", color: "bg-green-500", noteCount: 5 }
];

const mockNotes: Note[] = [
  {
    id: "1",
    title: "CollabSphere Feature Roadmap",
    content: "## Q1 Goals\n\n### Core Features\n- [x] User authentication system\n- [x] Real-time messaging\n- [ ] Advanced search functionality\n- [ ] Voice/video calling\n\n### AI Integration\n- [x] Basic AI assistant\n- [ ] Code review automation\n- [ ] Smart suggestions\n\n**Next Steps:**\n1. Implement advanced search\n2. Add video calling capabilities\n3. Enhance AI features\n\n*Meeting with dev team scheduled for next week.*",
    tags: ["roadmap", "features", "q1"],
    folder: "Project Ideas",
    isPinned: true,
    isShared: true,
    collaborators: ["nidheesh", "sarah", "mike"],
    lastModified: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2024-01-10T09:00:00"),
    attachments: ["wireframes.pdf", "user-feedback.xlsx"]
  },
  {
    id: "2",
    title: "Team Standup - Jan 15",
    content: "## Daily Standup Notes\n\n**Attendees:** Nidheesh, Sarah, Mike, Alex\n\n### Yesterday's Progress\n- Fixed authentication bug in login flow\n- Completed UI mockups for profile page\n- Set up CI/CD pipeline\n\n### Today's Goals\n- Implement search functionality\n- Code review for messaging system\n- Plan sprint retrospective\n\n### Blockers\n- Waiting for API documentation from backend team\n- Need design approval for mobile layout\n\n**Action Items:**\n- [ ] @nidheesh - Follow up with backend team\n- [ ] @sarah - Finalize mobile designs\n- [ ] @mike - Prepare retrospective agenda",
    tags: ["standup", "meeting", "team"],
    folder: "Meeting Notes",
    isPinned: false,
    isShared: true,
    collaborators: ["nidheesh", "sarah", "mike", "alex"],
    lastModified: new Date("2024-01-15T09:15:00"),
    createdAt: new Date("2024-01-15T09:00:00"),
    attachments: []
  },
  {
    id: "3",
    title: "React Hook Optimization",
    content: "```javascript\n// Custom hook for debounced search\nimport { useState, useEffect, useCallback } from 'react';\n\nexport const useDebounce = (value, delay) => {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n\n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]);\n\n  return debouncedValue;\n};\n\n// Usage example\nconst SearchComponent = () => {\n  const [searchTerm, setSearchTerm] = useState('');\n  const debouncedSearchTerm = useDebounce(searchTerm, 300);\n\n  useEffect(() => {\n    if (debouncedSearchTerm) {\n      // Perform search\n      searchAPI(debouncedSearchTerm);\n    }\n  }, [debouncedSearchTerm]);\n\n  return (\n    <input\n      type=\"text\"\n      value={searchTerm}\n      onChange={(e) => setSearchTerm(e.target.value)}\n      placeholder=\"Search...\"\n    />\n  );\n};\n```\n\n**Benefits:**\n- Reduces API calls\n- Improves performance\n- Better user experience",
    tags: ["react", "hooks", "optimization", "javascript"],
    folder: "Code Snippets",
    isPinned: true,
    isShared: false,
    collaborators: [],
    lastModified: new Date("2024-01-14T16:45:00"),
    createdAt: new Date("2024-01-14T16:30:00"),
    attachments: []
  }
];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [folders] = useState<Folder[]>(mockFolders);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFolder = selectedFolder === "all" || note.folder === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const regularNotes = filteredNotes.filter(note => !note.isPinned);

  const handleNoteSelect = (note: Note) => {
    if (isEditing) {
      saveNote();
    }
    setSelectedNote(note);
    setIsEditing(false);
  };

  const startEditing = () => {
    if (selectedNote) {
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
      setIsEditing(true);
    }
  };

  const saveNote = () => {
    if (selectedNote && isEditing) {
      const updatedNote = {
        ...selectedNote,
        title: editTitle,
        content: editContent,
        lastModified: new Date()
      };
      
      setNotes(prev => prev.map(note => 
        note.id === selectedNote.id ? updatedNote : note
      ));
      setSelectedNote(updatedNote);
      setIsEditing(false);
    }
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      tags: [],
      folder: selectedFolder === "all" ? "Personal" : selectedFolder,
      isPinned: false,
      isShared: false,
      collaborators: [],
      lastModified: new Date(),
      createdAt: new Date(),
      attachments: []
    };
    
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setIsEditing(true);
  };

  const insertFormatting = (format: string) => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editContent.substring(start, end);
    
    let insertion = "";
    switch (format) {
      case "bold":
        insertion = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        insertion = `*${selectedText || "italic text"}*`;
        break;
      case "list":
        insertion = `\n- ${selectedText || "list item"}`;
        break;
      case "code":
        insertion = `\`${selectedText || "code"}\``;
        break;
      case "checkbox":
        insertion = `\n- [ ] ${selectedText || "task"}`;
        break;
    }
    
    const newContent = editContent.substring(0, start) + insertion + editContent.substring(end);
    setEditContent(newContent);
  };

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-surface flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Notes
            </h2>
            <EnhancedButton variant="surface" size="sm" onClick={createNewNote}>
              <Plus className="h-4 w-4" />
            </EnhancedButton>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Folders */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Folders
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedFolder("all")}
              className={`w-full text-left p-2 rounded-lg transition-smooth ${
                selectedFolder === "all" ? "bg-primary/20 text-primary" : "hover:bg-surface-elevated"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">All Notes</span>
                <span className="text-xs text-muted-foreground">{notes.length}</span>
              </div>
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.name)}
                className={`w-full text-left p-2 rounded-lg transition-smooth ${
                  selectedFolder === folder.name ? "bg-primary/20 text-primary" : "hover:bg-surface-elevated"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${folder.color}`}></div>
                    <span className="text-sm">{folder.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{folder.noteCount}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Pinned Notes */}
          {pinnedNotes.length > 0 && (
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Pin className="h-4 w-4" />
                Pinned
              </h3>
              <div className="space-y-2">
                {pinnedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleNoteSelect(note)}
                    className={`p-3 rounded-lg cursor-pointer transition-smooth border ${
                      selectedNote?.id === note.id 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:bg-surface-elevated"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm truncate flex-1">{note.title}</h4>
                      {note.isShared && <Users className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {note.content.replace(/[#*`\[\]]/g, '').substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {note.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {note.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Notes */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Recent
            </h3>
            <div className="space-y-2">
              {regularNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={`p-3 rounded-lg cursor-pointer transition-smooth border ${
                    selectedNote?.id === note.id 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm truncate flex-1">{note.title}</h4>
                    {note.isShared && <Users className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {note.content.replace(/[#*`\[\]]/g, '').substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {note.lastModified.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Note Header */}
            <div className="p-6 border-b border-border bg-card/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-2xl font-bold bg-transparent border-none p-0 focus:ring-0"
                      placeholder="Note title..."
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{selectedNote.title}</h1>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Modified {selectedNote.lastModified.toLocaleDateString()}
                    </span>
                    {selectedNote.collaborators.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedNote.collaborators.length} collaborators
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <EnhancedButton variant="hero" onClick={saveNote}>
                      <Save className="h-4 w-4" />
                      Save
                    </EnhancedButton>
                  ) : (
                    <EnhancedButton variant="surface" onClick={startEditing}>
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </EnhancedButton>
                  )}
                  <EnhancedButton variant="surface" size="sm">
                    <Share2 className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton variant="surface" size="sm">
                    <Star className="h-4 w-4" />
                  </EnhancedButton>
                </div>
              </div>

              {/* Tags and Meta */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {selectedNote.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {selectedNote.isPinned && (
                  <Badge variant="outline" className="gap-1">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </Badge>
                )}
                {selectedNote.isShared && (
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    Shared
                  </Badge>
                )}
              </div>
            </div>

            {/* Editor Toolbar */}
            {isEditing && (
              <div className="p-4 border-b border-border bg-surface/50">
                <div className="flex items-center gap-2">
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => insertFormatting("bold")}
                  >
                    <Bold className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => insertFormatting("italic")}
                  >
                    <Italic className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => insertFormatting("list")}
                  >
                    <List className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => insertFormatting("checkbox")}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="surface" 
                    size="sm" 
                    onClick={() => insertFormatting("code")}
                  >
                    <Code className="h-4 w-4" />
                  </EnhancedButton>
                  <div className="h-6 w-px bg-border mx-2"></div>
                  <EnhancedButton variant="surface" size="sm">
                    <Image className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton variant="surface" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </EnhancedButton>
                  <EnhancedButton variant="surface" size="sm">
                    <Mic className="h-4 w-4" />
                  </EnhancedButton>
                </div>
              </div>
            )}

            {/* Note Content */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              {isEditing ? (
                <Textarea
                  ref={editorRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className="w-full h-full min-h-[500px] resize-none border-none bg-transparent p-0 focus:ring-0 text-base leading-relaxed font-mono"
                />
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedNote.content}
                  </pre>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Note Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a note from the sidebar or create a new one
              </p>
              <EnhancedButton variant="hero" onClick={createNewNote}>
                <Plus className="h-4 w-4" />
                Create New Note
              </EnhancedButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}