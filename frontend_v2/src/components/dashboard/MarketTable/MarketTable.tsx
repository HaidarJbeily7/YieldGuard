import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import type { MarketDataItem } from "@/types/market";

interface MarketTableProps {
	data: MarketDataItem[];
}

const MarketTable = ({ data }: MarketTableProps) => {
	return (
		<div className="rounded-md border bg-card">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="bg-stone-800">
							<TableHead className="text-white font-semibold">
								Symbol {data.length}
							</TableHead>
							<TableHead className="">Network</TableHead>
							<TableHead className="">Exchange</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead className="text-right">Change %</TableHead>
							<TableHead className="text-right">Trading volume 24h</TableHead>
							<TableHead className="text-right">Transactions 24h</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => (
							<TableRow
								key={item.symbol}
								className="cursor-pointer hover:bg-accent/50"
							>
								<TableCell className="font-medium py-3">
									<div className="flex items-center">
										{/* <div className="h-5 w-5 bg-green-500 rounded mr-2 flex items-center justify-center text-xs text-white">
											+
										</div> */}
										<img src={item.icon} alt="coin-icon" className="w-6 mr-4" />
										{item.symbol}
									</div>
								</TableCell>
								<TableCell>{item.network}</TableCell>
								<TableCell>{item.exchange}</TableCell>
								<TableCell className="text-right font-mono">
									{formatCurrency(item.price)}
								</TableCell>
								<TableCell
									className={cn(
										"text-right font-mono",
										item.changePercent > 0 ? "text-green-500" : "text-red-500",
									)}
								>
									{formatPercentage(item.changePercent)}
								</TableCell>
								<TableCell
									className={cn(
										"text-right font-mono",
										item.volumeChangePercent > 0
											? "text-green-500"
											: "text-red-500",
									)}
								>
									{formatPercentage(item.volumeChangePercent)}
								</TableCell>
								<TableCell className="text-right font-mono">
									{formatCurrency(item.transactions24h)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default MarketTable;
