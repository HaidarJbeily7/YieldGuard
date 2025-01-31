import { useState } from "react";
import { Grid, Title, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ReportCard } from "./ReportCard";
import { ReportInput } from "./ReportInput";
import { ReportButton } from "./ReportButton";
import { reportsData } from "./ReportsData";

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
      <Grid>
        {reports.map((report) => (
          <Grid.Col span={4} key={report.id}>
            <ReportCard
              report={report}
              onNavigate={(id) => navigate(`/report/${id}`)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
