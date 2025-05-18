// src/components/TokenChart.tsx
import { useEffect, useRef } from "react";

import {
	createChart,
	CrosshairMode,
	LineSeries,
	HistogramSeries,
} from "lightweight-charts";
import type { UTCTimestamp } from "lightweight-charts";

interface ChartPoint {
	time: number;
	price: number;
	volume: number;
}

export default function TokenChart({ data }: { data: ChartPoint[] }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current || data.length === 0) return;

		const chart = createChart(ref.current, {
			layout: { background: { color: "#0d0d0d" }, textColor: "#d1d5db" },
			localization: {
				priceFormatter: (price: number) => {
					return price.toFixed(5);
				},
			},
			grid: {
				vertLines: { color: "#1f1f1f" },
				horzLines: { color: "#1f1f1f" },
			},
			crosshair: { mode: CrosshairMode.Normal },
			rightPriceScale: {
				borderVisible: true,
				autoScale: true,
				scaleMargins: { top: 0.2, bottom: 0.3 },
			},
			timeScale: {
				borderVisible: true,
				ticksVisible: true,
				timeVisible: true,
			},
			height: 160,
			width: ref.current.clientWidth,
		});

		const priceSeries = chart.addSeries(LineSeries, {
			color: "#00C6A2",
			lineWidth: 2,
			priceScaleId: "right",
			priceFormat: {
				type: "custom",
				minMove: 0.00001,
			},
		});

		chart.priceScale("right").applyOptions({
			scaleMargins: {
				top: 0.1,
				bottom: 0.1,
			},
		});

		priceSeries.setData(
			data.map((d) => ({
				time: d.time as UTCTimestamp,
				value: d.price,
			})),
		);

		const volumeSeries = chart.addSeries(HistogramSeries, {
			priceScaleId: "volume", // custom ID
			priceFormat: {
				type: "volume",
			},
			color: "#888",
		});

		chart.priceScale("volume").applyOptions({
			scaleMargins: {
				top: 0.9,
				bottom: 0,
			},
			borderVisible: false,
		});

		volumeSeries.setData(
			data.map((d, i) => ({
				time: d.time as UTCTimestamp,
				value: d.volume,
				color: i === 0 || d.price >= data[i - 1].price ? "#00C6A2" : "#FF4976",
			})),
		);

		return () => chart.remove();
	}, [data]);

	return <div ref={ref} className="w-full h-[160px]" />;
}
