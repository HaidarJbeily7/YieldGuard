import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Link,
  Outlet,
  createRootRouteWithContext
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "@/components/header";
import NearProvider from "@/contexts/near";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Page not found</p>
          <Link to="/" className="text-primary hover:underline">Go home</Link>
        </div>
      </div>
    );
  }
});

function RootComponent() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NearProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
        </NearProvider>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
      </ThemeProvider>
    </>
  );
}
