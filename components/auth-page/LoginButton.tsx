"use client";
import notionIcon from "../../public/icons/notion-white-border.png";
import Image from "next/image";

export default function NotionLoginButton() {
  const handleNotionLogin = () => {
    window.location.href = "/api/oauth/login";
  };

  return (
    <button
      className="w-full flex items-center border-2 border-white/65 hover:border-white justify-center text-white py-1 mb-2 gap-x-2 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-150 "
      onClick={handleNotionLogin}
    >
      <Image
        src={notionIcon}
        height={50}
        width={50}
        alt="notion icon"
        className="h-8 w-8"
      />
      Continue with Notion
    </button>
  );
}
