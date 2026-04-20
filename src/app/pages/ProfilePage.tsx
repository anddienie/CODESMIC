import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Mail, MapPin, Calendar, Award, Trophy, Star, Edit2, Settings } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { apiRequest, getAuthToken, removeAuthToken, type UserProfile } from "@/lib/api";

export function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError("Silakan login untuk melihat profil.");
      setLoading(false);
      return;
    }

    apiRequest<{ user: UserProfile }>("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Gagal memuat profil.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />

        <section className="relative pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {loading ? (
              <div className="rounded-3xl bg-slate-900/90 border border-violet-500/30 p-10 text-center text-white">
                Memuat profil...
              </div>
            ) : error ? (
              <div className="rounded-3xl bg-red-500/20 border border-red-500/40 p-10 text-center text-red-100">
                {error}
              </div>
            ) : userData ? (
              <>
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`}
                            alt={userData.name}
                            className="w-full h-full rounded-full bg-slate-800"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 border-4 border-slate-900 flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold">{userData.level}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm font-semibold text-violet-300">
                                {userData.rank}
                              </span>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-violet-500/30 rounded-lg hover:bg-slate-800 hover:border-violet-500/50 transition-all">
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">{userData.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">{userData.role}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">{userData.institution}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">Bergabung {userData.joinDate}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300">Level {userData.level}</span>
                            <span className="text-violet-400 font-semibold">
                              {userData.xp} / {userData.maxXp} XP
                            </span>
                          </div>
                          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(userData.xp / userData.maxXp) * 100}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-8 h-8 text-violet-400" />
                      <span className="text-3xl font-bold text-violet-400">{userData.challengesCompleted}</span>
                    </div>
                    <h3 className="text-slate-300 text-sm">Challenges Selesai</h3>
                  </motion.div>

                  <motion.div
                    className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-purple-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-8 h-8 text-purple-400" />
                      <span className="text-3xl font-bold text-purple-400">{userData.projectsCompleted}</span>
                    </div>
                    <h3 className="text-slate-300 text-sm">Projects Selesai</h3>
                  </motion.div>

                  <motion.div
                    className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-pink-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-8 h-8 text-pink-400" />
                      <span className="text-3xl font-bold text-pink-400">{userData.level}</span>
                    </div>
                    <h3 className="text-slate-300 text-sm">Current Level</h3>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-violet-400" />
                      Aktivitas Terakhir
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        <div>
                          <p className="text-sm font-medium text-white">Info profil tersinkronisasi dengan backend.</p>
                          <p className="text-xs text-slate-400 mt-1">Data aktivitas akan ditambahkan sesuai aktivitas pengguna di sistem.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-violet-400" />
                      Pengaturan
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all">
                        <span className="text-sm">Ubah Password</span>
                        <Edit2 className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all">
                        <span className="text-sm">Edit Informasi Profil</span>
                        <Edit2 className="w-4 h-4 text-slate-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeAuthToken();
                          navigate("/");
                        }}
                        className="w-full flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-all text-red-400"
                      >
                        <span className="text-sm">Logout</span>
                        <Edit2 className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : null}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
