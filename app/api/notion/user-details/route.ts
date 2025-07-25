import { supabaseAdmin } from "@/app/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  const notion_id = (await cookies()).get("notion_id")?.value;
  if (!notion_id) {
    return NextResponse.redirect("https://notetonotion.vercel.app/auth");
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
      { status: 500, headers: corsHeaders() }
    );
  }

  return NextResponse.json(data, { headers: corsHeaders() });
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
