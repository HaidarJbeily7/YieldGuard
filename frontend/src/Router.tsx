import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Auth.page";
import { useUserStore } from "./store/user";
import { DashboardPage } from "./pages/Dashboard.page";
import { useMantineColorScheme } from "@mantine/core";
import { ReportPage } from "./pages/Reort.page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useUserStore((state) => state.isLoggedIn);
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/report/:reportId",
    element: (
      <ProtectedRoute>
        <ReportPage />
      </ProtectedRoute>
    ),
  },
]);

export function Router() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme("dark");
  return <RouterProvider router={router} />;
}
