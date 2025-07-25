export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // yet to update to "chrome-extension://onhhdhiblkiohnolemldjdolpfnbdgef",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
