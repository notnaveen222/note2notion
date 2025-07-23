import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userCode = searchParams.get("code");
  try {
    const response = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        code: userCode,
        grant_type: "authorization_code",
        redirect_uri: process.env.NOTION_REDIRECT_URI,
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

    const userToken = response.data.access_token;
    //console.log(response);

    //Fetching User Data for dashboard
    const userData = await axios.get("https://api.notion.com/v1/users/me", {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Notion-Version": "2022-06-28",
      },
    });
    console.log(userData.data?.bot?.owner?.user?.avatar_url);
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (err: any) {
    console.log("Token Exchange Failed", err.response?.data || err.message);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
