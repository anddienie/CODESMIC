import { motion } from "motion/react";
import { Sparkles, Rocket } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 mb-6 bg-[#8e70c133]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">Semesta Coding-mu Menunggu</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CODESMIC
              </span>
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-violet-200 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Code Cosmic - Petualangan Coding di Luar Angkasa
            </motion.p>

            <motion.p
              className="text-lg text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Platform interaktif buat belajar pemrograman web sambil ningkatin skill <em>problem solving</em>.
              Navigasi melalui kosmos HTML dan CSS, taklukkan tantangan di seluruh galaksi kode.
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/learning"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <Rocket className="w-5 h-5" />
                  Mulai Belajar
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right content - Central Sphere */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Orbiting rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-purple-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border-2 border-pink-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Central sphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl shadow-violet-500/50"
                  animate={{
                    boxShadow: [
                      "0 0 60px rgba(139, 92, 246, 0.5)",
                      "0 0 80px rgba(168, 85, 247, 0.7)",
                      "0 0 60px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1700159915754-2b4ba5b2e3be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXN0YW50JTIwcGxhbmV0JTIwY29zbWljJTIwc3BoZXJlfGVufDF8fHx8MTc3NDkyNDAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Coding Universe Sphere"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-purple-600/30 to-pink-600/40 mix-blend-overlay"></div>
                </motion.div>
              </div>

              {/* Orbiting satellites/nodes */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={angle}
                  className="absolute w-12 h-12 left-1/2 top-1/2 -ml-6 -mt-6"
                  style={{
                    transformOrigin: `50% 50%`,
                  }}
                  animate={{
                    rotate: [angle, angle + 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 shadow-lg shadow-violet-400/50"
                    style={{
                      transform: `translateX(${140}px)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}