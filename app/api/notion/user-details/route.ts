import { supabaseAdmin } from "@/app/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  const notion_id = (await cookies()).get("notion_id")?.value;
  if (!notion_id) {
    return NextResponse.redirect(`${process.env.BASE_URL}auth`);
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
      { status: 500, headers: corsHeaders(origin) }
    );
  }

  return NextResponse.json(data, { headers: corsHeaders(origin) });
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}
