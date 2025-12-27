import { useState } from "react";
import {
  Home,
  Users,
  MessageSquare,
  Bot,
  FileText,
  User,
  Settings,
  Hash,
  Volume2,
  Video,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Feed", url: "/feed", icon: MessageSquare },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "AI Assistant", url: "/ai", icon: Bot },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "Profile", url: "/profile", icon: User },
];

const mockTeams = [
  {
    id: "1",
    name: "DevCrew",
    channels: [
      { name: "general", type: "text" },
      { name: "code-review", type: "text" },
      { name: "voice-chat", type: "voice" },
      { name: "standup", type: "video" }
    ]
  },
  {
    id: "2",
    name: "Design Squad",
    channels: [
      { name: "general", type: "text" },
      { name: "feedback", type: "text" },
      { name: "design-call", type: "voice" }
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedTeams, setExpandedTeams] = useState<string[]>(["1"]);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-smooth ${isActive
      ? "bg-primary/20 text-primary border-r-2 border-primary glow-primary"
      : "hover:bg-surface-elevated/50 hover:text-primary"
    }`;

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "voice": return Volume2;
      case "video": return Video;
      default: return Hash;
    }
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-surface border-r border-border custom-scrollbar`}
      collapsible="icon"
    >
      <SidebarContent className="custom-scrollbar">
        {/* CollabSphere Logo */}
        <div className="p-4 border-b border-border">
          {!collapsed ? (
            <h1 className="text-xl font-bold gradient-text">CollabSphere</h1>
          ) : (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Teams Section */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mockTeams.map((team) => (
                  <div key={team.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleTeam(team.id)}
                        className="hover:bg-surface-elevated/50 justify-between"
                      >
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{team.name}</span>
                        </div>
                        <span className={`transform transition-transform ${expandedTeams.includes(team.id) ? "rotate-90" : ""
                          }`}>›</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {expandedTeams.includes(team.id) && (
                      <div className="ml-6 space-y-1">
                        {team.channels.map((channel) => {
                          const ChannelIcon = getChannelIcon(channel.type);
                          return (
                            <SidebarMenuItem key={channel.name}>
                              <SidebarMenuButton
                                asChild
                                className="text-sm text-muted-foreground hover:text-foreground"
                              >
                                <NavLink to={`/teams/${team.id}/${channel.name}`}>
                                  <ChannelIcon className="h-3 w-3 mr-2" />
                                  {channel.name}
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Logout */}
        <div className="mt-auto p-4 border-t border-border space-y-2">
          <SidebarMenuButton asChild>
            <NavLink to="/settings" className={getNavCls}>
              <Settings className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Settings</span>}
            </NavLink>
          </SidebarMenuButton>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}