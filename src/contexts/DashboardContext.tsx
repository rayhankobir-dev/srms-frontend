/* eslint-disable react-refresh/only-export-components */
import { dashboards } from "@/data/sidenav";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type Dashboard = (typeof dashboards)[number];

type DashboardContextType = {
  selectedDashboard: Dashboard;
  setSelectedDashboard: (dashboard: Dashboard) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data] = useLocalStorage<Dashboard>({
    key: "selectedDashboard",
    defaultValue: dashboards[0],
  });

  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard>(
    dashboards.find((dashboard) => dashboard.id === data.id) || dashboards[0]
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedDashboard",
      JSON.stringify(selectedDashboard)
    );
  }, [selectedDashboard]);

  return (
    <DashboardContext.Provider
      value={{ selectedDashboard, setSelectedDashboard }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
