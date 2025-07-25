window.addEventListener("message", async (event) => {
  if (event.source !== window) return;

  if (event.data.type === "SAVE_NOTION_ID" && event.data.notion_id) {
    const notion_id = event.data.notion_id;

    chrome.storage.local.set({ notion_id_extension: notion_id }, () => {
      console.log("Notion ID securely saved.");
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/notion/get-pages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notion_id }),
        }
      );

      const pages = await response.json();

      chrome.storage.local.set({ notion_pages: pages }, () => {
        chrome.runtime.sendMessage({ type: "REFRESH_CONTEXT_MENUS" });
      });
    } catch (err) {
      console.error("Failed to fetch pages from backend:", err);
    }
  }
});
