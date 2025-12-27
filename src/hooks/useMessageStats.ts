import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useMessageStats() {
    const [messagesToday, setMessagesToday] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const { count, error } = await supabase
                .from("channel_messages")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id)
                .gte("created_at", today.toISOString());

            if (error) throw error;
            setMessagesToday(count || 0);
        } catch (error) {
            console.error("Error fetching message stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();

        // Subscribe to new messages from this user to update count immediately
        const channel = supabase
            .channel("user-messages-stats")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "channel_messages",
                },
                (payload) => {
                    // Only increment if the message is from the current user
                    // We can check this if we stored the user ID in a ref, 
                    // or just refetch to be safe and simple.
                    fetchStats();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { messagesToday, loading };
}
