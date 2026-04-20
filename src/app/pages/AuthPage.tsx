import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CosmicBackground } from "../components/CosmicBackground";
import { apiRequest, saveAuthToken, saveUserProfile } from "@/lib/api";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: "name" | "email" | "password") => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await apiRequest<{ token: string; user: any }>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      saveAuthToken(response.token);
      saveUserProfile(response.user);
      navigate("/learning");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative flex items-center justify-center p-4">
      <CosmicBackground />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              CODESMIC
            </h1>
          </Link>
          <p className="text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Mulai Petualangan Coding-mu
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>

          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-8 shadow-2xl">
            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                  !isLogin
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "signup"}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Name field - only for signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        type="text"
                        placeholder="Masukkan nama kamu"
                        className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email / Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      type="text"
                      placeholder={isLogin ? "Email atau username" : "Email kamu"}
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      type="password"
                      placeholder="Masukkan password"
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                {/* Forgot password - only for login */}
                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Lupa password?
                    </button>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all overflow-hidden mt-6 disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (isLogin ? "Memeriksa..." : "Mendaftar...") : isLogin ? "Masuk Sekarang" : "Daftar Sekarang"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </motion.form>
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl"></div>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="text-slate-400 hover:text-violet-400 transition-colors inline-flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
