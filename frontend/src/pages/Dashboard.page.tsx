import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Balances } from "../components/Dashboard/Balances/Balances";
import { CheckActivities } from "../components/Dashboard/CheckActivities/CheckActivities";
import { OtherSettings } from "../components/Dashboard/OtherSettings/OtherSettings";
import { ReportActivities } from "../components/Dashboard/ReportActivities/ReportActivities";
import { YourActivities } from "../components/Dashboard/YourActivities/YourActivities";
import FeaturesSection from "../components/Dashboard/Feature/FeaturesSection";
import Dashboard from "../components/Dashboard/Performance/DashboardStats";
import { SideBar } from "../components/SideBar/SideBar";
import { IconMenu2 } from "@tabler/icons-react";

const tabComponents: Record<string, React.FC> = {
  "Your Activities": YourActivities,
  "Report Activities": ReportActivities,
  "Check Activities": CheckActivities,
  "Features Section": FeaturesSection,
  "Performance":  Dashboard,
  Balances: Balances,
  "Other Settings": OtherSettings,
};

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const defaultTab = searchParams.get("tab") || "Your Activities";

  const ActiveComponent = tabComponents[defaultTab] || YourActivities;

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
    setIsSidebarOpen(false); 
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:relative lg:translate-x-0 lg:flex`}
      >
        <SideBar activeTab={defaultTab} setActiveTab={handleTabChange} />
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
      >
        <IconMenu2 size={24} />
      </button>

    
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <ActiveComponent />
      </div>
    </div>
  );
}
