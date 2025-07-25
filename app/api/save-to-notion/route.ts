import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { corsHeaders } from "@/app/lib/cors";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const selectedText = body.selectedText;
  const notion_id = body.notion_id;
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("access_token")
    .eq("notion_id", notion_id)
    .single();

  // console.log({
  //   access_token: data?.access_token,
  //   selectedText: selectedText,
  // });
  return NextResponse.json(
    { message: "Saved to notion" },
    { status: 200, headers: corsHeaders() }
  );
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
