import { motion } from "motion/react";
import { Wrench, Code2, Bug, Puzzle, ArrowRight, Trophy, Star, Zap } from "lucide-react";
import { Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";

const learningFeatures = [
  {
    icon: Wrench,
    title: "Fix & Run Lab",
    description: "Tempat eksperimen coding dengan live visual diff",
    details: "Lihat langsung efek dari setiap perubahan kode! Lab ini kasih kamu kode yang broken, dan kamu harus fix sambil lihat preview real-time.",
    challenges: 25,
    difficulty: "Beginner",
    color: "from-pink-500 to-rose-500",
    glow: "pink",
    route: "/fix-run-lab",
    features: ["Live Preview", "Visual Diff", "Smart Hint Available", "Think First Mode"],
  },
  {
    icon: Code2,
    title: "Code Challenge Arena",
    description: "Battle lawan problem coding dengan kode rusak",
    details: "Tantangan utama! Di sini kamu akan battle dengan berbagai kasus: broken HTML structure, CSS berantakan, dan layout chaos. Tempat asah skill problem-solving!",
    challenges: 40,
    difficulty: "Intermediate",
    color: "from-violet-500 to-purple-500",
    glow: "violet",
    route: "/challenge/arena",
    features: ["Multi-level Challenges", "Smart Hint Available", "Think First Mode", "XP Rewards"],
  },
  {
    icon: Bug,
    title: "Debugging Zone",
    description: "Fokus cari dan pahami error dengan sistem diagnosis",
    details: "Zone khusus buat master debugging! Sistem akan track kesalahan yang sering kamu buat, kasih analysis pattern error, dan bantuin kamu paham kenapa terjadi.",
    challenges: 30,
    difficulty: "Intermediate",
    color: "from-amber-500 to-orange-500",
    glow: "amber",
    route: "/challenge/debug",
    features: ["Error Pattern Analysis", "Smart Hint Available", "Think First Mode", "Debugging Tools"],
  },
  {
    icon: Puzzle,
    title: "Mini Project Builder",
    description: "Bikin project bertahap dari komponen kecil sampai full project",
    details: "Tahap final! Build mini project lengkap step-by-step. Mulai dari komponen sederhana, combine jadi section, terus jadi satu project utuh. No hints here - ini test sebenarnya!",
    challenges: 12,
    difficulty: "Advanced",
    color: "from-emerald-500 to-cyan-500",
    glow: "emerald",
    route: "/mini-project/1",
    features: ["Progressive Building", "Real Projects", "Reflection Prompts", "Portfolio Ready"],
  },
];

export function LearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 overflow-hidden">
          <div className="container mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 mb-6">
                <Star className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-300">Perjalanan Pembelajaran</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mulai Petualangan Coding
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Jelajahi 4 fitur utama yang dirancang secara berurutan untuk mengasah skill coding dan problem solving-mu.
                Mulai dari basic fix sampai build project lengkap!
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="px-6 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-violet-400">107</div>
                  <div className="text-sm text-slate-400">Total Challenges</div>
                </div>
                <div className="px-6 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-slate-400">Learning Modules</div>
                </div>
                <div className="px-6 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">12</div>
                  <div className="text-sm text-slate-400">Mini Projects</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="relative py-16 px-4">
          <div className="container mx-auto relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Jalur Pembelajaran
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Ikuti urutan yang direkomendasikan untuk hasil maksimal
              </p>
            </motion.div>

            {/* Features List with connector */}
            <div className="max-w-5xl mx-auto space-y-8">
              {learningFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="relative">
                    {/* Connector line */}
                    {index < learningFeatures.length - 1 && (
                      <div className="absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-violet-500/50 to-transparent hidden md:block"></div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="group relative">
                        <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden">
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                          <div className="relative z-10 flex flex-col md:flex-row gap-6">
                            {/* Left: Icon & Number */}
                            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                              <div className="relative flex-shrink-0">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-${feature.glow}-500/50`}>
                                  <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-violet-500 border-2 border-slate-900 flex items-center justify-center">
                                  <span className="text-xs font-bold">{index + 1}</span>
                                </div>
                              </div>
                            </div>

                            {/* Middle: Content */}
                            <div className="flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                <div>
                                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-violet-300 transition-colors">
                                    {feature.title}
                                  </h3>
                                  <p className="text-slate-400 mb-3">{feature.description}</p>
                                  <p className="text-slate-300 leading-relaxed">{feature.details}</p>
                                </div>

                                <div className="flex flex-col gap-2 items-end">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    feature.difficulty === "Beginner" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                                    feature.difficulty === "Intermediate" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                                    "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  }`}>
                                    {feature.difficulty}
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-400 text-sm">
                                    <Trophy className="w-4 h-4" />
                                    {feature.challenges} Challenges
                                  </span>
                                </div>
                              </div>

                              {/* Features tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {feature.features.map((feat) => (
                                  <span
                                    key={feat}
                                    className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300"
                                  >
                                    <Zap className="w-3 h-3 inline mr-1 text-violet-400" />
                                    {feat}
                                  </span>
                                ))}
                              </div>

                              {/* CTA Button */}
                              <Link
                                to={feature.route}
                                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${feature.color} rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all group/btn`}
                              >
                                Mulai Sekarang
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>

                          {/* Corner decoration */}
                          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <motion.div
              className="mt-16 max-w-3xl mx-auto p-6 bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3 text-violet-300">💡 Tips Belajar Efektif</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✅ Ikuti urutan fitur dari atas ke bawah untuk pembelajaran yang terstruktur</li>
                <li>✅ Gunakan <strong>Think First Mode</strong> untuk melatih analytical thinking sebelum trial-error</li>
                <li>✅ Manfaatkan <strong>Smart Hint System</strong> dengan bijak - tukar XP untuk hint yang bermanfaat</li>
                <li>✅ Jangan skip <strong>Reflection Prompts</strong> - ini bikin kamu paham konsep lebih dalam</li>
                <li>✅ Track progress di <Link to="/progress" className="text-violet-400 hover:text-violet-300">Progress Tracker</Link> untuk lihat perkembangan skill-mu</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
