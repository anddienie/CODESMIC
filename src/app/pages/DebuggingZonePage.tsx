import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, Bug, Target, Star, Zap } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useScrollToTop } from "@/lib/useScrollToTop";

type Question = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  subtopic: string;
  difficulty: string;
  type: string;
};

export function DebuggingZonePage() {
  useScrollToTop();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiRequest<Question[]>('/questions');
        const debugQuestions = data.filter(q => q.type === 'Debugging Zone');
        setQuestions(debugQuestions);
      } catch (err) {
        setError((err as Error).message || 'Gagal memuat daftar soal.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'mudah':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'sedang':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'sulit':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
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
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/learning" className="hover:text-amber-400 transition-colors">
                Pembelajaran
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-amber-400">Debugging Zone</span>
            </motion.div>

            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                <Bug className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-300">Debugging Zone</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Zone Debugging Fokus
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Zone khusus buat master debugging! Sistem akan track kesalahan yang sering kamu buat,
                kasih analysis pattern error, dan bantuin kamu paham kenapa terjadi.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="px-6 py-3 bg-slate-800/50 border border-amber-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400">{questions.length}</div>
                  <div className="text-sm text-slate-400">Debugging Cases</div>
                </div>
                <div className="px-6 py-3 bg-slate-800/50 border border-amber-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">Intermediate</div>
                  <div className="text-sm text-slate-400">Difficulty Level</div>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-slate-400">Memuat debugging cases...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="rounded-3xl bg-red-500/20 border border-red-500/40 p-10 text-center text-red-100">
                {error}
              </div>
            )}

            {/* Cases Grid */}
            {!loading && !error && questions.length === 0 && (
              <div className="text-center text-slate-400 py-12">
                <p>Belum ada debugging cases tersedia. Coba lagi nanti!</p>
              </div>
            )}

            {!loading && !error && questions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/challenge/${question.id}`} className="group block h-full">
                      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-amber-500/20 group-hover:border-amber-500/40 transition-all h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                                {question.title}
                              </h3>
                              <p className="text-sm text-slate-400 mb-3">{question.subtopic}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                            <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/30 rounded-full text-xs text-slate-300">
                              {question.subject}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/30">
                            <div className="flex items-center gap-2 text-amber-400">
                              <Star className="w-4 h-4" />
                              <span className="text-sm font-semibold">{question.xp} XP</span>
                            </div>
                            <div className="text-slate-400 group-hover:text-amber-300 transition-colors">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
