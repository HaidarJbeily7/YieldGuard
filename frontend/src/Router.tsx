import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Auth.page";
import { useUserStore } from "./store/user";

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
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
