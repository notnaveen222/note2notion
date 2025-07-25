import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { corsHeaders } from "@/app/lib/cors";

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  try {
    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders(origin) }
    );
    response.cookies.delete("notion_id");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error During Logout?" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || undefined;
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}
