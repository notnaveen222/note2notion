import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  //redir not working
  response.cookies.delete("notion_id");
  return response;
}
