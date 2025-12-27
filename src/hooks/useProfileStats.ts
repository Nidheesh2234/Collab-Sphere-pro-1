import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileStats {
  teamsJoined: number;
  notesCreated: number;
  postsCreated: number;
  aiConversations: number;
}

export const useProfileStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProfileStats>({
    teamsJoined: 0,
    notesCreated: 0,
    postsCreated: 0,
    aiConversations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const [teamsRes, notesRes, postsRes, conversationsRes] = await Promise.all([
          supabase.from("team_members").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("notes").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("posts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("ai_conversations").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        ]);

        setStats({
          teamsJoined: teamsRes.count || 0,
          notesCreated: notesRes.count || 0,
          postsCreated: postsRes.count || 0,
          aiConversations: conversationsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching profile stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, loading };
};
