"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const notion_id = searchParams.get("notion_id");
    //storing in ext for hitting backend
    if (notion_id) {
      window.postMessage({
        type: "SAVE_NOTION_ID",
        notion_id: notion_id,
      });
      console.log("Send Message Block"); //remove on prod

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  }, [searchParams, router]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-white font-semibold text-lg">
        Authorization Successful, Redirecting..
      </div>
    </div>
  );
}
