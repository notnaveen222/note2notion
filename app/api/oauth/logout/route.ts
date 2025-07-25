import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.delete("notion_id");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error During Logout?" },
      { status: 500 }
    );
  }
}
