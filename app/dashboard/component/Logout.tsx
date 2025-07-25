"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/auth");
      }}
      className="border border-white rounded-lg px-3 py-2 cursor-pointer"
    >
      Logout
    </button>
  );
}
