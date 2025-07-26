"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className=" absolute top-0 right-0 left-0 flex items-center h-fit border-b border-hero-border justify-between py-2 px-4 sm:px-10">
      <div className="text-white text-lg sm:text-xl font-semibold">
        Note To Notion
      </div>
      <button
        onClick={() => {
          router.push("/auth");
        }}
        className="border-2 text-sm sm:text-base cursor-pointer border-white/65 hover:border-transparent transition-all duration-250 ease-in-out px-5 py-[6px] font-semibold rounded-full text-black bg-white text-right hover:bg-white/85 "
      >
        Get Started
      </button>
    </div>
  );
}
