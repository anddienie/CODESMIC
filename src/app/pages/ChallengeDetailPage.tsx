import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Clock, Star, ChevronRight, Code, Lightbulb, Play, Lock, Unlock, Sparkles } from "lucide-react";
import { apiRequest } from "../../lib/api";

type QuestionDetail = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  difficulty: string;
  type: string;
  mini_materi: string;
  task: string;
  code_html: string;
  code_css: string;
  code_js: string;
  hint1: string;
  hint2: string;
  hint3: string;
};

export function ChallengeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([0]);
  const [userXp, setUserXp] = useState(150);

  const hintCosts = [0, 5, 10];
  const showThinkFirst = question && (question.type === "Debugging Zone" || question.type === "Code Challenge Arena");

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        const data = await apiRequest<QuestionDetail>(`/questions/${id}`);
        setQuestion(data);
      } catch (err) {
        setError((err as Error).message || 'Gagal memuat soal.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleUnlockHint = (hintIndex: number) => {
    if (!unlockedHints.includes(hintIndex) && userXp >= hintCosts[hintIndex]) {
      setUnlockedHints([...unlockedHints, hintIndex]);
      setUserXp(userXp - hintCosts[hintIndex]);
    }
  };

  const getHintText = (hintIndex: number): string => {
    if (!question) return "";
    const hintFields = [question.hint1, question.hint2, question.hint3];
    return hintFields[hintIndex] || "Hint tidak tersedia";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />

        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            {/* Breadcrumb */}
            <motion.div
              className="flex items-center gap-2 text-sm text-slate-400 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/" className="hover:text-violet-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-violet-400">Tantangan #{id}</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {loading ? (
                    <div className="text-slate-400">Memuat soal...</div>
                  ) : error ? (
                    <div className="text-red-400">{error}</div>
                  ) : question ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm">
                          {question.subject}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm">
                          {question.difficulty}
                        </div>
                      </div>
                      <h1 className="text-4xl font-bold mb-2">{question.title}</h1>
                      <p className="text-slate-400">{question.mini_materi}</p>
                      <div className="flex items-center gap-6 pt-4 border-t border-violet-500/20">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-5 h-5" />
                          <span>Fix & Run Lab</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span>{question.xp} XP</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-400">Soal tidak ditemukan.</div>
                  )}
                </motion.div>

                {/* Problem Description */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-violet-400" />
                    Deskripsi Tantangan
                  </h2>
                  {loading ? (
                    <div className="text-slate-400">Memuat detail tantangan...</div>
                  ) : error ? (
                    <div className="text-red-400">{error}</div>
                  ) : question ? (
                    <div className="space-y-4 text-slate-300">
                      <p>{question.task}</p>
                      <div>
                        <h3 className="font-semibold text-white mb-2">Yang Harus Dipenuhi:</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Ikuti instruksi tugas dengan tepat.</li>
                          <li>Gunakan HTML, CSS, dan JavaScript sesuai kebutuhan.</li>
                          <li>Periksa hasil langsung dengan browser.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2">Core Formasi:</h3>
                        <p>{question.mini_materi}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400">Soal tidak tersedia.</div>
                  )}
                </motion.div>

                {/* Analysis Space - Think First (Conditional) */}
                {showThinkFirst && (
                  <motion.div
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                      ThinkFirst: Prediksi & Analisis
                    </h2>
                    <p className="text-slate-400 mb-4">
                      Sebelum mulai ngoding, coba prediksi hasilnya dulu dan analisis masalahnya:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-violet-300 mb-2">
                          Menurut kamu, hasilnya bakal kayak gimana? 🤔
                        </label>
                        <textarea
                          className="w-full h-32 bg-slate-950/50 border border-violet-500/20 rounded-lg p-4 text-white placeholder-slate-500 focus:border-violet-500/40 focus:outline-none resize-none"
                          placeholder="Deskripsikan prediksi kamu di sini...&#10;Contoh: 'Kayaknya bakal ada bar horizontal di atas dengan logo di kiri...'"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-violet-300 mb-2">
                          Analisis kamu tentang masalah ini:
                        </label>
                        <textarea
                          className="w-full h-32 bg-slate-950/50 border border-violet-500/20 rounded-lg p-4 text-white placeholder-slate-500 focus:border-violet-500/40 focus:outline-none resize-none"
                          placeholder="Tulis analisis kamu...&#10;&#10;• Elemen HTML apa aja yang dibutuhin?&#10;• CSS properties apa yang penting?&#10;• Gimana struktur kodenya?&#10;• Challenge apa yang mungkin muncul?"
                        />
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold transition-colors">
                      Simpan Analisis
                    </button>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => navigate(`/challenge/${id}/editor`)}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Mulai Coding
                  </button>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Smart Hints System */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Hint System
                  </h3>
                  <div className="space-y-3">
                    {[0, 1, 2].map((hintIndex) => {
                      const isUnlocked = unlockedHints.includes(hintIndex);
                      const canUnlock = hintIndex === 0 || unlockedHints.includes(hintIndex - 1);
                      const cost = hintCosts[hintIndex];

                      return (
                        <motion.div
                          key={hintIndex}
                          className={`border rounded-lg p-4 transition-all ${
                            isUnlocked
                              ? "border-yellow-500/40 bg-yellow-500/10"
                              : canUnlock
                              ? "border-violet-500/30 bg-slate-950/50 hover:border-violet-500/50"
                              : "border-slate-700/30 bg-slate-950/30 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isUnlocked
                                    ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                                    : canUnlock
                                    ? "bg-gradient-to-br from-violet-500 to-purple-500"
                                    : "bg-slate-800"
                                }`}
                              >
                                {isUnlocked ? (
                                  <Unlock className="w-3 h-3 text-white" />
                                ) : (
                                  <Lock className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  Hint {hintIndex + 1}
                                </p>
                                {cost > 0 && !isUnlocked && (
                                  <span className="text-xs text-slate-400">{cost} XP</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {isUnlocked ? (
                            <motion.div
                              className="mt-2 p-3 bg-slate-950/50 border border-yellow-500/20 rounded text-sm text-slate-200"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              {getHintText(hintIndex)}
                            </motion.div>
                          ) : canUnlock ? (
                            <button
                              onClick={() => handleUnlockHint(hintIndex)}
                              disabled={userXp < cost}
                              className={`mt-2 w-full px-3 py-2 rounded text-xs font-semibold transition-all ${
                                userXp >= cost
                                  ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              {cost > 0 ? `Unlock (${cost} XP)` : "Buka"}
                            </button>
                          ) : (
                            <div className="mt-2 p-2 text-center text-xs text-slate-500">
                              Buka hint sebelumnya dulu
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    className="mt-4 p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300">
                        <span className="text-yellow-400 font-semibold">XP Kamu:</span> {userXp} XP
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Progress Stats */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4">Progress Kamu</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Tantangan Selesai</span>
                        <span className="text-violet-300 font-semibold">12/50</span>
                      </div>
                      <div className="h-2 bg-slate-950/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 w-[24%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Total XP Terkumpul</span>
                        <span className="text-yellow-400 font-semibold">850 XP</span>
                      </div>
                      <div className="h-2 bg-slate-950/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[42%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}