import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { supabaseAdmin } from "@/app/lib/supabase";
import { cookies } from "next/headers";
import { corsHeaders } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  const BASE_URL = process.env.BASE_URL;
  const { searchParams } = new URL(req.url);
  const userCode = searchParams.get("code");
  const origin = req.headers.get("origin") || undefined;

  try {
    const response = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        code: userCode,
        grant_type: "authorization_code",
        redirect_uri: "https://notetonotion.vercel.app/api/oauth/callback",
      },
      {
        auth: {
          username: process.env.OAUTH_CLIENT_ID ?? "",
          password: process.env.OAUTH_CLIENT_SECRET ?? "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const notion_id = response.data.owner.user.id;
    const userPayload = {
      notion_id: notion_id,
      name: response.data.owner.user.name!,
      avatar_url: response.data.owner.user.avatar_url,
      access_token: response.data.access_token!,
    };

    const cookieStore = (await cookies()).set("notion_id", notion_id, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    const { error } = await supabaseAdmin
      .from("users")
      .upsert([userPayload], { onConflict: "notion_id" });

    if (error) {
      // Optionally handle error, but do not log to console in production
    }
    return NextResponse.redirect(
      `${BASE_URL}auth-success?notion_id=${notion_id}`
    );
  } catch (err: any) {
    // Optionally handle error, but do not log to console in production
    return NextResponse.json(
      { error: "OAuth failed" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}

// //Fetching User Data for dashboard
// const userData = await axios.get("https://api.notion.com/v1/users/me", {
//   headers: {
//     Authorization: `Bearer ${userToken}`,
//     "Notion-Version": "2022-06-28",
//   },
// });
