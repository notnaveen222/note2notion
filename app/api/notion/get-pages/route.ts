import { getNotionAccessToken } from "@/app/lib/notion/getNotionAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/lib/cors";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const notion_id = body.notion_id;
  const origin = req.headers.get("origin");

  try {
    const access_token = await getNotionAccessToken(notion_id);

    const response = await axios.post(
      "https://api.notion.com/v1/search",
      {
        filter: {
          property: "object",
          value: "page",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      }
    );

    const pages = response.data.results.map((page: any) => {
      let title = "Untitled";

      for (const key in page.properties) {
        const prop = page.properties[key];
        if (prop.type === "title" && prop.title.length > 0) {
          title = prop.title[0].text.content;
          break;
        }
      }

      return {
        id: page.id,
        title,
      };
    });

    return NextResponse.json(pages, { headers: corsHeaders(origin) });
  } catch (error: any) {
    console.error("Failed to fetch Notion pages:", error.message);
    return NextResponse.json(
      { error: "Unable to fetch pages" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}
