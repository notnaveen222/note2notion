"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await axios.get("/api/oauth/logout");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="border border-white rounded-lg px-3 py-2 cursor-pointer"
    >
      Logout
    </button>
  );
}
