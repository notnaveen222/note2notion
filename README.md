# Note to Notion 📝 ➡️ 🧠

A lightweight browser extension that lets you save any highlighted text and the current page URL directly to your Notion database — all with a right-click or keyboard shortcut.

## 🚀 Features

- Highlight text and save to Notion
- Automatically saves page URL
- OAuth login with Notion
- Personal or public Notion workspace support

## 🛠️ Tech Stack

- Next.js (with Typescript)(Web Interface)
- Supabase (Auth/Storage)
- Notion API (Integration)
- Chrome Extensions API

## 📦 Installation

1. Clone this repo  
   `git clone https://github.com/yourusername/note-to-notion.git`

2. Install dependencies  
   `npm install`

3. Create a `.env.local` file and add your config:
   ```env
   OAUTH_CLIENT_ID=your_notion_client_id
   OAUTH_CLIENT_SECRET=your_notion_client_secret
   NOTION_REDIRECT_URL=http://localhost:3000/api/callback
   ```
