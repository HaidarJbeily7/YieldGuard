import { marketData } from "@/data/market-data";
import { Card } from "@/components/ui/card";
import TokenChart from "../TokenChart/TokenChart";

const ChartView = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
			{marketData.map((token) => (
				<Card key={token.symbol} className="bg-card p-4 space-y-4">
					{/* Token Info */}
					<div className="flex items-center justify-between text-sm font-medium">
						<div className="flex items-center gap-2">
							<img
								src={token.icon}
								alt={token.symbol}
								className="w-5 h-5 rounded-sm"
							/>
							<span>{token.symbol}</span>
						</div>
						<div className="flex gap-4 text-muted-foreground text-xs">
							<div>
								<p className="uppercase text-[10px]">Network</p>
								<p className="font-semibold text-white">{token.network}</p>
							</div>
							<div>
								<p className="uppercase text-[10px]">Exchange</p>
								<p className="font-semibold text-white">{token.exchange}</p>
							</div>
						</div>
					</div>

					<div className="">
						<TokenChart data={token.chartData} />
					</div>
				</Card>
			))}
		</div>
	);
};

export default ChartView;
