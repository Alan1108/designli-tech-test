import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Point,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface StockData {
  symbolName: string;
  price: string;
  timestamp: number;
}

interface PriceAlert {
  symbol: string;
  price: number;
}

interface StockChartProps {
  stockData: StockData[];
  priceAlerts: PriceAlert[];
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const StockChart: React.FC<StockChartProps> = ({
  stockData,
  priceAlerts,
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Stock Prices Over Time",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (context) => {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleString();
          },
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            millisecond: "HH:mm:ss.SSS",
            second: "HH:mm:ss",
            minute: "HH:mm",
            hour: "ha",
            day: "MMM d",
            week: "MMM d",
            month: "MMM yyyy",
            quarter: "MMM yyyy",
            year: "yyyy",
          },
        },
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          maxTicksLimit: 8,
          autoSkip: true,
          maxRotation: 0,
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Price (USD)",
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  // Group stock data by symbol
  const groupedData = stockData.reduce((acc, item) => {
    if (!acc[item.symbolName]) {
      acc[item.symbolName] = [];
    }
    acc[item.symbolName].push(item);
    return acc;
  }, {} as Record<string, StockData[]>);

  // Sort data points by timestamp for each symbol
  Object.keys(groupedData).forEach((symbol) => {
    groupedData[symbol].sort((a, b) => a.timestamp - b.timestamp);
  });

  // Create datasets for stock prices
  const stockDatasets = Object.entries(groupedData).map(([symbol, data]) => ({
    label: symbol,
    data: data.map((item) => ({
      x: item.timestamp,
      y: parseFloat(item.price),
    })),
    borderColor: getRandomColor(),
    tension: 0.1,
    pointRadius: 0, // Hide points for better performance
  }));

  // Create datasets for price alerts
  const alertDatasets = priceAlerts
    .map((alert) => {
      const symbolData = groupedData[alert.symbol] || [];
      const timestamps = symbolData.map((item) => item.timestamp);

      if (timestamps.length === 0) return null;

      return {
        label: `${alert.symbol} Alert (${alert.price})`,
        data: timestamps.map((time) => ({
          x: time,
          y: alert.price,
        })),
        borderColor: "rgba(255, 0, 0, 0.5)",
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0,
      };
    })
    .filter(
      (dataset): dataset is NonNullable<typeof dataset> => dataset !== null
    );

  const data: ChartData<"line"> = {
    datasets: [...stockDatasets, ...alertDatasets],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
};
