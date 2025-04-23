import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import {Navigation} from "./Navigation"

export const Grid: React.FC = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
      <StatCards />
      <ActivityGraph />
      <UsageRadar />
    </div>
  );
};