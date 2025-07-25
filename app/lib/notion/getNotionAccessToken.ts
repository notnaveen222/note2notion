import { supabaseAdmin } from "@/app/lib/supabase";

export async function getNotionAccessToken(notion_id: string): Promise<string> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("access_token")
    .eq("notion_id", notion_id)
    .single();

  if (error || !data?.access_token) {
    throw new Error("Access token not found");
  }

  return data.access_token;
}
