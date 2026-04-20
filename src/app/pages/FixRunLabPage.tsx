import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Clock, Target, Star, ChevronRight, Code, Lightbulb, Play, Trophy } from "lucide-react";
import { apiRequest } from "@/lib/api";

type Question = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  subtopic: string;
  difficulty: string;
  type: string;
};

export function FixRunLabPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiRequest<Question[]>('/questions');
        // Filter hanya Fix & Run Lab
        const fixRunLabs = data.filter(q => q.type === 'Fix & Run Lab');
        setQuestions(fixRunLabs);
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
              <Link to="/" className="hover:text-violet-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/learning" className="hover:text-violet-400 transition-colors">
                Pembelajaran
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-violet-400">Fix & Run Lab</span>
            </motion.div>

            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
                <Code className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-pink-300">Fix & Run Lab</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
                Tempat Eksperimen Coding
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Lihat langsung efek dari setiap perubahan kode! Lab ini kasih kamu kode yang broken,
                dan kamu harus fix sambil lihat preview real-time.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="px-6 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">{questions.length}</div>
                  <div className="text-sm text-slate-400">Total Challenges</div>
                </div>
                <div className="px-6 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-rose-400">
                    {questions.reduce((sum, q) => sum + q.xp, 0)}
                  </div>
                  <div className="text-sm text-slate-400">Total XP</div>
                </div>
              </div>
            </motion.div>

            {/* Challenges Grid */}
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center text-slate-400 py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400 mb-4"></div>
                  <p>Memuat challenges...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-400 py-12">
                  <p>{error}</p>
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center text-slate-400 py-12">
                  <p>Belum ada challenges tersedia.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        to={`/challenge/${question.id}`}
                        className="group block h-full"
                      >
                        <div className="h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-pink-500/20 hover:border-pink-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                <Play className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="text-sm text-slate-400">Challenge #{question.id}</div>
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm text-yellow-400">{question.xp} XP</span>
                                </div>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-pink-300 transition-colors line-clamp-2">
                            {question.title}
                          </h3>

                          {/* Subject & Subtopic */}
                          <div className="space-y-1 mb-4">
                            <div className="text-sm text-slate-400">
                              <span className="font-medium text-violet-400">{question.subject}</span>
                              {question.subtopic && ` • ${question.subtopic}`}
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                              <Lightbulb className="w-3 h-3 inline mr-1 text-yellow-400" />
                              Smart Hint
                            </span>
                            <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                              <Target className="w-3 h-3 inline mr-1 text-green-400" />
                              Live Preview
                            </span>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center justify-between pt-4 border-t border-pink-500/20">
                            <span className="text-sm text-slate-400">Mulai Challenge</span>
                            <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            <motion.div
              className="mt-16 max-w-3xl mx-auto p-6 bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3 text-pink-300">💡 Cara Kerja Fix & Run Lab</h3>
              <ul className="space-y-2 text-slate-300">
                <li>🎯 Kamu akan diberikan kode HTML/CSS/JS yang sengaja dibuat broken</li>
                <li>👀 Lihat preview langsung di sebelah kanan editor</li>
                <li>🔧 Perbaiki kode sampai preview menampilkan hasil yang benar</li>
                <li>💡 Gunakan hint jika stuck (biaya XP)</li>
                <li>✅ Validasi otomatis akan cek apakah perbaikanmu benar</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}