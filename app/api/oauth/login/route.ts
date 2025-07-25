import { corsHeaders } from "@/app/lib/cors";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID ?? "",
    redirect_uri: process.env.NOTION_REDIRECT_URI_LOCAL ?? "",
    response_type: "code",
    owner: "user",
  });

  const notionAuthURL = `https://api.notion.com/v1/oauth/authorize?${params.toString()}`; //also present in .env, check that
  return NextResponse.redirect(notionAuthURL, { headers: corsHeaders() });
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
