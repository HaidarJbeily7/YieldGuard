export interface MarketDataItem {
	icon: string;
	symbol: string;
	network: string;
	exchange: string;
	price: number;
	changePercent: number;
	tradingVolume: number;
	volumeChangePercent: number;
	transactions24h: number;
	chartData: {
		time: number;
		price: number;
		volume: number;
	}[];
}
