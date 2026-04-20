import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Trophy, Star, TrendingUp, Target, Rocket, Zap, Award, ChevronRight } from "lucide-react";
import { apiRequest, getAuthToken } from "@/lib/api";

interface ProgressState {
  level: number;
  xp: number;
  maxXp: number;
  challengesCompleted: number;
  projectsCompleted: number;
}

interface ActivityItem {
  title: string;
  xp: number;
  time: string;
  type: string;
}

const baseGalaxyLevels = [
  { level: 1, name: "Sabuk Asteroid", xp: 100, color: "violet" },
  { level: 2, name: "Stasiun Bulan", xp: 250, color: "purple" },
  { level: 3, name: "Koloni Mars", xp: 500, color: "pink" },
  { level: 4, name: "Orbit Jupiter", xp: 850, color: "blue" },
  { level: 5, name: "Cincin Saturnus", xp: 1200, color: "cyan" },
  { level: 6, name: "Kedalaman Neptunus", xp: 1600, color: "emerald" },
  { level: 7, name: "Pos Pluto", xp: 2000, color: "amber" },
  { level: 8, name: "Gerbang Andromeda", xp: 2500, color: "rose" },
];

const achievements = [
  { icon: Star, title: "Langkah Pertama", description: "Selesaiin tantangan pertama kamu", earned: true },
  { icon: Zap, title: "Speed Coder", description: "Selesaiin tantangan dalam waktu kurang dari 10 menit", earned: true },
  { icon: Target, title: "Skor Sempurna", description: "Dapet 100% di tantangan apapun", earned: true },
  { icon: Rocket, title: "Pelopor Proyek", description: "Selesaiin mini project pertama", earned: false },
  { icon: Trophy, title: "Master Galaksi", description: "Capai level 5", earned: false },
  { icon: Award, title: "Konstelasi", description: "Selesaiin 50 tantangan", earned: false },
];

