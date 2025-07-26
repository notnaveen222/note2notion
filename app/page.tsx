import Navbar from "@/components/Navbar";
import Image from "next/image";
import chromeIcon from "@/public/icons/chrome.png";
export default function Home() {
  return (
    <div className="h-screen w-screen px-6 relative pb-20 ">
      <Navbar />
      <div className="hero-bg h-full w-full rounded-b-3xl">
        <div className="flex grow pt-72 text-white items-center flex-col">
          <div
            className="text-white text-sm sm:text-base items-center border border-hero-border rounded-full flex
         gap-x-2 px-2 py-1 mb-3"
          >
            <Image
              className="size-5"
              src={chromeIcon}
              alt="chrome icon"
              height={24}
              width={24}
            />{" "}
            Now Available in Chrome
          </div>
          <div className="text-center text-3xl sm:text-4xl font-semibold mb-5">
            Your Browser to Notion, <br />
            Seamlessly
          </div>
          <div className="text-center text-white mb-5 text-sm tracking-wide">
            Highlight any text on the web and send it directly to your Notion
            workspace.
          </div>
          <div className="flex gap-x-5">
            <button className="border-2 border-white cursor-pointer hover:bg-white hover:text-black transition-all duration-150 rounded-full px-4 text-lg sm:text-xl py-2">
              Add To Chrome
            </button>
          </div>
        </div>
      </div>
      <div className="text-white absolute bottom-7 left-0 right-0 text-center ">
        (In development)
      </div>
    </div>
  );
}
