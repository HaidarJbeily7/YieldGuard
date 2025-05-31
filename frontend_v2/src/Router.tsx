import {
	createBrowserRouter,
	RouterProvider,
	// Navigate,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Markets from "./components/Markets/Markets";

// TODO: Uncomment and implement ProtectedRoute when authentication is ready
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuth = useUserStore((state) => state.isLoggedIn);
//   if (!isAuth) {
//     return <Navigate to="/auth" replace />;
//   }
//   return children;
// };

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/markets",
		element: <Markets />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
