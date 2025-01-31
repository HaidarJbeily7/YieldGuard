import { useSearchParams } from "react-router-dom";
import { Balances } from "../components/Dashboard/Balances/Balances";
import { CheckActivities } from "../components/Dashboard/CheckActivities/CheckActivities";
import { OtherSettings } from "../components/Dashboard/OtherSettings/OtherSettings";
import { ReportActivities } from "../components/Dashboard/ReportActivities/ReportActivities";
import { YourActivities } from "../components/Dashboard/YourActivities/YourActivities";
import { SideBar } from "../components/SideBar/SideBar";

const tabComponents: Record<string, React.FC> = {
  "Your Activities": YourActivities,
  "Report Activities": ReportActivities,
  "Check Activities": CheckActivities,
  Balances: Balances,
  "Other Settings": OtherSettings,
};

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "Your Activities";

  const ActiveComponent = tabComponents[defaultTab] || YourActivities;

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* @ts-ignore */}
        <SideBar activeTab={defaultTab} setActiveTab={handleTabChange} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginRight: "6rem",
          marginLeft: "6rem",
          marginTop: "2rem",
          scrollbarWidth: "none",
        }}
      >
        <ActiveComponent />
      </div>
    </div>
  );
}
