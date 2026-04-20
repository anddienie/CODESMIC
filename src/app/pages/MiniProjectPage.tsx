import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { ChevronRight, Rocket, Clock, Star, CheckCircle2, Code, Layout, Palette } from "lucide-react";

export function MiniProjectPage() {
  const { id } = useParams();

  const projectTasks = [
    { id: 1, title: "Setup struktur HTML", completed: true },
    { id: 2, title: "Bikin section header", completed: true },
    { id: 3, title: "Design section hero", completed: false },
    { id: 4, title: "Tambahin grid fitur", completed: false },
    { id: 5, title: "Style footer", completed: false },
  ];

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
              <span className="text-violet-400">Mini Project #{id}</span>
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
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                          Proyek Integrasi
                        </div>
                        <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">
                          Menengah
                        </div>
                      </div>
                      <h1 className="text-4xl font-bold mb-2">
                        Bikin Landing Page dari Nol
                      </h1>
                      <p className="text-slate-400">
                        Buat <em>landing page</em> lengkap dengan integrasi semua konsep yang udah dipelajari
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Rocket className="w-8 h-8 text-cyan-400" />
                      <span className="text-2xl font-bold text-cyan-400">200</span>
                      <span className="text-xs text-slate-400">Poin XP</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-violet-500/20">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-5 h-5" />
                      <span>2-3 jam</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>2 dari 5 task selesai</span>
                    </div>
                  </div>
                </motion.div>

                {/* Project Brief */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-cyan-400" />
                    Brief Proyek
                  </h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      Bikin <em>landing page</em> profesional buat produk atau layanan fiktif. Proyek ini 
                      integrasikan struktur HTML, styling CSS, <em>responsive design</em>, dan prinsip desain web modern.
                    </p>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Tujuan Proyek:</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Bikin struktur semantik HTML dengan section header, hero, features, dan footer</li>
                        <li>Implementasi <em>layout responsive</em> yang work di desktop dan mobile</li>
                        <li>Terapkan CSS Grid dan Flexbox buat manajemen <em>layout</em></li>
                        <li>Pakai <em>gradient</em>, <em>shadow</em>, dan teknik desain modern</li>
                        <li>Tambahin <em>smooth scroll</em> dan efek <em>hover</em></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Konsep yang Diterapkan:</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Semantic HTML", "CSS Grid", "Flexbox", "Responsive Design", "Gradients", "Animations"].map(
                          (concept) => (
                            <span
                              key={concept}
                              className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm"
                            >
                              {concept}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Task Checklist */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    Checklist Task
                  </h2>
                  <div className="space-y-3">
                    {projectTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                          task.completed
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-slate-950/50 border-violet-500/20 hover:border-violet-500/40"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            task.completed
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-violet-500/40"
                          }`}
                        >
                          {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className={task.completed ? "text-emerald-300 line-through" : "text-white"}>
                          {task.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Workspace */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-violet-400" />
                    Workspace Konseptual
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button className="px-4 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-700 transition-colors">
                      Editor HTML
                    </button>
                    <button className="px-4 py-2 bg-slate-800/50 border border-violet-500/30 rounded-lg font-semibold hover:bg-slate-800/70 transition-colors">
                      Editor CSS
                    </button>
                  </div>
                  <div className="h-96 bg-slate-950/50 border border-violet-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Workspace code editor</p>
                      <p className="text-sm">(Mockup konseptual)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all">
                    Lanjutin Proyek
                  </button>
                  <button className="px-8 py-4 bg-slate-800/50 border border-violet-500/30 rounded-lg font-semibold text-lg hover:bg-slate-800/70 hover:border-violet-500/50 transition-all">
                    Simpan Progress
                  </button>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Design Guidelines */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-pink-400" />
                    Panduan Desain
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Palet Warna</div>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-violet-600 border border-violet-500/40"></div>
                        <div className="w-10 h-10 rounded-lg bg-purple-600 border border-purple-500/40"></div>
                        <div className="w-10 h-10 rounded-lg bg-pink-600 border border-pink-500/40"></div>
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Struktur Layout</div>
                      <div className="space-y-2">
                        <div className="h-8 bg-violet-500/20 border border-violet-500/30 rounded flex items-center px-3 text-xs">
                          Header (Fixed)
                        </div>
                        <div className="h-20 bg-purple-500/20 border border-purple-500/30 rounded flex items-center px-3 text-xs">
                          Hero Section
                        </div>
                        <div className="h-16 bg-pink-500/20 border border-pink-500/30 rounded flex items-center px-3 text-xs">
                          Features Grid
                        </div>
                        <div className="h-8 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center px-3 text-xs">
                          Footer
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Stats */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4">Progress Proyek</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Penyelesaian</span>
                        <span className="text-cyan-300 font-semibold">40%</span>
                      </div>
                      <div className="h-3 bg-slate-950/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[40%] rounded-full"></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-violet-500/20">
                      <div className="text-sm text-slate-400 mb-2">Waktu Dihabiskan</div>
                      <div className="text-2xl font-bold text-white">1j 15m</div>
                    </div>
                    <div className="pt-4 border-t border-violet-500/20">
                      <div className="text-sm text-slate-400 mb-2">Potensi XP</div>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-2xl font-bold text-yellow-400">200 XP</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Related Resources */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-emerald-400" />
                    Template
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors text-left">
                      <div className="font-semibold text-violet-300 text-sm">Template Starter</div>
                      <div className="text-xs text-slate-400">Struktur dasar HTML/CSS</div>
                    </button>
                    <button className="w-full p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors text-left">
                      <div className="font-semibold text-violet-300 text-sm">Contoh Layout</div>
                      <div className="text-xs text-slate-400">Desain referensi</div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}