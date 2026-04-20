import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { LearningPage } from "./pages/LearningPage";
import { ChallengeDetailPage } from "./pages/ChallengeDetailPage";
import { MiniProjectPage } from "./pages/MiniProjectPage";
import { ProgressTrackerPage } from "./pages/ProgressTrackerPage";
import { HintGuidancePage } from "./pages/HintGuidancePage";
import { ProfilePage } from "./pages/ProfilePage";
import { QuestionsAdminPage } from "./pages/QuestionsAdminPage";
import { FixRunLabPage } from "./pages/FixRunLabPage";

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
    path: "/challenge/:id",
    Component: ChallengeDetailPage,
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
]);
