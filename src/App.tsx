import "@/App.css";
import { Toaster } from "sonner";
import { AppRouter } from "@/routes";
import { HelmetProvider } from "react-helmet-async";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <DashboardProvider>
          <AppRouter />
          <Toaster position="top-right" />
        </DashboardProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
