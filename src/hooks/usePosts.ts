import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  post_likes: { id: string }[];
  post_comments: { id: string }[];
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(`
            *,
            profiles (username, display_name, avatar_url),
            post_likes (id),
            post_comments (id)
          `)
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;
        setPosts((data as any) || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Subscribe to new posts
    const channel = supabase
      .channel('posts-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createPost = async (content: string, image_url?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content,
          image_url: image_url || null,
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  return { posts, loading, createPost };
};
