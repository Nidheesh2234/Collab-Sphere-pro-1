import { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Image as ImageIcon,
    Video,
    Plus,
    Filter,
    MoreHorizontal,
    TrendingUp,
    Smile,
    Users
} from "lucide-react";
import { MOCK_STORIES, MOCK_POSTS, Story, Post } from "@/lib/mock-social-data";
import { motion } from "framer-motion";

export default function Feed() {
    const [stories] = useState<Story[]>(MOCK_STORIES);
    const [posts] = useState<Post[]>(MOCK_POSTS);

    const StoryCard = ({ story }: { story: Story }) => (
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
            <div className={`p-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600 ${story.viewed ? 'grayscale opacity-70' : ''}`}>
                <div className="p-[2px] bg-background rounded-full">
                    <Avatar className="w-16 h-16 border-2 border-background group-hover:scale-105 transition-transform duration-300">
                        <AvatarImage src={story.user.avatar} className="object-cover" />
                        <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <span className="text-xs font-medium text-foreground">{story.user.name}</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-surface border border-border rounded-xl p-4 flex gap-4 overflow-x-auto custom-scrollbar no-scrollbar">
                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center hover:border-primary hover:bg-surface-elevated transition-colors">
                            <Plus className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Add Story</span>
                    </div>
                    {stories.map(story => <StoryCard key={story.id} story={story} />)}
                </div>

                <Card className="surface-elevated border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarFallback className="bg-gradient-primary text-white">ME</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <textarea
                                    placeholder="What's on your mind?"
                                    className="w-full bg-transparent border-none focus:outline-none resize-none min-h-[60px] text-lg placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                            <div className="flex gap-2">
                                <EnhancedButton variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
                                    <ImageIcon className="w-4 h-4 mr-2" /> Photo
                                </EnhancedButton>
                                <EnhancedButton variant="ghost" size="sm" className="text-green-500 hover:text-green-600 hover:bg-green-500/10">
                                    <Video className="w-4 h-4 mr-2" /> Video
                                </EnhancedButton>
                                <EnhancedButton variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10 hidden sm:flex">
                                    <Smile className="w-4 h-4 mr-2" /> Feeling
                                </EnhancedButton>
                            </div>
                            <EnhancedButton variant="default" size="sm" className="px-6">Post</EnhancedButton>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between pb-2">
                    <h2 className="text-lg font-semibold">Feed</h2>
                    <div className="flex gap-2">
                        <EnhancedButton variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <Filter className="w-4 h-4 mr-2" /> Latest
                        </EnhancedButton>
                    </div>
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card className="surface-elevated border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-start justify-between pb-2">
                                    <div className="flex gap-3">
                                        <Avatar>
                                            <AvatarImage src={post.user.avatar} />
                                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-sm hover:underline cursor-pointer">{post.user.name}</h3>
                                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                        </div>
                                    </div>
                                    <EnhancedButton variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </EnhancedButton>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="loading-relaxed">{post.content}</p>
                                    {post.image && (
                                        <div className="rounded-xl overflow-hidden">
                                            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50">
                                        <div className="flex gap-6">
                                            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group">
                                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors group">
                                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">{post.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors group">
                                                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">{post.shares}</span>
                                            </button>
                                        </div>
                                        <button className="text-muted-foreground hover:text-orange-500 transition-colors">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="hidden lg:block space-y-6">
                <Card className="bg-surface border-border/50">
                    <CardHeader className="pb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" /> Trending Topics
                        </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {['#TechTrends', '#WebDesign', '#AIRevolution', '#RemoteWork'].map(tag => (
                            <div key={tag} className="flex justify-between items-center cursor-pointer group">
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{tag}</span>
                                <span className="text-xs text-muted-foreground/50">2.4k posts</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-surface border-border/50">
                    <CardHeader className="pb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" /> Who to follow
                        </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">User {i}</span>
                                        <span className="text-xs text-muted-foreground">@user{i}</span>
                                    </div>
                                </div>
                                <EnhancedButton variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Follow</EnhancedButton>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
