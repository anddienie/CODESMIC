import { motion } from "motion/react";
import { Bug, Lightbulb, Brain, Sparkles, BookOpen, Code2, Wrench } from "lucide-react";

// Why CODESMIC
const whyReasons = [
  {
    icon: BookOpen,
    title: "Pembelajaran terlalu teori",
    description:
      "Materi sering hanya dijelaskan di buku, tanpa diikuti latihan nyata sehingga konsep sulit melekat di kepala siswa.",
    color: "from-slate-700 to-slate-900",
    glow: "sky",
  },
  {
    icon: Code2,
    title: "Kekurangan latihan problem solving",
    description:
      "Siswa jarang mendapat kesempatan memecahkan masalah sendiri, padahal kemampuan coding berkembang lewat latihan berulang.",
    color: "from-violet-500 to-purple-500",
    glow: "violet",
  },
  {
    icon: Bug,
    title: "Kurang pengalaman debugging",
    description:
      "Banyak siswa belum terbiasa mencari akar masalah dan memperbaiki bug, padahal itu adalah keterampilan penting di dunia nyata.",
    color: "from-amber-500 to-orange-500",
    glow: "amber",
  },
];

// How You Learn
const howYouLearn = [
  {
    icon: Sparkles,
    title: "Belajar dari kasus nyata",
    description:
      "Setiap challenge didesain seperti masalah dunia nyata agar skillmu langsung bisa diterapkan di project sesungguhnya.",
  },
  {
    icon: Lightbulb,
    title: "Analisis sebelum coding",
    description:
      "Kamu dilatih memikirkan solusi dan struktur sebelum mulai mengetik, sehingga kode lebih rapi dan efektif.",
  },
  {
    icon: Wrench,
    title: "Praktik langsung",
    description:
      "Tidak ada teori kosong: kamu langsung mengerjakan tugas, mencoba, dan melihat hasilnya secara langsung.",
  },
  {
    icon: Brain,
    title: "Refleksi setelah selesai",
    description:
      "Setiap misi diakhiri dengan evaluasi pendek agar kamu dapat mengerti apa yang sudah kamu pelajari dan apa yang bisa ditingkatkan.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto relative z-10">
        {/* Why CODESMIC */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            WHY CODESMIC
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Pembelajaran coding saat ini terlalu berfokus pada teori, sehingga banyak siswa kurang latihan problem solving dan nyaris tidak mendapatkan pengalaman debugging nyata. CODESMIC hadir untuk menjembatani kesenjangan itu dengan pendekatan belajar yang praktis, kasus nyata, dan refleksi setiap selesai misi.
          </p>
        </motion.div>

        {/* Why CODESMIC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {whyReasons.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/30 hover:border-slate-500/40 transition-all duration-300 overflow-hidden group-hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-${feature.glow}-500/50 group-hover:shadow-${feature.glow}-500/70 transition-shadow`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How You Learn */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-slate-200 bg-clip-text text-transparent">
            HOW YOU LEARN
          </h3>
          <p className="text-base text-slate-400 max-w-3xl mx-auto">
            Di CODESMIC, kamu tidak hanya diberi jawaban. Kamu belajar dari kasus nyata, melakukan analisis sebelum menulis kode, praktik langsung, lalu merefleksikan hasilnya. Ini bukan sekadar fitur — ini adalah metode belajar yang membuat pemahamanmu bertahan lama.
          </p>
        </motion.div>

        {/* How You Learn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {howYouLearn.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative p-6 rounded-3xl bg-slate-900/90 border border-slate-700/40 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white text-lg">{feature.title}</h4>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}