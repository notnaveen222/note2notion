import { NextResponse, NextRequest } from "next/server";
import { corsHeaders } from "@/app/lib/cors";
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID ?? "",
    redirect_uri: "https://notetonotion.vercel.app/api/oauth/callback",
    response_type: "code",
    owner: "user",
  });

  const notionAuthURL = `https://api.notion.com/v1/oauth/authorize?${params.toString()}`; //also present in .env, check that
  return NextResponse.redirect(notionAuthURL, { headers: corsHeaders(origin) });
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}
