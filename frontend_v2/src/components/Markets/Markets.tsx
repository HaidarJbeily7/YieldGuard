import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "../Header/Header";
import AlertsPanel from "../AlertsPanel/AlertsPanel";
import TokenScroller, { type Token } from "./TokenScroller/TokenScroller";

const Markets = () => {
	const [isAlertsPanelOpen, setIsAlertsPanelOpen] = useState(false);
	const [selectedToken, setSelectedToken] = useState<string>("btc");

	const sampleTokens: Token[] = [
		{
			id: "btc",
			name: "Bitcoin",
			symbol: "BTC",
			price: 106435.63,
			change: -0.41,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
		},
		{
			id: "eth",
			name: "Ethereum",
			symbol: "ETH",
			price: 2545.97,
			change: 0.98,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
		},
		{
			id: "bnb",
			name: "BNB",
			symbol: "BNB",
			price: 651.12,
			change: 0.17,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
		},
		{
			id: "xrp",
			name: "XRP",
			symbol: "XRP",
			price: 0.534,
			change: -1.23,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
		},
		{
			id: "sol",
			name: "Solana",
			symbol: "SOL",
			price: 154.91,
			change: 2.14,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
		},
		{
			id: "doge",
			name: "Dogecoin",
			symbol: "DOGE",
			price: 0.084,
			change: -0.42,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
		},
		{
			id: "ada",
			name: "Cardano",
			symbol: "ADA",
			price: 0.388,
			change: -0.22,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
		},
		{
			id: "avax",
			name: "Avalanche",
			symbol: "AVAX",
			price: 39.47,
			change: 1.05,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
		},
		{
			id: "dot",
			name: "Polkadot",
			symbol: "DOT",
			price: 5.92,
			change: 0.11,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
		},
		{
			id: "link",
			name: "Chainlink",
			symbol: "LINK",
			price: 14.35,
			change: 0.89,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
		},
		{
			id: "matic",
			name: "Polygon",
			symbol: "MATIC",
			price: 0.79,
			change: -0.37,
			iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
		},
	];

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-foreground ">
			<Header />

			<main className={cn("px-4 py-6 transition-all duration-300 mr-[68px]")}>
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Markets</h1>
				</div>

				<section className="mb-8">
					<h2 className="text-lg font-medium mb-2">Coins</h2>
					<TokenScroller
						tokens={sampleTokens}
						selectedId={selectedToken}
						onSelect={setSelectedToken}
					/>
				</section>
			</main>

			<AlertsPanel
				isOpen={isAlertsPanelOpen}
				onToggle={() => setIsAlertsPanelOpen(!isAlertsPanelOpen)}
			/>
		</div>
	);
};

export default Markets;
