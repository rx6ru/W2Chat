import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquareQuote, User, Mail, Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success) {
      login(formData);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-base-100">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 w-full max-w-2xl">
        <div className="w-full space-y-8 bg-base-100 p-8 sm:p-12 rounded-2xl shadow-sm border border-base-200">
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="flex items-center justify-center transition-colors size-12 rounded-xl bg-primary/10 group-hover:bg-primary/20"
              >
                <MessageSquareQuote className="size-6 text-primary" aria-hidden="true" />
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-base-content">Welcome Back</h1>
              <p className="text-sm font-medium text-base-content/70">Log in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text text-base-content/70">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 h-12 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text text-base-content/70">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40" aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 h-12 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all`}
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" aria-hidden="true" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full btn btn-primary h-12 rounded-xl font-semibold tracking-wide transition-transform active:scale-95" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;