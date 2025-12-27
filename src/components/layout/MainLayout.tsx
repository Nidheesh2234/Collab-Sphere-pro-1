import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationRail } from "./NavigationRail";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Plus, X, Check, MessageSquare, Users, FileText, Zap } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { notifications, loading, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return MessageSquare;
      case "team":
        return Users;
      case "note":
        return FileText;
      case "ai":
        return Zap;
      default:
        return Bell;
    }
  };

  const location = useLocation();
  const showInnerSidebar = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/notes") || location.pathname === "/";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <NavigationRail />
        {showInnerSidebar && <AppSidebar />}

        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-surface-elevated" />

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search teams, channels, or people..."
                  className="w-80 pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hover:bg-surface-elevated">
                <Plus className="h-4 w-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-surface-elevated relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-primary-foreground font-semibold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0 bg-card border-border shadow-elegant" align="end">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div>
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs hover:bg-surface-elevated"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Mark all read
                      </Button>
                    )}
                  </div>

                  <ScrollArea className="h-[400px]">
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <p className="text-sm text-muted-foreground">Loading notifications...</p>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
                        <p className="text-sm text-muted-foreground">No notifications yet</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {notifications.map((notif) => {
                          const NotifIcon = getNotificationIcon(notif.type);
                          return (
                            <div
                              key={notif.id}
                              className={`group relative p-3 rounded-lg mb-2 cursor-pointer transition-smooth hover:bg-surface-elevated ${!notif.read ? "bg-primary/5 border-l-2 border-primary" : ""
                                }`}
                              onClick={() => !notif.read && markAsRead(notif.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${!notif.read ? "bg-primary/10" : "bg-surface"}`}>
                                  <NotifIcon className={`h-4 w-4 ${!notif.read ? "text-primary" : "text-muted-foreground"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-foreground">{notif.title}</p>
                                      {notif.description && (
                                        <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        clearNotification(notif.id);
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-muted-foreground">
                                      {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                    </span>
                                    {!notif.read && (
                                      <Badge variant="default" className="h-4 px-1.5 text-[10px]">New</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-primary-foreground font-semibold text-sm">N</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}