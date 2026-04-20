import { Link, useLocation } from "react-router";
import { Home, Rocket, TrendingUp, User, LogIn } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/learning", label: "Pembelajaran", icon: Rocket },
    { path: "/progress", label: "Progress Tracker", icon: TrendingUp },
    { path: "/profile", label: "Profile", icon: User },
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

            {/* Login/Auth Button */}
            <Link
              to="/auth"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}