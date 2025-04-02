"use client";

import { useEffect, useRef } from "react";

export function PerformanceChart({ data }: { data: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Chart settings
    const padding = 20;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const dataPointSpacing = chartWidth / (data.length - 1);

    // Find min and max values for scaling
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue || 1; // prevent division by zero

    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + index * dataPointSpacing;
      const normalizedValue = (value - minValue) / valueRange;
      const y = padding + chartHeight - normalizedValue * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Change color based on value
      ctx.strokeStyle = value >= 0 ? "#2DD4BF" : "#ef4444";
    });
    ctx.stroke();

    // Draw TradingView logo
    ctx.fillStyle = "#2DD4BF";
    ctx.font = "bold 16px Arial";
    ctx.fillText("TW", padding + 10, canvas.height - padding / 2);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
}
