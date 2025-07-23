"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-end py-2 px-5">
      <button
        onClick={() => {
          router.push("/auth");
        }}
        className="border cursor-pointer border-white px-5 py-2 rounded-lg text-white text-right"
      >
        Get Started
      </button>
    </div>
  );
}
