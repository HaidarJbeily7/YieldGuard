import { useState } from "react";
import { Title, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ReportCard } from "./ReportCard";
import { ReportInput } from "./ReportInput";
import { ReportButton } from "./ReportButton";
import { reportsData } from "./ReportsData";
import { CommandBar } from "../AIAssistantBar/CommandBar";


export function ReportActivities() {
  const [reports, setReports] = useState(reportsData);

  const [newReport, setNewReport] = useState({
    account: "",
  });

  const navigate = useNavigate();

  const handleOpenReport = () => {
    if (newReport.account) {
      const newId = (reports.length + 1).toString();
      setReports([
        ...reports,
        {
          id: newId,
          account: newReport.account,
          yesVotes: 0,
          noVotes: 0,
          deadline: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // Deadline 7 days from now
          staked: 0.5, // Fixed stake amount
        },
      ]);
      setNewReport({ account: "" });
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Title mt="xl" mb="md">
        Open a New Report
      </Title>
      <Flex direction="column" gap={8}>
        {/* Account Input */}
        <ReportInput
          value={newReport.account}
          onChange={(e) =>
            setNewReport({ ...newReport, account: e.target.value })
          }
          placeholder="Enter account ID"
          label="Reported Account"
        />
        {/* Submit Button */}
        <ReportButton
          onClick={handleOpenReport}
          disabled={!newReport.account}
        />
      </Flex>
      <Title mb="md">Opened Reports</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        {reports.map((report) => (
          <div className="mb-4 mx-3" key={report.id}>
            <ReportCard
              report={report}
              onNavigate={(id) => navigate(`/report/${id}`)}
            />
          </div>
        ))}
      </div>
  
      <CommandBar />
    </div>
  );
}
