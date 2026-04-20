import { motion } from "motion/react";
import { Play, Eye, Code, CheckCircle, Rocket, ArrowRight, Bug, MessageCircle, Wrench } from "lucide-react";

const learningSteps = [
  {
    icon: Play,
    title: "Start",
    description: "Mulai petualangan cosmic-mu",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Eye,
    title: "Predict",
    description: "Prediksi output sebelum run kode",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Analyze",
    description: "Pahami masalah dan kode dengan detail",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Wrench,
    title: "Fix",
    description: "Eksekusi solusi dan perbaiki kode",
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: Bug,
    title: "Debug",
    description: "Identifikasi dan benerin error",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: MessageCircle,
    title: "Reflect",
    description: "Refleksi kenapa solusi berhasil",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Project",
    description: "Terapkan di mini project",
    color: "from-cyan-500 to-emerald-500",
  },
];

export function LearningFlowSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Alur Belajar Konstelasi-mu
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ikuti jalur stellar dari pemula sampai developer expert
          </p>
        </motion.div>

        {/* Desktop Flow */}
        <div className="hidden lg:block relative">
          {/* Connection line */}
          <svg className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2" style={{ zIndex: 0 }}>
            <motion.line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex justify-between items-center relative z-10">
            {learningSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="flex flex-col items-center w-48"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Planet node */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl shadow-violet-500/50 relative z-10`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 w-24 h-24 rounded-full border-4 bg-gradient-to-br ${step.color} opacity-30`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-slate-400 text-center">{step.description}</p>

                  {/* Arrow between steps */}
                  {index < learningSteps.length - 1 && (
                    <motion.div
                      className="absolute"
                      style={{ left: `${(index + 1) * 20 - 3}%`, top: "50%" }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8 text-violet-400" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {learningSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl shadow-violet-500/50`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      className={`absolute inset-0 w-20 h-20 rounded-full border-4 bg-gradient-to-br ${step.color} opacity-30`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>

                {/* Vertical connector */}
                {index < learningSteps.length - 1 && (
                  <div className="ml-10 mt-4 mb-4 h-12 border-l-2 border-dashed border-violet-500/30"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}