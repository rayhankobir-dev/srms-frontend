import "@/App.css";
import { Toaster } from "sonner";
import { AppRouter } from "@/routes";
import { HelmetProvider } from "react-helmet-async";
import { DashboardProvider } from "@/contexts/DashboardContext";

function App() {
  return (
    <HelmetProvider>
      <DashboardProvider>
        <AppRouter />
        <Toaster position="top-right" />
      </DashboardProvider>
    </HelmetProvider>
  );
}

export default App;