export function ProgressTrackerPage() {
  const [progress, setProgress] = useState<ProgressState>({
    level: 1,
    xp: 0,
    maxXp: 100,
    challengesCompleted: 0,
    projectsCompleted: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const progressPercent = Math.min(100, Math.round((progress.xp / progress.maxXp) * 100));
  const currentLevelData = baseGalaxyLevels.find((level) => level.level === progress.level);
  const currentLevelName = currentLevelData ? currentLevelData.name : "Level Baru";

  const levelColorClasses: Record<string, { wrapper: string; active: string; glow: string }> = {
    violet: {
      wrapper: "bg-violet-500/10 border-violet-500/30",
      active: "bg-violet-500/20 border-violet-500/40 ring-2 ring-violet-500/30",
      glow: "bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/50",
    },
    purple: {
      wrapper: "bg-purple-500/10 border-purple-500/30",
      active: "bg-purple-500/20 border-purple-500/40 ring-2 ring-purple-500/30",
      glow: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50",
    },
    pink: {
      wrapper: "bg-pink-500/10 border-pink-500/30",
      active: "bg-pink-500/20 border-pink-500/40 ring-2 ring-pink-500/30",
      glow: "bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/50",
    },
    blue: {
      wrapper: "bg-blue-500/10 border-blue-500/30",
      active: "bg-blue-500/20 border-blue-500/40 ring-2 ring-blue-500/30",
      glow: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50",
    },
    cyan: {
      wrapper: "bg-cyan-500/10 border-cyan-500/30",
      active: "bg-cyan-500/20 border-cyan-500/40 ring-2 ring-cyan-500/30",
      glow: "bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/50",
    },
    emerald: {
      wrapper: "bg-emerald-500/10 border-emerald-500/30",
      active: "bg-emerald-500/20 border-emerald-500/40 ring-2 ring-emerald-500/30",
      glow: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50",
    },
    amber: {
      wrapper: "bg-amber-500/10 border-amber-500/30",
      active: "bg-amber-500/20 border-amber-500/40 ring-2 ring-amber-500/30",
      glow: "bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/50",
    },
    rose: {
      wrapper: "bg-rose-500/10 border-rose-500/30",
      active: "bg-rose-500/20 border-rose-500/40 ring-2 ring-rose-500/30",
      glow: "bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/50",
    },
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError("Silakan login untuk melihat progress.");
      setLoading(false);
      return;
    }

    apiRequest<{ progress: ProgressState; recentActivity: ActivityItem[] }>(
      "/progress",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((data) => {
        setProgress(data.progress);
        setRecentActivity(data.recentActivity);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Gagal memuat progress.");
      })
      .finally(() => setLoading(false));
  }, []);

  const galaxyLevels = baseGalaxyLevels.map((level) => ({
    ...level,
    completed: progress.level > level.level,
    current: progress.level === level.level,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />

        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Perjalanan Cosmic-mu
              </h1>
              <p className="text-xl text-slate-300">
                Lacak progress kamu di semesta CODSSPHERE
              </p>
            </motion.div>

            {loading ? (
              <div className="rounded-3xl bg-slate-900/90 border border-violet-500/30 p-10 text-center text-white">
                Memuat progress...
              </div>
            ) : error ? (
              <div className="rounded-3xl bg-red-500/20 border border-red-500/40 p-10 text-center text-red-100">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-violet-400" />
                        <span className="text-3xl font-bold text-violet-400">{progress.level}</span>
                      </div>
                      <div className="text-sm text-slate-300">Level Saat Ini</div>
                      <div className="text-xs text-slate-400">{currentLevelName}</div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                        <span className="text-3xl font-bold text-yellow-400">{progress.xp}</span>
                      </div>
                      <div className="text-sm text-slate-300">Total XP</div>
                      <div className="text-xs text-slate-400">{progress.maxXp - progress.xp} XP ke level berikutnya</div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Target className="w-8 h-8 text-emerald-400" />
                        <span className="text-3xl font-bold text-emerald-400">{progress.challengesCompleted}</span>
                      </div>
                      <div className="text-sm text-slate-300">Tantangan Selesai</div>
                      <div className="text-xs text-slate-400">Project selesai {progress.projectsCompleted}</div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Rocket className="w-6 h-6 text-violet-400" />
                      Progress Jalur Galaksi
                    </h2>

                    <div className="space-y-4">
                      {galaxyLevels.map((level, index) => (
                        <motion.div
                          key={level.level}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                              level.completed
                                ? levelColorClasses[level.color]?.wrapper
                                : level.current
                                ? levelColorClasses[level.color]?.active
                                : "bg-slate-950/30 border-slate-700/30"
                            }`}
                          >
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                                level.completed || level.current
                                  ? levelColorClasses[level.color]?.glow
                                  : "bg-slate-800 border-2 border-slate-700"
                              }`}
                            >
                              {level.completed ? (
                                <Star className="w-8 h-8 text-white fill-white" />
                              ) : (
                                <span className="text-2xl font-bold text-white">{level.level}</span>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-white">Level {level.level}</h3>
                                {level.current && (
                                  <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs">
                                    Saat Ini
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-300 mb-2">{level.name}</p>
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Star className="w-4 h-4" />
                                <span>{level.xp} XP Dibutuhkan</span>
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              {level.completed ? (
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              ) : level.current ? (
                                <ChevronRight className="w-8 h-8 text-violet-400" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-slate-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>

                          {index < galaxyLevels.length - 1 && (
                            <div className="ml-8 h-8 border-l-2 border-dashed border-violet-500/30"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                      Aktivitas Terbaru
                    </h2>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                activity.type === "project"
                                  ? "bg-cyan-500/20 border border-cyan-500/30"
                                  : "bg-violet-500/20 border border-violet-500/30"
                              }`}
                            >
                              {activity.type === "project" ? (
                                <Rocket className="w-5 h-5 text-cyan-400" />
                              ) : (
                                <Target className="w-5 h-5 text-violet-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{activity.title}</div>
                              <div className="text-sm text-slate-400">{activity.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span>+{activity.xp}</span>
                          </div>
                        </motion.div>
                      ))}
                      {recentActivity.length === 0 && (
                        <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 text-slate-300">
                          Belum ada aktivitas terbaru. Selesaikan tantangan untuk melihat pembaruan di sini.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Pencapaian
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.title}
                          className={`p-3 rounded-lg border transition-all ${
                            achievement.earned
                              ? "bg-yellow-500/10 border-yellow-500/30"
                              : "bg-slate-950/30 border-slate-700/30 opacity-60"
                          }`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: achievement.earned ? 1 : 0.6, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                achievement.earned
                                  ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                                  : "bg-slate-800"
                              }`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-white">{achievement.title}</div>
                              <div className="text-xs text-slate-400">{achievement.description}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-4">Milestone Berikutnya</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{progress.level + 1}</span>
                        </div>
                        <div>
                          <div className="font-bold text-white">{currentLevelName}</div>
                          <div className="text-sm text-slate-400">Level {progress.level + 1}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Progress ke level berikutnya</span>
                        <span className="text-violet-300 font-semibold">{progressPercent}%</span>
                      </div>
                      <div className="h-3 bg-slate-950/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent};%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="text-xs text-slate-400 mt-2">{progress.maxXp - progress.xp} XP diperlukan</div>
                    </div>
                  </div>
                </motion.div>


              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
