// chrome.runtime.onInstalled.addListener(() => {});

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
        title: `${page.title || "untitled"} `,
        contexts: ["selection"],
      });
    });
  });
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
  const pageId = info.menuItemId;
  //console.log(pageId);
  const notion_id = await new Promise((resolve) => {
    chrome.storage.local.get(["notion_id_extension"], (result) => {
      resolve(result.notion_id_extension);
    });
  });
  const serverPayload = {
    selectedText: selectedText,
    notion_id: notion_id,
    pageId: pageId,
  };
  //console.log(serverPayload);
  try {
    const response = await fetch(
      "https://notetonotion.vercel.app/api/save-to-notion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serverPayload),
      }
    );
  } catch (err) {
    console.log("Error sending data to server", err);
  }
}
