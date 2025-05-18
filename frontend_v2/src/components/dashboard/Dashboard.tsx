import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "../Header/Header";
import MarketTable from "./MarketTable/MarketTable";
import FilterBar from "./FilterBar/FilterBar";
import DateRangePicker from "./DateRangePicker/DateRangePicker";
import AlertsPanel from "../AlertsPanel/AlertsPanel";
import { marketData } from "@/data/market-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, ChartColumnIncreasing } from "lucide-react";
import ChartView from "./ChartView/ChartView";

const Dashboard = () => {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
		const today = new Date();
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(today.getMonth() - 1);

		return {
			from: oneMonthAgo,
			to: today,
		};
	});

	const [filters, setFilters] = useState({
		watchlist: false,
		positiveChange: false,
		highVolume: false,
		transactions: false,
	});
	const [isAlertsPanelOpen, setIsAlertsPanelOpen] = useState(false);

	const [viewMode, setViewMode] = useState<"table" | "chart">("table");

	const filteredData = marketData.filter((item) => {
		if (filters.watchlist) return true;
		if (filters.positiveChange && item.changePercent <= 0) return false;
		if (filters.highVolume && item.tradingVolume < 10000) return false;
		return true;
	});

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-foreground ">
			<Header />

			<main className={cn("px-4 py-6 transition-all duration-300 mr-[68px]")}>
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Overview</h1>
				</div>

				<div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
					<FilterBar />

					<div className="flex items-center gap-4">
						<Tabs
							value={viewMode}
							onValueChange={(val) => setViewMode(val as "table" | "chart")}
						>
							<TabsList className="px-0">
								<TabsTrigger value="table" className="p-2">
									<Table className="h-6 w-6" />
								</TabsTrigger>
								<TabsTrigger value="chart" className="p-2">
									<ChartColumnIncreasing className="h-6 w-6" />
								</TabsTrigger>
							</TabsList>
						</Tabs>

						<DateRangePicker
							dateRange={dateRange}
							setDateRange={setDateRange}
							className="w-full xl:w-auto"
						/>
					</div>
				</div>

				{viewMode === "table" ? (
					<MarketTable data={filteredData} />
				) : (
					<ChartView />
				)}
			</main>

			<AlertsPanel
				isOpen={isAlertsPanelOpen}
				onToggle={() => setIsAlertsPanelOpen(!isAlertsPanelOpen)}
			/>
		</div>
	);
};

export default Dashboard;
