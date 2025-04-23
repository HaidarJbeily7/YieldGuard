import React from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { activityData } from "./activityGraphData";

export const ActivityGraph: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-8 overflow-hidden bg-[#121215] rounded border border-gray-600">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Activity
        </h3>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityData}
            margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line type="monotone" dataKey="New" stroke="#3bc8bd" fill="#3bc8bd" />
            <Line type="monotone" dataKey="Returning" stroke="#5b21b6" fill="#5b21b6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
