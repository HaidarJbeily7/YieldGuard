import { useEffect, useState } from "react";
import axios from "axios";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	TrendingUp,
	BarChart3,
	Activity,
	DollarSign,
	ArrowUpRight,
	ArrowDownRight,
	Search,
	Filter,
	Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/markets")({
	component: MarketsPage,
});

interface MarketItem {
	symbol: string;
	name: string;
	price: number;
	change: number;
	changePercent: number;
	volume: string;
	marketCap: string;
	high24h: number;
	low24h: number;
	isPositive: boolean;
}

export default function MarketsPage() {
	const [marketData, setMarketData] = useState<MarketItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [globalStats, setGlobalStats] = useState<{
		totalMarketCap: string;
		totalVolume: string;
		btcDominance: string;
		activeMarkets: string;
	} | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"https://api.coingecko.com/api/v3/coins/markets",
					{
						params: {
							vs_currency: "usd",
							order: "market_cap_desc",
							per_page: 20,
							page: 1,
							sparkline: false,
						},
					},
				);

				let coins = res.data.filter(
					(coin: any) =>
						coin.symbol.toLowerCase() !== "usdt" &&
						coin.symbol.toLowerCase() !== "usdc",
				);

				const nearIncluded = coins.some((coin: any) => coin.id === "near");

				if (!nearIncluded) {
					const nearRes = await axios.get(
						"https://api.coingecko.com/api/v3/coins/markets",
						{
							params: {
								vs_currency: "usd",
								ids: "near",
								sparkline: false,
							},
						},
					);
					coins.push(...nearRes.data);
				}

				const topCoins = coins.slice(0, 6);

				const transformed: MarketItem[] = topCoins.map((coin: any) => ({
					symbol: `${coin.symbol.toUpperCase()}/USD`,
					name: coin.name,
					price: coin.current_price,
					change: coin.price_change_24h,
					changePercent: coin.price_change_percentage_24h,
					volume: formatBigNumber(coin.total_volume),
					marketCap: formatBigNumber(coin.market_cap),
					high24h: coin.high_24h,
					low24h: coin.low_24h,
					isPositive: coin.price_change_24h >= 0,
				}));

				setMarketData(transformed);

				// Fetch global stats
				const globalRes = await axios.get(
					"https://api.coingecko.com/api/v3/global",
				);
				const global = globalRes.data.data;

				setGlobalStats({
					totalMarketCap: formatBigNumber(global.total_market_cap.usd),
					totalVolume: formatBigNumber(global.total_volume.usd),
					btcDominance: `${global.market_cap_percentage.btc.toFixed(1)}%`,
					activeMarkets: global.active_cryptocurrencies.toLocaleString(),
				});

				setLoading(false);
			} catch (err) {
				console.error("Fetch error:", err);
				setError("Failed to load market data.");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	function formatBigNumber(num: number): string {
		if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
		if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
		if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
		if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
		return `${num}`;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b border-border/40 bg-card/30">
				<div className="container max-w-screen-2xl px-4 py-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
								Markets
							</h1>
							<p className="text-muted-foreground text-lg">
								Real-time market data and trading opportunities
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search markets..."
									className="pl-10 w-full sm:w-64"
								/>
							</div>
							<Button variant="outline" className="flex items-center space-x-2">
								<Filter className="h-4 w-4" />
								<span>Filters</span>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Market Stats */}
			<div className="container max-w-screen-2xl px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{/* Total Market Cap */}
					<div className="bg-card rounded-xl p-6 border shadow-sm">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-green-500/10 rounded-lg">
								<TrendingUp className="h-5 w-5 text-green-500" />
							</div>
							<span className="text-sm text-muted-foreground">24h</span>
						</div>
						<div className="space-y-1">
							<p className="text-2xl font-bold text-foreground">
								{globalStats ? `$${globalStats.totalMarketCap}` : "—"}
							</p>
							<p className="text-sm text-muted-foreground">Total Market Cap</p>
						</div>
					</div>

					{/* 24h Volume */}
					<div className="bg-card rounded-xl p-6 border shadow-sm">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-blue-500/10 rounded-lg">
								<BarChart3 className="h-5 w-5 text-blue-500" />
							</div>
							<span className="text-sm text-muted-foreground">24h</span>
						</div>
						<div className="space-y-1">
							<p className="text-2xl font-bold text-foreground">
								{globalStats ? `$${globalStats.totalVolume}` : "—"}
							</p>
							<p className="text-sm text-muted-foreground">Trading Volume</p>
						</div>
					</div>

					{/* Active Markets */}
					<div className="bg-card rounded-xl p-6 border shadow-sm">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-purple-500/10 rounded-lg">
								<Activity className="h-5 w-5 text-purple-500" />
							</div>
							<span className="text-sm text-muted-foreground">Live</span>
						</div>
						<div className="space-y-1">
							<p className="text-2xl font-bold text-foreground">
								{globalStats ? globalStats.activeMarkets : "—"}
							</p>
							<p className="text-sm text-muted-foreground">Active Markets</p>
						</div>
					</div>

					{/* BTC Dominance */}
					<div className="bg-card rounded-xl p-6 border shadow-sm">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-yellow-500/10 rounded-lg">
								<DollarSign className="h-5 w-5 text-yellow-500" />
							</div>
							<span className="text-sm text-muted-foreground">Bitcoin</span>
						</div>
						<div className="space-y-1">
							<p className="text-2xl font-bold text-foreground">
								{globalStats ? globalStats.btcDominance : "—"}
							</p>
							<p className="text-sm text-muted-foreground">Dominance</p>
						</div>
					</div>
				</div>
				{/* Markets Table */}
				<div className="bg-card rounded-xl border shadow-sm overflow-hidden">
					<div className="p-6 border-b border-border">
						<h2 className="text-xl font-semibold text-foreground">
							Top Markets
						</h2>
					</div>

					<div className="overflow-x-auto">
						{loading ? (
							<div className="p-6 text-center text-muted-foreground">
								Loading...
							</div>
						) : error ? (
							<div className="p-6 text-center text-red-500">{error}</div>
						) : (
							<table className="w-full">
								<thead>
									<tr className="border-b border-border bg-muted/30">
										<th className="text-left p-4 font-medium text-muted-foreground">
											Market
										</th>
										<th className="text-right p-4 font-medium text-muted-foreground">
											Price
										</th>
										<th className="text-right p-4 font-medium text-muted-foreground">
											24h Change
										</th>
										<th className="text-right p-4 font-medium text-muted-foreground">
											24h Volume
										</th>
										<th className="text-right p-4 font-medium text-muted-foreground">
											Market Cap
										</th>
										{/* <th className="text-right p-4 font-medium text-muted-foreground">
											Action
										</th> */}
									</tr>
								</thead>
								<tbody>
									{marketData.map((market) => (
										<tr
											key={market.symbol}
											className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
										>
											<td className="p-4">
												<div className="flex items-center space-x-3">
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
													>
														<Star className="h-4 w-4" />
													</Button>
													<div>
														<div className="font-semibold text-foreground">
															{market.symbol}
														</div>
														<div className="text-sm text-muted-foreground">
															{market.name}
														</div>
													</div>
												</div>
											</td>
											<td className="p-4 text-right">
												<div className="font-semibold text-foreground">
													${market.price.toLocaleString()}
												</div>
											</td>
											<td className="p-4 text-right">
												<div
													className={`flex items-center justify-end space-x-1 ${
														market.isPositive
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{market.isPositive ? (
														<ArrowUpRight className="h-4 w-4" />
													) : (
														<ArrowDownRight className="h-4 w-4" />
													)}
													<span className="font-medium">
														{market.isPositive ? "+" : ""}
														{market.changePercent.toFixed(2)}%
													</span>
												</div>
												<div
													className={`text-sm ${
														market.isPositive
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{market.isPositive ? "+" : ""}$
													{market.change.toFixed(2)}
												</div>
											</td>
											<td className="p-4 text-right">
												<div className="font-medium text-foreground">
													{market.volume}
												</div>
											</td>
											<td className="p-4 text-right">
												<div className="font-medium text-foreground">
													{market.marketCap}
												</div>
											</td>
											{/* <td className="p-4 text-right">
												<Button
													size="sm"
													className="bg-primary hover:bg-primary/90"
												>
													Trade
												</Button>
											</td> */}
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
