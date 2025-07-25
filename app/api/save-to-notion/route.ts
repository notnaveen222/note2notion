import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { corsHeaders } from "@/app/lib/cors";
import axios from "axios";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const selectedText = body.selectedText;
    const pageId = body.pageId;
    const notion_id = body.notion_id;
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("access_token")
      .eq("notion_id", notion_id)
      .single();

    const payload = {
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: selectedText,
                },
              },
            ],
          },
        },
      ],
    };
    const response = await axios.patch(
      `https://api.notion.com/v1/blocks/${pageId}/children`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(
      { message: "Saved to notion" },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed Writing to Notion" },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
