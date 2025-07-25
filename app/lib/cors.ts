// app/lib/cors.ts
export function corsHeaders(origin?: string) {
  const allowed = [
    "chrome-extension://onhhdhiblkiohnolemldjdolpfnbdgef",
    "http://localhost:3000",
  ];
  return {
    "Access-Control-Allow-Origin": allowed.includes(origin || "")
      ? origin!
      : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
