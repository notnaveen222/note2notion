// window.addEventListener("message", (event) => {
//   if (event.source !== window) return;

//   // ✅ Only accept from trusted origin
//   //   if (
//   //     event.origin !== "http://localhost:3000"
//   //     // &&
//   //     // event.origin !== "https://yourdomain.com"
//   //   )
//   //     return;

//   // ✅ Only accept specific message types
//   if (event.data.type === "SAVE_NOTION_ID" && event.data.notion_id) {
//     chrome.storage.local.set({ notion_id: event.data.notion_id }, () => {
//       console.log("Notion ID securely saved.");
//     });
//   }
// });

window.addEventListener("message", (event) => {
  console.log("Received message:", event.data); // 👈 add this
  chrome.storage.local.set(
    { notion_id_extension: event.data.notion_id },
    () => {
      console.log("Notion ID securely saved.");
    }
  );
});
