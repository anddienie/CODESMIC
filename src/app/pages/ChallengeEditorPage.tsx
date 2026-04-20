import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CosmicBackground } from "../components/CosmicBackground";
import { motion } from "motion/react";
import { Code, ChevronLeft, Play, CheckCircle2, Lock, Unlock, Lightbulb, Sparkles } from "lucide-react";
import { apiRequest } from "../../lib/api";

type QuestionDetail = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  difficulty: string;
  type: string;
  mini_materi: string;
  task: string;
  code_html: string;
  code_css: string;
  code_js: string;
  hint1: string;
  hint2: string;
  hint3: string;
};

export function ChallengeEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  
  const [unlockedHints, setUnlockedHints] = useState<number[]>([0]);
  const [userXp, setUserXp] = useState(150);
  const [showHints, setShowHints] = useState(true);
  
  const hintCosts = [0, 5, 10];

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        const data = await apiRequest<QuestionDetail>(`/questions/${id}`);
        setQuestion(data);
        setHtmlCode(data.code_html);
        setCssCode(data.code_css);
        setJsCode(data.code_js);
      } catch (err) {
        setError((err as Error).message || "Gagal memuat soal.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleUnlockHint = (hintIndex: number) => {
    if (!unlockedHints.includes(hintIndex) && userXp >= hintCosts[hintIndex]) {
      setUnlockedHints([...unlockedHints, hintIndex]);
      setUserXp(userXp - hintCosts[hintIndex]);
    }
  };

  const getHintText = (hintIndex: number): string => {
    if (!question) return "";
    const hintFields = [question.hint1, question.hint2, question.hint3];
    return hintFields[hintIndex] || "Hint tidak tersedia";
  };

  const generatePreviewHTML = () => {
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script>
          ${jsCode}
        </script>
      </body>
      </html>
    `;
    return fullHTML;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />

        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => navigate(`/challenge/${id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
              <div className="text-center">
                <h1 className="text-3xl font-bold">{loading ? "Memuat..." : question?.title}</h1>
              </div>
              <div className="w-20"></div>
            </motion.div>

            {loading || error ? (
              <div className="text-center py-20">
                <div className="text-red-400">{error || "Memuat soal..."}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Code Editor */}
                <div className="xl:col-span-2 space-y-4">
                  {/* Tabs */}
                  <motion.div
                    className="flex gap-2 bg-slate-950/50 border border-violet-500/20 rounded-lg p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[
                      { id: "html", label: "HTML", icon: "🏗️" },
                      { id: "css", label: "CSS", icon: "🎨" },
                      { id: "js", label: "JavaScript", icon: "⚙️" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "html" | "css" | "js")}
                        className={`flex-1 px-4 py-2 rounded transition-all ${
                          activeTab === tab.id
                            ? "bg-violet-600 text-white"
                            : "bg-slate-900 text-slate-300 hover:text-white"
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </motion.div>

                  {/* Code Editor */}
                  <motion.div
                    className="bg-slate-950/70 border border-violet-500/20 rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <textarea
                      value={
                        activeTab === "html"
                          ? htmlCode
                          : activeTab === "css"
                          ? cssCode
                          : jsCode
                      }
                      onChange={(e) => {
                        if (activeTab === "html") setHtmlCode(e.target.value);
                        if (activeTab === "css") setCssCode(e.target.value);
                        if (activeTab === "js") setJsCode(e.target.value);
                      }}
                      className="w-full h-96 p-4 bg-slate-950 text-slate-100 font-mono text-sm border-none outline-none resize-none"
                      spellCheck="false"
                    />
                  </motion.div>

                  {/* Problem Description */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5 text-violet-400" />
                      Deskripsi Tantangan
                    </h3>
                    <p className="text-slate-300 mb-4">{question?.task}</p>
                    <div className="text-sm text-slate-400">
                      <p><strong className="text-white">Catatan:</strong> {question?.mini_materi}</p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all flex items-center justify-center gap-2 group">
                      <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Test Kode
                    </button>
                    <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-lg shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all flex items-center justify-center gap-2 group">
                      <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Submit
                    </button>
                  </motion.div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                  {/* Preview */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="p-3 border-b border-violet-500/20 flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Preview</h3>
                      <button className="text-xs px-2 py-1 bg-violet-600 hover:bg-violet-700 rounded transition-colors">
                        Refresh
                      </button>
                    </div>
                    <div className="h-64 bg-white overflow-auto">
                      <iframe
                        srcDoc={generatePreviewHTML()}
                        className="w-full h-full border-none"
                        title="Preview"
                      />
                    </div>
                  </motion.div>

                  {/* Hints Toggle */}
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="w-full px-4 py-2 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHints ? "Sembunyikan" : "Tampilkan"} Hints
                  </button>

                  {/* Hints System */}
                  {showHints && (
                    <motion.div
                      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-violet-500/20 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        Hints
                      </h3>
                      <div className="space-y-2">
                        {[0, 1, 2].map((hintIndex) => {
                          const isUnlocked = unlockedHints.includes(hintIndex);
                          const canUnlock = hintIndex === 0 || unlockedHints.includes(hintIndex - 1);
                          const cost = hintCosts[hintIndex];

                          return (
                            <motion.div
                              key={hintIndex}
                              className={`border rounded p-3 transition-all ${
                                isUnlocked
                                  ? "border-yellow-500/40 bg-yellow-500/10"
                                  : canUnlock
                                  ? "border-violet-500/30 bg-slate-950/50 hover:border-violet-500/50"
                                  : "border-slate-700/30 bg-slate-950/30 opacity-60"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      isUnlocked
                                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                                        : canUnlock
                                        ? "bg-gradient-to-br from-violet-500 to-purple-500"
                                        : "bg-slate-800"
                                    }`}
                                  >
                                    {isUnlocked ? (
                                      <Unlock className="w-3 h-3 text-white" />
                                    ) : (
                                      <Lock className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <p className="text-xs font-semibold">Hint {hintIndex + 1}</p>
                                </div>
                                {cost > 0 && !isUnlocked && (
                                  <span className="text-xs text-slate-400">{cost} XP</span>
                                )}
                              </div>

                              {isUnlocked ? (
                                <motion.div
                                  className="text-xs text-slate-200 bg-slate-950/50 border border-yellow-500/20 rounded p-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  {getHintText(hintIndex)}
                                </motion.div>
                              ) : canUnlock ? (
                                <button
                                  onClick={() => handleUnlockHint(hintIndex)}
                                  disabled={userXp < cost}
                                  className={`w-full px-2 py-1 rounded text-xs font-semibold transition-all ${
                                    userXp >= cost
                                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                                  }`}
                                >
                                  {cost > 0 ? `Unlock (${cost} XP)` : "Buka"}
                                </button>
                              ) : (
                                <div className="text-center text-xs text-slate-500 py-1">
                                  Buka hint sebelumnya
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>

                      <motion.div
                        className="mt-3 p-2 bg-violet-500/10 border border-violet-500/30 rounded text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-violet-400 flex-shrink-0" />
                          <span>
                            <span className="text-yellow-400 font-semibold">XP:</span> {userXp} XP
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
