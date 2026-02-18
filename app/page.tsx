/*import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/

"use client";

import { supabase } from "@/lib/supabase";

export default function Home() {

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  /*return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl text-black font-bold mb-6">Smart Bookmark App</h1>

        <button
          onClick={login}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );*/

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center text-white">

      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
          🔖
        </div>

        <h1 className="text-3xl font-bold">
          Smart Bookmark
        </h1>

        <p className="text-white/80 mt-2 text-sm">
          Save, organize and access your favorite links instantly.
        </p>
      </div>

      <button
        onClick={login}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.61l6.85-6.85C35.91 2.36 30.36 0 24 0 14.82 0 6.73 5.64 2.69 13.74l7.98 6.2C12.77 13.72 17.95 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.63-.15-3.2-.43-4.71H24v9.02h12.7c-.55 2.96-2.2 5.47-4.68 7.17l7.28 5.67C43.95 37.18 46.5 31.42 46.5 24.5z"/>
          <path fill="#FBBC05" d="M10.67 28.95c-.48-1.42-.75-2.94-.75-4.45s.27-3.03.75-4.45l-7.98-6.2C1.64 16.78 1 20.32 1 24.5s.64 7.72 1.69 10.65l7.98-6.2z"/>
          <path fill="#34A853" d="M24 49c6.36 0 11.91-2.09 15.88-5.7l-7.28-5.67c-2.02 1.35-4.6 2.14-8.6 2.14-6.05 0-11.23-4.22-13.33-9.94l-7.98 6.2C6.73 43.36 14.82 49 24 49z"/>
        </svg>

        Continue with Google
      </button>

      <p className="text-xs text-white/60 mt-6">
        Secure authentication powered by Supabase
      </p>

    </div>
  </div>
);

}
