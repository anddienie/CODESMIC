import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Rocket, TrendingUp, User, LogIn, LogOut } from "lucide-react";
import { getAuthToken, removeAuthToken } from "@/lib/api";
import { useState, useEffect } from "react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
    setIsMenuOpen(false); // Close menu when location changes
  }, [location]);

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/learning", label: "Pembelajaran", icon: Rocket },
    { path: "/progress", label: "Progress Tracker", icon: TrendingUp },
    // Only show Profile in nav if NOT logged in - when logged in, use dropdown instead
    ...(isLoggedIn ? [] : [{ path: "/profile", label: "Profile", icon: User }]),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-transparent backdrop-blur-md border-b border-violet-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/50">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CODESMIC
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                      : "text-slate-400 hover:text-violet-300 hover:bg-violet-500/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm hidden md:inline">{item.label}</span>
                </Link>
              );
            })}

            {/* Login/Auth Button or User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Profile</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-violet-500/30 rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Lihat Profil
                    </Link>
                    <button
                      onClick={() => {
                        removeAuthToken();
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}