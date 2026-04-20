import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-violet-500/20 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 w-fit hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/50">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CODESMIC
              </span>
            </Link>
            <p className="text-slate-400 max-w-md">
              Code Cosmic - Petualangan coding di luar angkasa. Eksplorasi <em>problem solving</em> HTML dan CSS sambil navigasi kosmos web development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigasi Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-violet-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-slate-400 hover:text-violet-400 transition-colors">
                  Pembelajaran
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-slate-400 hover:text-violet-400 transition-colors">
                  Progress Tracker
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-400 hover:text-violet-400 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Terhubung</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 border border-violet-500/20 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/40 transition-all"
              >
                <Github className="w-5 h-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 border border-violet-500/20 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/40 transition-all"
              >
                <Twitter className="w-5 h-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 border border-violet-500/20 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/40 transition-all"
              >
                <Linkedin className="w-5 h-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 border border-violet-500/20 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/40 transition-all"
              >
                <Mail className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-violet-500/20 text-center text-slate-400 text-sm">
          <p>&copy; 2026 CODESMIC. All rights reserved. | Platform Pembelajaran Interaktif</p>
        </div>
      </div>
    </footer>
  );
}