chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "noteToNotion",
    title: "Note To Notion",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "noteToNotion") {
    handleNoteToNotion(info);
  }
});

async function handleNoteToNotion(info) {
  const selectedText = info.selectionText;
  //Trying to implement with cookies, if cookie implemented remove locStor
  const notion_id = await new Promise((resolve) => {
    chrome.storage.local.get(["notion_id_extension"], (result) => {
      resolve(result.notion_id_extension);
    });
  });
  //console.log(notion_id);
  const serverPayload = {
    selectedText: selectedText,
    notion_id: notion_id,
  };
  try {
    const response = await fetch("http://localhost:3000/api/save-to-notion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serverPayload),
    });
  } catch (err) {
    console.log("Error sending data to server", err);
  }
}
