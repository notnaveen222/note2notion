chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed — setting up context menu");
  refreshContextMenu();
});
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started — refreshing context menu");
  refreshContextMenu();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REFRESH_CONTEXT_MENUS") {
    refreshContextMenu();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (
    info.menuItemId === "noteToNotion" ||
    info.parentMenuItemId === "noteToNotion"
  ) {
    handleNoteToNotion(info);
  }
});

async function handleNoteToNotion(info) {
  const selectedText = info.selectionText;
  console.log("selectedText: ", selectedText);
  const pageId = info.menuItemId;

  const notion_id = await new Promise((resolve) => {
    chrome.storage.local.get(["notion_id_extension"], (result) => {
      resolve(result.notion_id_extension);
    });
  });

  const serverPayload = {
    selectedText,
    notion_id,
    pageId,
  };

  try {
    await fetch("https://notetonotion.vercel.app/api/save-to-notion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverPayload),
    });
  } catch (err) {
    console.log("Error sending data to server", err);
  }
}

function refreshContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "noteToNotion",
      title: "Note To Notion",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      id: "SelectPageTitle",
      parentId: "noteToNotion",
      contexts: ["selection"],
      title: "Select a Page",
      enabled: false,
    });
    chrome.storage.local.get(["notion_pages"], (result) => {
      const pages = result.notion_pages || [];
      pages.forEach((page) => {
        chrome.contextMenus.create({
          id: `${page.id}`,
          parentId: "noteToNotion",
          title: `${page.title || "untitled"}`,
          contexts: ["selection"],
        });
      });
    });
  });
}
