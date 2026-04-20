import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { Clock, Target, Star, ChevronRight, Code, Lightbulb, Play } from "lucide-react";
import { apiRequest } from "../../lib/api";

type QuestionDetail = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  difficulty: string;
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
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

                {/* Analysis Space */}
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

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all flex items-center justify-center gap-2 group">
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Mulai Coding
                  </button>
                  <Link
                    to="/hint/1"
                    className="px-8 py-4 bg-slate-800/50 border border-violet-500/30 rounded-lg font-semibold text-lg hover:bg-slate-800/70 hover:border-violet-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Lightbulb className="w-5 h-5" />
                    Pakai Hint
                  </Link>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Resources */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4">Resource Membantu</h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">Elemen Nav HTML</div>
                      <div className="text-xs text-slate-400">Dokumentasi MDN</div>
                    </a>
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">CSS Position Property</div>
                      <div className="text-xs text-slate-400">Panduan CSS Tricks</div>
                    </a>
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">Panduan Flexbox</div>
                      <div className="text-xs text-slate-400">Panduan Lengkap</div>
                    </a>
                  </div>
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