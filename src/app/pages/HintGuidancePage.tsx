import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Lightbulb, Lock, Unlock, Sparkles, ArrowRight, Code, Eye } from "lucide-react";
import { useState } from "react";

export function HintGuidancePage() {
  const { id } = useParams();
  const [unlockedHints, setUnlockedHints] = useState([0]);

  const hints = [
    {
      level: 1,
      title: "Pahami Strukturnya",
      description: "Pikirkan elemen HTML apa yang kamu butuhin buat navigation bar.",
      content: "Mulai dengan konsider HTML semantik. Navigation bar biasanya pakai elemen <nav> sebagai container. Di dalamnya, kamu butuh cara buat organize link-link - elemen HTML apa yang paling cocok buat bikin list items?",
      cost: 0,
    },
    {
      level: 2,
      title: "Konsep Positioning",
      description: "Pelajari cara bikin navigasi stick di atas halaman.",
      content: "Biar navigasi tetap keliatan waktu scrolling, kamu perlu pakai CSS positioning. Property 'position: fixed' digabung sama 'top: 0' bakal anchor nav bar kamu ke atas viewport. Jangan lupa tambahin z-index biar tetep di atas konten lain!",
      cost: 10,
    },
    {
      level: 3,
      title: "Strategi Layout",
      description: "Temuin cara atur items secara horizontal di nav bar.",
      content: "Flexbox perfect buat navigation layouts! Pakai 'display: flex' di nav container kamu. Buat spacing items dengan nice, coba 'justify-content: space-between' atau 'space-around'. Buat align items secara vertikal, 'align-items: center' works wonderfully.",
      cost: 15,
    },
    {
      level: 4,
      title: "Sentuhan Styling",
      description: "Tambahin polish visual buat bikin navigasi kamu standout.",
      content: "Pertimbangkan buat tambahin: 1) Background gradient pakai 'background: linear-gradient()' 2) Box shadow buat depth: 'box-shadow: 0 2px 8px rgba(0,0,0,0.1)' 3) Smooth transitions on hover: 'transition: all 0.3s ease' 4) Padding buat spacing: 'padding: 1rem 2rem'",
      cost: 20,
    },
    {
      level: 5,
      title: "Jalur Solusi Lengkap",
      description: "Panduan step-by-step buat bikin seluruh navigation.",
      content: "Pendekatan penuh: 1) Bikin <nav> dengan nested <ul> dan <li> elements 2) Apply position: fixed, width: 100%, dan top: 0 3) Pakai flexbox buat layout 4) Style links pakai padding, hapus default underlines 5) Tambahin hover states dengan background atau color changes 6) Include media queries buat responsiveness",
      cost: 30,
    },
  ];

  const unlockHint = (index: number) => {
    if (!unlockedHints.includes(index)) {
      setUnlockedHints([...unlockedHints, index]);
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
              <Link to="/challenge/1" className="hover:text-violet-400 transition-colors">
                Tantangan #{id}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-violet-400">Hint</span>
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
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">Smart Hint System</h1>
                      <p className="text-slate-400">
                        Unlock jalur cosmic buat nge-guide perjalanan solusi kamu
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <p className="font-semibold text-yellow-300 mb-1">Hint Progresif</p>
                        <p>
                          Setiap hint build on yang sebelumnya, nge-guide kamu step-by-step dari konsep sampe 
                          implementasi. Unlock hint secara bertahap buat develop skill <em>problem solving</em>.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Hint Pathway */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-violet-400" />
                    Jalur Hint Cosmic
                  </h2>

                  <div className="space-y-4">
                    {hints.map((hint, index) => {
                      const isUnlocked = unlockedHints.includes(index);
                      const canUnlock = index === 0 || unlockedHints.includes(index - 1);

                      return (
                        <motion.div
                          key={hint.level}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <div
                            className={`border rounded-xl overflow-hidden transition-all ${
                              isUnlocked
                                ? "border-yellow-500/40 bg-yellow-500/10"
                                : canUnlock
                                ? "border-violet-500/30 bg-slate-950/50 hover:border-violet-500/50"
                                : "border-slate-700/30 bg-slate-950/30 opacity-60"
                            }`}
                          >
                            {/* Hint Header */}
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                      isUnlocked
                                        ? "bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50"
                                        : canUnlock
                                        ? "bg-gradient-to-br from-violet-500 to-purple-500"
                                        : "bg-slate-800"
                                    }`}
                                  >
                                    {isUnlocked ? (
                                      <Unlock className="w-6 h-6 text-white" />
                                    ) : (
                                      <Lock className="w-6 h-6 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-xl font-bold text-white">Hint {hint.level}</h3>
                                      {hint.cost > 0 && !isUnlocked && (
                                        <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs">
                                          {hint.cost} XP
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-slate-300">{hint.title}</p>
                                    <p className="text-sm text-slate-400 mt-1">{hint.description}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Hint Content */}
                              {isUnlocked ? (
                                <motion.div
                                  className="mt-4 p-4 bg-slate-950/50 border border-yellow-500/30 rounded-lg"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="flex items-start gap-3">
                                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-300 text-sm leading-relaxed">{hint.content}</p>
                                  </div>
                                </motion.div>
                              ) : canUnlock ? (
                                <button
                                  onClick={() => unlockHint(index)}
                                  className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group"
                                >
                                  <Unlock className="w-5 h-5" />
                                  <span>Unlock Hint {hint.cost > 0 ? `(${hint.cost} XP)` : "(Gratis)"}</span>
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                              ) : (
                                <div className="mt-4 p-4 bg-slate-950/30 border border-slate-700/30 rounded-lg text-center">
                                  <Lock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                  <p className="text-sm text-slate-500">Unlock hint sebelumnya buat akses</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Connector */}
                          {index < hints.length - 1 && (
                            <div className="ml-6 h-6 border-l-2 border-dashed border-violet-500/30"></div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/challenge/1"
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all text-center"
                  >
                    Balik ke Tantangan
                  </Link>
                  <button className="px-8 py-4 bg-slate-800/50 border border-violet-500/30 rounded-lg font-semibold text-lg hover:bg-slate-800/70 hover:border-violet-500/50 transition-all">
                    Reset Hint
                  </button>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Hint Strategy */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-emerald-400" />
                    Strategi Hint
                  </h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg">
                      <div className="font-semibold text-violet-300 mb-1">🎯 Coba Dulu</div>
                      <p className="text-xs text-slate-400">
                        Coba tantangan dulu sebelum unlock hint buat maksimalkan learning
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg">
                      <div className="font-semibold text-violet-300 mb-1">📚 Progressive Learning</div>
                      <p className="text-xs text-slate-400">
                        Setiap hint reveal lebih banyak detail - mulai dari konsep high-level
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg">
                      <div className="font-semibold text-violet-300 mb-1">💡 Terapkan Ilmunya</div>
                      <p className="text-xs text-slate-400">
                        Pakai hint sebagai panduan, tapi tulis kodenya sendiri
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* XP Cost Info */}
                <motion.div
                  className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4">Biaya XP</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Unlock hint butuh XP, tapi bantu kamu belajar dengan efektif. Reward tantangan dikurangi 
                    dengan total biaya hint.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Reward Tantangan</span>
                      <span className="text-yellow-400 font-semibold">50 XP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Hint Dipakai</span>
                      <span className="text-orange-400 font-semibold">
                        -{hints.filter((_, i) => unlockedHints.includes(i)).reduce((sum, h) => sum + h.cost, 0)} XP
                      </span>
                    </div>
                    <div className="pt-2 border-t border-yellow-500/30">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">Reward Akhir</span>
                        <span className="text-yellow-400 font-bold text-lg">
                          {50 - hints.filter((_, i) => unlockedHints.includes(i)).reduce((sum, h) => sum + h.cost, 0)} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Related Challenges */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-4">Tantangan Terkait</h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">Style Tombol</div>
                      <div className="text-xs text-slate-400">Pemula • 40 XP</div>
                    </a>
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">Layout Flexbox</div>
                      <div className="text-xs text-slate-400">Pemula • 60 XP</div>
                    </a>
                    <a
                      href="#"
                      className="block p-3 bg-slate-950/50 border border-violet-500/20 rounded-lg hover:border-violet-500/40 transition-colors"
                    >
                      <div className="font-semibold text-violet-300 text-sm">Header Responsive</div>
                      <div className="text-xs text-slate-400">Menengah • 80 XP</div>
                    </a>
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