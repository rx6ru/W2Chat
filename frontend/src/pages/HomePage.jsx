import { Link } from "react-router-dom";
import { MessageSquareQuote } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 pt-24 font-sans bg-base-100">
      <main className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 mb-2 shadow-lg bg-primary rounded-2xl animate-pulse">
            <MessageSquareQuote className="w-10 h-10 text-primary-content" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight font-[Inter]">
            <span className="text-base-content">Welcome to</span>{" "}
            <span className="text-primary drop-shadow">W2Chat</span>
          </h1>
        </div>
        <p className="max-w-xl text-lg sm:text-xl text-base-content/70 font-medium font-[Inter]">
          A modern, minimal, real-time chat app.<br />
          <span className="text-base-content/90">
            Secure, fast, and beautiful.<br />
            <span className="font-bold text-primary">Powered by DaisyUI themes.</span>
          </span>
        </p>
        <div className="flex flex-col justify-center w-full max-w-xs gap-4 sm:flex-row sm:max-w-none">
          <Link
            to="/signup"
            className="font-bold tracking-wider uppercase transition-transform rounded-full shadow-lg btn btn-primary btn-lg hover:scale-105"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="font-bold tracking-wider uppercase transition-transform rounded-full shadow btn btn-outline btn-lg hover:scale-105"
          >
            Log In
          </Link>
        </div>
      </main>
      <footer className="w-full max-w-2xl py-6 mx-auto font-mono text-xs tracking-widest text-center text-base-content/60">
        &copy; {new Date().getFullYear()} W2Chat. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;