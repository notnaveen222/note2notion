//data avail: name, pfp (if null, set default),workspace name?
"use client";
import { useEffect, useState } from "react";
import LogoutButton from "./component/Logout";
import axios from "axios";

const sampleData = {
  name: "Naveen",
  avatar_url:
    "https://s3-us-west-2.amazonaws.com/public.notion-static.com/8fa4cb84-902d-45e3-9c89-803d9ca94e56/file_00000000532461f68ff0d422bf33cd17.png",
  workspace: "Naveen's Workspace",
};

type userDetails = {
  name: string;
  avatar_url: string;
};

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  useEffect(() => {
    axios
      .get("/api/user-details")
      .then((res: any) => setUserDetails(res.data))
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUserDetails(null);
      });
  }, []);
  return (
    <div className="h-screen text-white">
      <div className="flex justify-between px-10 items-center py-3 border-b border-b-white/70  w-full ">
        <div className="text-xl font-semibold">Note To Notion</div>
        <div>
          {/* <img
            src={sampleData.avatar_url}
            alt="user profile picture"
            height={100}
            width={100}
            className="rounded-full size-12"
          ></img> */}
          <LogoutButton />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3 w-fit px-3 py-5 mx-auto mt-10 bg-dark-gray rounded-xl border border-white/70">
        <div>
          <img
            className="h-52 rounded-full"
            src={userDetails?.avatar_url}
            alt="user profile picture"
          />
        </div>
        <div className="font-semibold mb-5 text-2xl text-center">
          {userDetails?.name}
        </div>
      </div>
    </div>
  );
}
