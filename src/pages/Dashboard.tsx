import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTeams } from "@/hooks/useTeams";
import { useActivities } from "@/hooks/useActivities";
import { useMessageStats } from "@/hooks/useMessageStats";
import { formatDistanceToNow } from "date-fns";
import {
  Users,
  MessageSquare,
  Bot,
  FileText,
  TrendingUp,
  Clock,
  Zap,
  Star,
  ArrowRight,
  Calendar,
  Activity,
  User
} from "lucide-react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teams, userTeams, loading: teamsLoading } = useTeams();
  const { activities, loading: activitiesLoading } = useActivities();
  const { messagesToday, loading: statsLoading } = useMessageStats();

  const quickStats = [
    { label: "Active Teams", value: userTeams.length.toString(), icon: Users, color: "text-primary" },
    { label: "Messages Today", value: messagesToday.toString(), icon: MessageSquare, color: "text-secondary" },
    { label: "Recent Activity", value: activities.length.toString(), icon: Bot, color: "text-accent" },
    { label: "Total Teams", value: teams.length.toString(), icon: FileText, color: "text-primary" },
  ];

  const suggestedActions = [
    { title: "Complete your profile", desc: "Add a bio and profile picture", icon: User },
    { title: "Create your first team", desc: "Collaborate with others", icon: Users },
    { title: "Try AI Assistant", desc: "Get help with your tasks", icon: Zap },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return MessageSquare;
      case "note":
        return FileText;
      case "team_join":
        return Users;
      default:
        return Activity;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2 animate-slide-up">
        <h1 className="text-3xl font-bold">
          Good morning, <span className="gradient-text">Nidheesh</span> 👋
        </h1>
        <p className="text-muted-foreground animation-delay-200 animate-fade-in">
          Ready to collaborate and build something amazing today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 animate-slide-up animation-delay-200">
        <EnhancedButton
          variant="hero"
          size="lg"
          className="gap-2 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/ai")}
        >
          <Zap className="h-4 w-4" />
          Start AI Chat
        </EnhancedButton>
        <EnhancedButton
          variant="surface"
          size="lg"
          className="gap-2 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/teams")}
        >
          <Users className="h-4 w-4" />
          Create Team
        </EnhancedButton>
        <EnhancedButton
          variant="surface"
          size="lg"
          className="gap-2 hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/notes")}
        >
          <FileText className="h-4 w-4" />
          New Note
        </EnhancedButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in animation-delay-300">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className="surface-elevated hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-400">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 surface-elevated hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Stay updated with your latest interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activitiesLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">Loading activities...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
                <p className="text-xs text-muted-foreground mt-1">Start creating teams, notes, or chat with AI</p>
              </div>
            ) : (
              activities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.activity_type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ActivityIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.description || activity.activity_type}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <EnhancedButton
              variant="ghost"
              className="w-full justify-center gap-2"
              onClick={() => {
                toast({
                  title: "Activity Feed",
                  description: "Showing all recent activities across your teams",
                });
              }}
            >
              View All Activity
              <ArrowRight className="h-4 w-4" />
            </EnhancedButton>
          </CardContent>
        </Card>

        {/* Suggested Actions */}
        <Card className="surface-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Suggested
            </CardTitle>
            <CardDescription>
              Actions to boost your productivity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedActions.map((action, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border hover:bg-surface transition-smooth cursor-pointer"
                onClick={() => {
                  toast({
                    title: action.title,
                    description: action.desc,
                  });
                }}
              >
                <div className="flex items-start gap-3">
                  <action.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Popular Teams Section */}
      <Card className="surface-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            Trending Teams to Join
          </CardTitle>
          <CardDescription>
            Discover active communities in your interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamsLoading ? (
              <div className="col-span-3 flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">Loading teams...</p>
              </div>
            ) : teams.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center py-8">
                <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No teams available yet</p>
                <EnhancedButton
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate("/teams")}
                >
                  Create First Team
                </EnhancedButton>
              </div>
            ) : (
              teams.slice(0, 3).map((team) => (
                <div key={team.id} className="p-4 rounded-lg border border-border hover:border-primary transition-smooth">
                  <h3 className="font-semibold mb-2">{team.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {team.description || "No description"}
                  </p>
                  {team.category && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">{team.category}</Badge>
                      {team.is_private && <Badge variant="secondary" className="text-xs">Private</Badge>}
                    </div>
                  )}
                  <EnhancedButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate("/teams")}
                  >
                    View Team
                  </EnhancedButton>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}