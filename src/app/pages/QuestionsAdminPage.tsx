import { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CosmicBackground } from '../components/CosmicBackground';
import { apiRequest } from '@/lib/api';

export type Question = {
  id: number;
  title: string;
  xp: number;
  subject: string;
  subtopic: string;
  difficulty: string;
  type: string;
  mini_materi: string;
  code_html: string;
  code_css: string;
  code_js: string;
  task: string;
  validation_js: string;
  hint1: string;
  hint2: string;
  hint3: string;
};

const blankQuestion: Omit<Question, 'id'> = {
  title: '',
  xp: 10,
  subject: 'HTML',
  subtopic: 'Struktur Dasar HTML',
  difficulty: 'Mudah',
  type: 'Fix & Run Lab',
  mini_materi: '',
  code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>',
  code_css: '',
  code_js: '',
  task: '',
  validation_js: '',
  hint1: '',
  hint2: '',
  hint3: '',
};

export function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [formState, setFormState] = useState<Omit<Question, 'id'>>(blankQuestion);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setLoading(true);
    try {
      const data = await apiRequest<Question[]>('/questions');
      setQuestions(data);
    } catch (error) {
      console.error(error);
      setMessage('Gagal memuat daftar soal.');
    } finally {
      setLoading(false);
    }
  }

  function selectQuestion(question: Question) {
    setSelectedQuestion(question);
    const { id, ...rest } = question;
    setFormState(rest);
    setMessage('');
  }

  function resetForm() {
    setSelectedQuestion(null);
    setFormState(blankQuestion);
    setMessage('');
  }

  function updateField<K extends keyof Omit<Question, 'id'>>(key: K, value: Omit<Question, 'id'>[K]) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  async function saveQuestion() {
    setLoading(true);
    try {
      if (selectedQuestion) {
        await apiRequest<Question>(`/questions/${selectedQuestion.id}`, {
          method: 'PUT',
          body: JSON.stringify(formState),
        });
        setMessage('Soal berhasil diperbarui.');
      } else {
        await apiRequest<Question>('/questions', {
          method: 'POST',
          body: JSON.stringify(formState),
        });
        setMessage('Soal baru berhasil dibuat.');
      }
      await loadQuestions();
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage('Gagal menyimpan soal.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuestion(questionId: number) {
    if (!confirm('Hapus soal ini dari database?')) return;
    setLoading(true);
    try {
      await apiRequest(`/questions/${questionId}`, { method: 'DELETE' });
      setMessage('Soal berhasil dihapus.');
      await loadQuestions();
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage('Gagal menghapus soal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Admin Soal Fix & Run Lab</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Kelola soal pembelajaran yang tersimpan di database. Tambah, edit, atau hapus konten Fix & Run Lab.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="bg-slate-900/90 border border-violet-500/20 rounded-3xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Daftar Soal</h2>
                  {loading && <p className="text-slate-400">Memuat...</p>}
                  {!loading && questions.length === 0 && (
                    <p className="text-slate-400">Belum ada soal di database.</p>
                  )}
                  <div className="space-y-3">
                    {questions.map((question) => (
                      <div key={question.id} className="rounded-2xl bg-slate-950/80 border border-slate-700 p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-white">{question.title}</div>
                          <div className="text-slate-400 text-sm">{question.subject} • {question.difficulty} • {question.xp} XP</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700"
                            onClick={() => selectQuestion(question)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-500"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-violet-500/20 rounded-3xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Petunjuk</h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                    <li>Pilih soal dari daftar untuk mengedit.</li>
                    <li>Gunakan kode HTML/CSS/JS agar konten dapat dipakai di halaman tantangan nanti.</li>
                    <li>Semua soal tersimpan di tabel database <code>questions</code>.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-violet-500/20 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">{selectedQuestion ? 'Edit Soal' : 'Buat Soal Baru'}</h2>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <label className="block">
                    <span className="text-slate-200">Judul Soal</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.title}
                      onChange={(event) => updateField('title', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">XP</span>
                    <input
                      type="number"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.xp}
                      onChange={(event) => updateField('xp', Number(event.target.value))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Subjek</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.subject}
                      onChange={(event) => updateField('subject', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Submateri</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.subtopic}
                      onChange={(event) => updateField('subtopic', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Tingkat Kesulitan</span>
                    <select
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.difficulty}
                      onChange={(event) => updateField('difficulty', event.target.value)}
                    >
                      <option>Mudah</option>
                      <option>Sedang</option>
                      <option>Sulit</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Mini Materi</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[96px]"
                      value={formState.mini_materi}
                      onChange={(event) => updateField('mini_materi', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Tugas</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[96px]"
                      value={formState.task}
                      onChange={(event) => updateField('task', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Kode HTML</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[120px] font-mono"
                      value={formState.code_html}
                      onChange={(event) => updateField('code_html', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Kode CSS</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[96px] font-mono"
                      value={formState.code_css}
                      onChange={(event) => updateField('code_css', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Kode JS</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[96px] font-mono"
                      value={formState.code_js}
                      onChange={(event) => updateField('code_js', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Validasi Jawaban (JS)</span>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white min-h-[96px] font-mono"
                      value={formState.validation_js}
                      onChange={(event) => updateField('validation_js', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Hint 1</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.hint1}
                      onChange={(event) => updateField('hint1', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Hint 2</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.hint2}
                      onChange={(event) => updateField('hint2', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-200">Hint 3</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white"
                      value={formState.hint3}
                      onChange={(event) => updateField('hint3', event.target.value)}
                    />
                  </label>

                  {message && <p className="text-sm text-emerald-300">{message}</p>}
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-violet-600 px-5 py-3 text-white font-semibold hover:bg-violet-500 transition-colors"
                    onClick={saveQuestion}
                  >
                    {selectedQuestion ? 'Simpan Perubahan' : 'Tambah Soal'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
