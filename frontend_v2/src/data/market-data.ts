// src/data/market-data.ts
import type { MarketDataItem } from "@/types/market";

function gaussianRandom() {
	let u = 0;
	let v = 0;
	while (u === 0) u = Math.random();
	while (v === 0) v = Math.random();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export const generateChartData = (
	points = 60,
	startPrice = 0.005,
	drift = 0.05,
	volatility = 0.15,
): MarketDataItem["chartData"] => {
	const nowSec = Math.floor(Date.now() / 1000);
	let price = startPrice;
	const result = [];

	for (let i = 0; i < points; i++) {
		const dt = 1 / points;
		const shock = gaussianRandom() * Math.sqrt(dt) * volatility;
		price = price * Math.exp((drift - 0.5 * volatility ** 2) * dt + shock);

		const time = nowSec - (points - 1 - i) * 3600;

		result.push({
			time,
			price: Number(price.toFixed(8)),
			volume: Math.floor(Math.random() * 1000) + 100, // random volume
		});
	}

	return result;
};

export const marketData: MarketDataItem[] = Array(13)
	.fill(0)
	.map(() => ({
		icon: "/imgs/trump.png",
		symbol: "Near Trump / WETH",
		network: "Near",
		exchange: "Rhea.finance",
		price: 250,
		changePercent: 2.3,
		tradingVolume: 25_000,
		volumeChangePercent: 2.3,
		transactions24h: 125,
		chartData: generateChartData(),
	}));
