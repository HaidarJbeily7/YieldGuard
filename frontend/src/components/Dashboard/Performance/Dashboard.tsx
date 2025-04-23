import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-[#09090b] rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
    </div>
  );
};
