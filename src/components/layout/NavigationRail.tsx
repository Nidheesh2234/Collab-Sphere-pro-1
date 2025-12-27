import { ActionTooltip } from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase, Code, Globe, Settings, LogOut, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavItem {
    icon: any;
    label: string;
    path?: string;
    action?: () => void;
    color?: string;
    variant?: "default" | "ghost";
}

export function NavigationRail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const navItems: NavItem[] = [
        {
            icon: Globe,
            label: "Social",
            path: "/feed",
            color: "text-blue-500",
        },
        {
            icon: Briefcase,
            label: "Work",
            path: "/dashboard",
            color: "text-emerald-500",
        },
        {
            icon: Code,
            label: "Team",
            path: "/teams",
            color: "text-purple-500",
        },
    ];

    const bottomItems: NavItem[] = [
        {
            icon: Settings,
            label: "Settings",
            path: "/profile",
            variant: "ghost",
        },
        {
            icon: LogOut,
            label: "Logout",
            action: () => navigate("/auth"),
            variant: "ghost",
        },
    ];

    const isActive = (path?: string) => {
        if (!path) return false;
        if (path === "/dashboard" && location.pathname === "/") return true;
        return location.pathname.startsWith(path);
    };

    return (
        <div
            className={cn(
                "flex flex-col bg-background border-r border-border h-screen z-50 transition-all duration-300 ease-in-out",
                isExpanded ? "w-64" : "w-[72px]"
            )}
        >
            {/* Logo Placeholder - Toggles Sidebar */}
            <div className={cn("p-4 mb-4 flex items-center", isExpanded ? "justify-between" : "justify-center")}>
                <div
                    className="cursor-pointer flex items-center gap-3"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow flex-shrink-0">
                        C
                    </div>
                    {isExpanded && (
                        <span className="font-bold text-lg gradient-text whitespace-nowrap animate-fade-in">
                            CollabSphere
                        </span>
                    )}
                </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 flex flex-col gap-2 w-full px-2">
                {navItems.map((item) => (
                    <RailItem
                        key={item.label}
                        item={item}
                        isActive={isActive(item.path)}
                        isExpanded={isExpanded}
                        onClick={() => item.path && navigate(item.path)}
                    />
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2 w-full px-2 pb-4">
                {bottomItems.map((item) => (
                    <RailItem
                        key={item.label}
                        item={item}
                        isActive={isActive(item.path)}
                        isExpanded={isExpanded}
                        onClick={() => (item.action ? item.action() : item.path && navigate(item.path))}
                    />
                ))}
            </div>
        </div>
    );
}

function RailItem({
    item,
    isActive,
    isExpanded,
    onClick,
}: {
    item: NavItem;
    isActive: boolean;
    isExpanded: boolean;
    onClick: () => void;
}) {
    // If not expanded, use Tooltip. If expanded, no tooltip needed (label is visible).
    const ButtonContent = (
        <button
            onClick={onClick}
            className={cn(
                "relative group flex items-center transition-all duration-300",
                isExpanded
                    ? "w-full h-12 px-3 rounded-lg gap-3 hover:bg-surface-elevated/50"
                    : "w-full aspect-square justify-center rounded-[24px] hover:rounded-[16px] hover:bg-surface-elevated/50",
                isActive
                    ? "bg-surface-elevated text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            {/* Active Indicator Bar (Left) - Only when Expanded? Or both? */}
            <div
                className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all duration-300",
                    isExpanded
                        ? (isActive ? "h-8 w-1 opacity-100" : "h-4 w-1 opacity-0")
                        : (isActive ? "h-8 w-1 opacity-100" : "h-4 w-1 opacity-0 group-hover:opacity-50 group-hover:h-6")
                )}
            />

            <item.icon
                className={cn(
                    "w-6 h-6 transition-all duration-300 flex-shrink-0",
                    isActive && item.color ? item.color : "",
                    !isActive && !isExpanded && "group-hover:scale-110"
                )}
            />

            {isExpanded && (
                <span className={cn(
                    "font-medium whitespace-nowrap animate-fade-in",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                    {item.label}
                </span>
            )}
        </button>
    );

    if (isExpanded) {
        return ButtonContent;
    }

    return (
        <ActionTooltip label={item.label} side="right">
            {ButtonContent}
        </ActionTooltip>
    );
}
