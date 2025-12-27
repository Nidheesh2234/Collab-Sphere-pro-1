-- Fix infinite recursion in team_members RLS by creating a security definer function
CREATE OR REPLACE FUNCTION public.is_team_member(_team_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE team_id = _team_id
      AND user_id = _user_id
  )
$$;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Team members viewable by team members" ON public.team_members;
DROP POLICY IF EXISTS "Team admins can update members" ON public.team_members;

-- Recreate policies using the security definer function
CREATE POLICY "Team members viewable by team members"
ON public.team_members
FOR SELECT
USING (public.is_team_member(team_id, auth.uid()));

CREATE POLICY "Team admins can update members"
ON public.team_members
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.team_members tm
    WHERE tm.team_id = team_members.team_id
      AND tm.user_id = auth.uid()
      AND tm.role = 'admin'
  )
);