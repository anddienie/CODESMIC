import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Target, Star, Code2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useScrollToTop } from "@/lib/useScrollToTop";

type MiniProject = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  subtopic: string;
  difficulty: string;
  type: string;
};

export function MiniProjectBuilderPage() {
  useScrollToTop();
  const [projects, setProjects] = useState<MiniProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiRequest<MiniProject[]>('/questions');
        const miniProjects = data.filter(q => q.type === 'Mini Project Builder');
        setProjects(miniProjects);
      } catch (err) {
        setError((err as Error).message || 'Gagal memuat daftar proyek.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
              <Link to="/" className="hover:text-teal-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/learning" className="hover:text-teal-400 transition-colors">
                Pembelajaran
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-teal-400">Mini Project Builder</span>
            </motion.div>

            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 mb-6">
                <Code3 className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-300">Mini Project Builder</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Bangun Proyek Nyata
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Waktunya bikin sesuatu yang nyata! Di sini kamu akan develop mini projects lengkap dari awal sampai akhir.
                Setiap project integrasikan berbagai konsep yang sudah dipelajari.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="px-6 py-3 bg-slate-800/50 border border-teal-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-teal-400">{projects.length}</div>
                  <div className="text-sm text-slate-400">Projects Available</div>
                </div>
                <div className="px-6 py-3 bg-slate-800/50 border border-teal-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">Advanced</div>
                  <div className="text-sm text-slate-400">Difficulty Level</div>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-slate-400">Memuat mini projects...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="rounded-3xl bg-red-500/20 border border-red-500/40 p-10 text-center text-red-100">
                {error}
              </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && projects.length === 0 && (
              <div className="text-center text-slate-400 py-12">
                <p>Belum ada mini projects tersedia. Coba lagi nanti!</p>
              </div>
            )}

            {!loading && !error && projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/mini-project/${project.id}`} className="group block h-full">
                      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-teal-500/20 group-hover:border-teal-500/40 transition-all h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-sm text-slate-400 mb-3">{project.subtopic}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                              {project.difficulty}
                            </span>
                            <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/30 rounded-full text-xs text-slate-300">
                              {project.subject}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/30">
                            <div className="flex items-center gap-2 text-teal-400">
                              <Star className="w-4 h-4" />
                              <span className="text-sm font-semibold">{project.xp} XP</span>
                            </div>
                            <div className="text-slate-400 group-hover:text-teal-300 transition-colors">
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
