// app/lib/cors.ts
export function corsHeaders(origin?: string) {
  const allowed = [
    /^chrome-extension:\/\//, // Allow any Chrome extension
    "https://notetonotion.vercel.app",
  ];
  const isAllowed = allowed.some((entry) =>
    typeof entry === "string" ? entry === origin : entry.test(origin || "")
  );
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : allowed[1],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
