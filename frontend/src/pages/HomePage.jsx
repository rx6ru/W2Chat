import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Blend, MessageSquareQuote } from "lucide-react";

const HomePage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-base-100">
      <header className="flex items-center justify-between w-full max-w-2xl py-8 mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg size-10 bg-primary/10">
            <MessageSquareQuote className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight">W2Chat</span>
        </div>
        <div className="flex items-center gap-2">
          <Blend className="w-5 h-5 text-base-content/70" />
          <select
            className="select select-sm select-bordered"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            {THEMES.map(t => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold sm:text-5xl">
          Welcome to <span className="text-primary">W2Chat</span>
        </h1>
        <p className="max-w-xl mb-6 text-lg text-base-content/70">
          A modern, minimal, real-time chat app. Secure, fast, and beautiful. <br />
          Built with the latest tech and fully themeable with DaisyUI.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="px-8 rounded-full shadow btn btn-primary btn-lg">
            Sign Up
          </Link>
          <Link to="/login" className="px-8 rounded-full btn btn-outline btn-lg">
            Log In
          </Link>
        </div>
      </main>
      <footer className="w-full max-w-2xl py-6 mx-auto text-xs text-center text-base-content/60">
        &copy; {new Date().getFullYear()} W2Chat. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;