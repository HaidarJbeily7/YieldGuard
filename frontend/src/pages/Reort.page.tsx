import { useParams } from "react-router-dom";
import { GradientGrid } from "../components/Hero/GradientGrid";
import ReportCountdown from "../components/Report/ReportCountdown";
import VoteCard from "../components/Report/VoteCard";
import { reportsData } from "../components/Dashboard/ReportActivities/ReportsData";
import ReportNotFound from "../components/Report/ReportNotFound";

export function ReportPage() {
  const { reportId } = useParams();

  const report = reportsData.find((r) => r.id === reportId);

  if (!report) {
    return <ReportNotFound />;
  }

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#09090b] via-[#12121549] to-main-dark40 flex justify-center items-center">
      <GradientGrid />

      <div className="absolute top-6 w-full flex justify-center z-20">
        <ReportCountdown />
      </div>

      <VoteCard
        reportId={reportId || report.id}
        account={report.account}
        yesVotes={report.yesVotes}
        noVotes={report.noVotes}
        deadline={report.deadline}
        staked={report.staked}
      />
    </div>
  );
}
