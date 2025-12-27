export interface Story {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    image: string;
    viewed: boolean;
}

export interface Post {
    id: string;
    user: {
        name: string;
        avatar: string;
        handle: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
    liked?: boolean;
}

export const MOCK_STORIES: Story[] = [
    {
        id: "1",
        user: { name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=600&fit=crop",
        viewed: false,
    },
    {
        id: "2",
        user: { name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=600&fit=crop",
        viewed: false,
    },
    {
        id: "3",
        user: { name: "DevTeam", avatar: "https://images.unsplash.com/photo-1522075469751-3a3a15d238cb?w=100&h=100&fit=crop" },
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop",
        viewed: false,
    },
];

export const MOCK_POSTS: Post[] = [
    {
        id: "1",
        user: {
            name: "Alex Morgan",
            handle: "@alexstartups",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
        },
        content: "Just launched our new AI collaborative tool! 🚀 It's been a wild journey but super excited to see how teams use it. #startup #tech #launch",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        likes: 1240,
        comments: 85,
        shares: 42,
        timestamp: "2h ago"
    },
    {
        id: "2",
        user: {
            name: "Design Daily",
            handle: "@designdaily",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        },
        content: "Minimalism isn't about lack of detail, it's about better details. ✨ What are your thoughts on the current state of UI design?",
        likes: 850,
        comments: 120,
        shares: 15,
        timestamp: "4h ago"
    }
];
