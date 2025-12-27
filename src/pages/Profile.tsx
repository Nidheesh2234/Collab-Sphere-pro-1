import { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Edit3,
  Settings,
  Star,
  Users,
  MessageSquare,
  Code,
  FileText,
  Calendar,
  MapPin,
  Link,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Trophy,
  Target,
  Zap,
  BookOpen,
  Camera,
  Save,
  X
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  joinedDate: Date;
  skills: string[];
  interests: string[];
  stats: {
    teamsJoined: number;
    notesCreated: number;
    codeSnippets: number;
    aiQueries: number;
    collaborations: number;
  };
  achievements: Achievement[];
  recentActivity: Activity[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earnedDate: Date;
  category: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  team?: string;
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Nidheesh Kumar",
  username: "@nidheesh",
  email: "nidheesh@collabsphere.com",
  bio: "Full-stack developer passionate about building collaborative tools and AI-powered experiences. Love working with React, Node.js, and machine learning.",
  location: "San Francisco, CA",
  website: "https://nidheesh.dev",
  githubUrl: "https://github.com/nidheesh",
  linkedinUrl: "https://linkedin.com/in/nidheesh",
  twitterUrl: "https://twitter.com/nidheesh",
  joinedDate: new Date("2023-06-15"),
  skills: ["JavaScript", "React", "Node.js", "Python", "TypeScript", "AI/ML", "UI/UX Design"],
  interests: ["Artificial Intelligence", "Startup", "Open Source", "Collaboration Tools", "Web3"],
  stats: {
    teamsJoined: 8,
    notesCreated: 127,
    codeSnippets: 45,
    aiQueries: 234,
    collaborations: 89
  },
  achievements: [
    {
      id: "1",
      title: "Team Player",
      description: "Joined 5+ teams and actively collaborated",
      icon: Users,
      earnedDate: new Date("2023-08-20"),
      category: "Collaboration"
    },
    {
      id: "2",
      title: "Code Master",
      description: "Created 25+ code snippets",
      icon: Code,
      earnedDate: new Date("2023-09-15"),
      category: "Development"
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Made 100+ AI assistant queries",
      icon: Zap,
      earnedDate: new Date("2023-11-02"),
      category: "Learning"
    },
    {
      id: "4",
      title: "Documenter",
      description: "Created 50+ comprehensive notes",
      icon: FileText,
      earnedDate: new Date("2023-12-10"),
      category: "Documentation"
    }
  ],
  recentActivity: [
    {
      id: "1",
      type: "note",
      description: "Created note 'React Hook Optimization'",
      timestamp: new Date("2024-01-15T14:30:00"),
      team: "DevCrew"
    },
    {
      id: "2",
      type: "team",
      description: "Joined team 'AI Innovators'",
      timestamp: new Date("2024-01-14T09:15:00")
    },
    {
      id: "3",
      type: "code",
      description: "Shared code snippet 'useDebounce hook'",
      timestamp: new Date("2024-01-13T16:45:00"),
      team: "DevCrew"
    },
    {
      id: "4",
      type: "ai",
      description: "Asked AI about React performance optimization",
      timestamp: new Date("2024-01-12T11:20:00")
    }
  ]
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    twitterUrl: profile.twitterUrl,
    skills: profile.skills.join(", "),
    interests: profile.interests.join(", ")
  });

  const saveProfile = () => {
    setProfile(prev => ({
      ...prev,
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
      website: editForm.website,
      githubUrl: editForm.githubUrl,
      linkedinUrl: editForm.linkedinUrl,
      twitterUrl: editForm.twitterUrl,
      skills: editForm.skills.split(",").map(s => s.trim()).filter(s => s),
      interests: editForm.interests.split(",").map(s => s.trim()).filter(s => s)
    }));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditForm({
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
      twitterUrl: profile.twitterUrl,
      skills: profile.skills.join(", "),
      interests: profile.interests.join(", ")
    });
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "note": return FileText;
      case "team": return Users;
      case "code": return Code;
      case "ai": return Zap;
      default: return Star;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="surface-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground">
                N
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-surface border-2 border-background rounded-full flex items-center justify-center hover:bg-surface-elevated transition-smooth">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="text-2xl font-bold"
                  />
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <EnhancedButton variant="hero" onClick={saveProfile}>
                      <Save className="h-4 w-4" />
                      Save
                    </EnhancedButton>
                    <EnhancedButton variant="surface" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                      Cancel
                    </EnhancedButton>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      <p className="text-primary text-lg">{profile.username}</p>
                    </div>
                    <EnhancedButton variant="surface" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </EnhancedButton>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {profile.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </span>
                    )}
                    {profile.website && (
                      <a href={profile.website} className="flex items-center gap-1 hover:text-primary transition-smooth">
                        <Link className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {profile.joinedDate.toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            {profile.githubUrl && (
              <a href={profile.githubUrl} className="p-2 rounded-lg bg-surface hover:bg-surface-elevated transition-smooth">
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} className="p-2 rounded-lg bg-surface hover:bg-surface-elevated transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile.twitterUrl && (
              <a href={profile.twitterUrl} className="p-2 rounded-lg bg-surface hover:bg-surface-elevated transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            <a href={`mailto:${profile.email}`} className="p-2 rounded-lg bg-surface hover:bg-surface-elevated transition-smooth">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats & Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-surface">
                  <div className="text-2xl font-bold text-primary">{profile.stats.teamsJoined}</div>
                  <div className="text-sm text-muted-foreground">Teams Joined</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface">
                  <div className="text-2xl font-bold text-secondary">{profile.stats.notesCreated}</div>
                  <div className="text-sm text-muted-foreground">Notes Created</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface">
                  <div className="text-2xl font-bold text-accent">{profile.stats.codeSnippets}</div>
                  <div className="text-sm text-muted-foreground">Code Snippets</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface">
                  <div className="text-2xl font-bold text-primary">{profile.stats.aiQueries}</div>
                  <div className="text-sm text-muted-foreground">AI Queries</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface">
                  <div className="text-2xl font-bold text-secondary">{profile.stats.collaborations}</div>
                  <div className="text-sm text-muted-foreground">Collaborations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests */}
          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skills & Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Skills</label>
                    <Input
                      value={editForm.skills}
                      onChange={(e) => setEditForm(prev => ({ ...prev, skills: e.target.value }))}
                      placeholder="Comma-separated skills"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Interests</label>
                    <Input
                      value={editForm.interests}
                      onChange={(e) => setEditForm(prev => ({ ...prev, interests: e.target.value }))}
                      placeholder="Comma-separated interests"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Achievements & Activity */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <achievement.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <span className="text-xs text-muted-foreground">
                      {achievement.earnedDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="surface-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.recentActivity.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-smooth">
                    <ActivityIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.description}</p>
                      {activity.team && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {activity.team}
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}