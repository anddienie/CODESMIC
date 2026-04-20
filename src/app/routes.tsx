import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { LearningPage } from "./pages/LearningPage";
import { ChallengeDetailPage } from "./pages/ChallengeDetailPage";
import { ChallengeEditorPage } from "./pages/ChallengeEditorPage";
import { MiniProjectPage } from "./pages/MiniProjectPage";
import { MiniProjectBuilderPage } from "./pages/MiniProjectBuilderPage";
import { ProgressTrackerPage } from "./pages/ProgressTrackerPage";
import { HintGuidancePage } from "./pages/HintGuidancePage";
import { ProfilePage } from "./pages/ProfilePage";
import { QuestionsAdminPage } from "./pages/QuestionsAdminPage";
import { FixRunLabPage } from "./pages/FixRunLabPage";
import { CodeChallengeArenaPage } from "./pages/CodeChallengeArenaPage";
import { DebuggingZonePage } from "./pages/DebuggingZonePage";

// 404 Not Found Page
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-violet-400">404</h1>
        <p className="text-2xl mb-6 text-slate-300">Halaman tidak ditemukan</p>
        <a href="/" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/learning",
    Component: LearningPage,
  },
  {
    path: "/fix-run-lab",
    Component: FixRunLabPage,
  },
  {
    path: "/challenge/arena",
    Component: CodeChallengeArenaPage,
  },
  {
    path: "/challenge/debug",
    Component: DebuggingZonePage,
  },
  {
    path: "/challenge/:id",
    Component: ChallengeDetailPage,
  },
  {
    path: "/challenge/:id/editor",
    Component: ChallengeEditorPage,
  },
  {
    path: "/mini-project",
    Component: MiniProjectBuilderPage,
  },
  {
    path: "/mini-project/:id",
    Component: MiniProjectPage,
  },
  {
    path: "/progress",
    Component: ProgressTrackerPage,
  },
  {
    path: "/admin/questions",
    Component: QuestionsAdminPage,
  },
  {
    path: "/hint/:id",
    Component: HintGuidancePage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
