import { useState } from "react";
import { useParams } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Hash,
    Search,
    Bell,
    Plus,
    Smile,
    Paperclip,
    Send,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_MESSAGES = [
    { id: 1, user: "Alex Chen", avatar: "", content: "Hey everyone! Just pushed the new build.", time: "10:30 AM", isMe: false },
    { id: 2, user: "Sarah Jones", avatar: "", content: "Awesome! I'll check it out.", time: "10:31 AM", isMe: false },
    { id: 3, user: "You", avatar: "", content: "Thanks Alex. Any breaking changes?", time: "10:32 AM", isMe: true },
    { id: 4, user: "Alex Chen", avatar: "", content: "Nope, fully backward compatible. 🚀", time: "10:33 AM", isMe: false },
];

export default function Teams() {
    const { channelId } = useParams();
    const activeChannel = channelId || "general";
    const [message, setMessage] = useState("");

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-background">
            <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-muted-foreground" />
                    <h1 className="font-bold text-lg">{activeChannel}</h1>
                    <span className="text-xs text-muted-foreground ml-2">topic: anything dev related</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <Avatar key={i} className="w-8 h-8 border-2 border-background">
                                <AvatarFallback className="bg-primary/20 text-xs">U{i}</AvatarFallback>
                            </Avatar>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background font-medium">
                            +5
                        </div>
                    </div>
                    <div className="h-6 w-px bg-border mx-2" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Search className="w-5 h-5 hover:text-foreground cursor-pointer" />
                        <Bell className="w-5 h-5 hover:text-foreground cursor-pointer" />
                        <Info className="w-5 h-5 hover:text-foreground cursor-pointer" />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0">
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            {MOCK_MESSAGES.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-4", msg.isMe ? "flex-row-reverse" : "")}>
                                    <Avatar className="w-10 h-10 mt-1">
                                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={cn("flex flex-col max-w-[70%]", msg.isMe ? "items-end" : "items-start")}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-semibold text-sm">{msg.user}</span>
                                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                                        </div>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.isMe
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-surface-elevated border border-border rounded-tl-sm"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Today</span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-border bg-surface/30">
                        <div className="bg-surface-elevated border border-border rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={`Message #${activeChannel}`}
                                className="w-full bg-transparent border-none focus:outline-none resize-none max-h-32 min-h-[44px] px-2 py-2 text-sm"
                                rows={1}
                            />
                            <div className="flex items-center justify-between p-2 pt-0">
                                <div className="flex gap-1">
                                    <EnhancedButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Plus className="w-4 h-4" />
                                    </EnhancedButton>
                                    <EnhancedButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Smile className="w-4 h-4" />
                                    </EnhancedButton>
                                    <EnhancedButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Paperclip className="w-4 h-4" />
                                    </EnhancedButton>
                                </div>
                                <EnhancedButton size="sm" className={cn("transition-all", message ? "opacity-100" : "opacity-50")}>
                                    <Send className="w-4 h-4 mr-2" /> Send
                                </EnhancedButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden xl:flex w-64 border-l border-border flex-col bg-surface/30">
                    <div className="p-4 border-b border-border font-semibold text-sm">
                        Online — 3
                    </div>
                    <div className="flex-1 p-2 space-y-1">
                        {['Alex Chen', 'Sarah Jones', 'Mike Ross'].map(name => (
                            <div key={name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors group">
                                <div className="relative">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback>{name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
