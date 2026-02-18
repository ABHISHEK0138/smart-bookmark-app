"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/";
      } else {
        setUser(data.user);
        //fetchBookmarks();
        fetchBookmarks(data.user.id);
      }
    });
  }, []);

  /*const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };*/
  const fetchBookmarks = async (userId: string) => {
  const { data } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  setBookmarks(data || []);
};
const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};


  /*const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    setTitle("");
    setUrl("");
  };*/
  /*const addBookmark = async () => {
  if (!title.trim() && !url.trim()) {
    setError("Please enter both Title and URL.");
    return;
  }

  if (!title.trim()) {
    setError("Title is required.");
    return;
  }

  if (!url.trim()) {
    setError("URL is required.");
    return;
  }

  setError("");

  await supabase.from("bookmarks").insert({
    title,
    url,
    user_id: user.id,
  });
fetchBookmarks(user.id);
  setTitle("");
  setUrl("");
};*/
const addBookmark = async () => {
  if (!title.trim() && !url.trim()) {
    setError("Please enter both Title and URL.");
    return;
  }

  if (!title.trim()) {
    setError("Title is required.");
    return;
  }

  if (!url.trim()) {
    setError("URL is required.");
    return;
  }

  setError("");
  setLoading(true);

  await supabase.from("bookmarks").insert({
    title,
    url,
    user_id: user.id,
  });
//fetchBookmarks(user.id);
  setTitle("");
  setUrl("");
  setLoading(false);
};



  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  // Realtime
  /*useEffect(() => {
    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        fetchBookmarks
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);*/
  useEffect(() => {
  if (!user) return;

  const channel = supabase
    .channel("realtime bookmarks")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
      },
      () => {
        fetchBookmarks(user.id);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);


  /*if (!user) return <p>Loading...</p>;*/
  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center space-y-4">
        
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        
        <p className="text-gray-700 font-medium">
          Loading your dashboard...
        </p>

      </div>
    </div>
  );
}


  /*return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Your Bookmarks</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full"
      />

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="border p-2 w-full"
      />

      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Add Bookmark
      </button>

      {bookmarks.map((b) => (
        <div key={b.id} className="border p-2 flex justify-between">
          <a href={b.url} target="_blank">{b.title}</a>
          <button onClick={() => deleteBookmark(b.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );*/


  /*return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">

      <h2 className="text-2xl font-bold text-gray-800 text-center">
        🔖 Your Bookmarks
      </h2>

      {/* Add Bookmark Form 
      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bookmark Title"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL : https://example.com"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addBookmark}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-lg"
        >
          Add Bookmark
        </button>
        {error && (
        <p className="text-red-500 text-sm font-medium text-center">
            {error}
        </p>
        )}
      </div>

      {/* Bookmark List 
      <div className="space-y-4">
        {bookmarks.length === 0 && (
          <p className="text-center text-gray-500">
            No bookmarks yet. Add one above 👆
          </p>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-start"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">
                {b.title}
              </p>

              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {b.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="ml-4 text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);*/

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-10 px-4">
  {/* Account Wrapper */}
    <div className="w-full flex justify-center sm:justify-end mb-6">

      {/* Account Section */}
      <div className="
        flex items-center gap-2 sm:gap-3
        bg-white/10 backdrop-blur-md
        px-3 py-2 sm:px-4 sm:py-3
        rounded-lg sm:rounded-xl
        max-w-full
      ">

        {/* Avatar */}
        <div className="relative group flex-shrink-0">

          <div className="
            w-8 h-8 sm:w-10 sm:h-10
            rounded-full
            bg-gradient-to-br from-purple-500 to-blue-500
            flex items-center justify-center
            font-semibold text-white
            text-xs sm:text-sm
            cursor-pointer
          ">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          {/* Tooltip (Desktop only) */}
          <div className="
            hidden sm:block
            absolute right-0 top-full mt-2
            w-max max-w-xs
            px-3 py-1.5
            bg-black text-white text-xs
            rounded-md
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            pointer-events-none z-50
          ">
            {user.email}
          </div>

        </div>

        {/* User Info */}
        <div className="text-left min-w-0">

          <p className="hidden sm:block text-xs text-white/60">
            Logged in as
          </p>

          <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[120px] sm:max-w-[180px]">
            {user.email}
          </p>

          <button
            onClick={handleLogout}
            className="text-[10px] sm:text-xs text-white/80 hover:text-white transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>


    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 space-y-8 text-white">

      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
          🔖
        </div>
        <h2 className="text-3xl font-bold">
          Your Bookmarks
        </h2>
        <p className="text-white/70 text-sm mt-2">
          Manage and access your saved links instantly.
        </p>
      </div>

      {/* Add Bookmark Form */}
      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bookmark Title"
          className="w-full bg-white/20 border border-white/30 rounded-xl p-3 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-white/20 border border-white/30 rounded-xl p-3 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        />

       {/* <button
          onClick={addBookmark}
          className="w-full bg-white text-gray-900 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Add Bookmark
        </button> */}
        <button
        onClick={addBookmark}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl shadow-md transition-all duration-300
        ${loading 
            ? "bg-white/70 text-gray-500 cursor-not-allowed" 
            : "bg-white text-gray-900 hover:shadow-lg hover:scale-[1.02]"
        }`}
        >
        {loading && (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        )}

        {loading ? "Adding..." : "Add Bookmark"}
        </button>


        {error && (
          <p className="text-red-300 text-sm text-center font-medium">
            {error}
          </p>
        )}
      </div>

      {/* Bookmark List */}
      <div className="space-y-4">

        {bookmarks.length === 0 && (
          <p className="text-center text-white/70">
            No bookmarks yet. Add one above 👆
          </p>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="bg-white/15 border border-white/20 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all flex justify-between items-start"
          >
            <div className="flex-1">
              <p className="font-semibold text-white">
                {b.title}
              </p>

              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-200 hover:underline break-all"
              >
                {b.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="ml-4 text-red-300 hover:text-red-400 font-medium transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);


}
