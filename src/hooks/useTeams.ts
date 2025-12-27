import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Team {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  avatar_url: string | null;
  is_private: boolean | null;
  created_at: string;
  member_count?: number;
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch public teams or teams user is a member of
      const { data: teamsData, error: teamsError } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (teamsError) throw teamsError;

      // Fetch user's teams
      const { data: memberData, error: memberError } = await supabase
        .from("team_members")
        .select("team_id, teams(*)")
        .eq("user_id", user.id);

      if (memberError) throw memberError;

      const userTeamsList = memberData?.map(m => m.teams).filter(Boolean) as Team[] || [];

      setTeams(teamsData || []);
      setUserTeams(userTeamsList);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast({
        title: "Error",
        description: "Failed to load teams",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();

    const channel = supabase
      .channel("team-membership-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team_members",
        },
        () => {
          fetchTeams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { teams, userTeams, loading, refetch: fetchTeams };
}
