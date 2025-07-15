import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavStore } from "../store/useNavStore";
import { LogOut, MessageSquareQuote, Blend, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { prevRoute, setPrevRoute } = useNavStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper for toggle navigation
  const handleNavToggle = (target) => {
    if (location.pathname === target) {
      navigate(prevRoute || "/");
    } else {
      setPrevRoute(location.pathname);
      navigate(target);
    }
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-base-100 border-base-300 backdrop-blur-lg">
      <div className="container h-16 px-4 mx-auto">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="flex items-center justify-center rounded-lg size-9 bg-primary/10">
                <MessageSquareQuote className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">W2chat</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavToggle("/theme")}
              className="gap-2 transition-colors btn btn-sm"
            >
              <Blend className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </button>
            {authUser && (
              <>
                <button
                  onClick={() => handleNavToggle("/profile")}
                  className="gap-2 btn btn-sm"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;