import { supabaseAdmin } from "@/app/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const notion_id = (await cookies()).get("notion_id")?.value;
  if (!notion_id) {
    return NextResponse.redirect("https://localhost:3000/auth");
  }
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("name, avatar_url")
    .eq("notion_id", notion_id)
    .single();

  if (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
