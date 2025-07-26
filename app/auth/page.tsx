import NotionLoginButton from "@/components/auth-page/LoginButton";

export default function AuthPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="hero-bg border-white border-2 rounded-xl px-10 pt-10 pb-5">
        <div className="text-white font-medium tracking-wide text-xl text-center">
          Welcome to NoteToNotion
        </div>
        <div className="text-white/90 text-sm text-center mb-7">
          Organize ideas as you find them.
        </div>
        <NotionLoginButton />
        <div className="text-white text-sm mb-5 text-center">
          Don't have a Notion Account? <br />
          Create one{" "}
          <a
            href="https://www.notion.so/signup"
            target="_blank"
            className="underline underline-offset-2"
          >
            here
          </a>
          .
        </div>
      </div>
    </div>
  );
}
