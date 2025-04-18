import React, { useEffect, useState, useMemo } from "react";
import { getSymbolsFromApi } from "../services/FinnhubApiService";
import { SearchInput } from "../components/SearchInput";
import { ConnectionStatus } from "../components/ConnectionStatus";
import { Button } from "../components/Button";
import { StockChart } from "../components/StockChart";

interface StockFormProps {
  isConnected: boolean;
  latestMessage: any;
  subscribe: (symbol: string | null) => void;
  unsubscribe: (symbol: string | null) => void;
  closeSocket: () => void;
}

interface StockData {
  symbolName: string;
  price: string;
  timestamp: number;
}

interface PriceAlert {
  symbol: string;
  price: number;
}

export const StockForm: React.FC<StockFormProps> = ({
  isConnected,
  latestMessage,
  subscribe,
  unsubscribe,
}) => {
  const [symbol, setSymbol] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string | null>(null);
  const [symbols, setSymbols] = useState<(string | undefined)[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stockPriceHistory, setStockPriceHistory] = useState<StockData[]>([]);
  const [subscribedSymbols, setSubscribedSymbols] = useState<Set<string>>(
    new Set()
  );
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);

  // Filter symbols based on search term
  const filteredSymbols = useMemo(() => {
    if (!searchTerm) return symbols.slice(0, 20);

    return symbols
      .filter((s) => s && s.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 20);
  }, [symbols, searchTerm]);

  useEffect(() => {
    const getSymbols = async () => {
      const symbols = await getSymbolsFromApi();
      setSymbols(symbols);
    };
    getSymbols();
  }, []);

  // Update stock price history when new data arrives
  useEffect(() => {
    if (latestMessage?.data && latestMessage.data.length > 0) {
      setStockPriceHistory((prev) => {
        const newData = latestMessage.data
          .filter((item: any) => subscribedSymbols.has(item.s))
          .map((item: any) => ({
            symbolName: item.s,
            price: item.p,
            timestamp: Date.now(),
          }));

        // Keep last 50 data points for each symbol
        const maxDataPointsPerSymbol = 50;
        const groupedData: Record<string, StockData[]> = {};

        // Group existing data by symbol
        [...prev, ...newData].forEach((item) => {
          if (!groupedData[item.symbolName]) {
            groupedData[item.symbolName] = [];
          }
          groupedData[item.symbolName].push(item);
        });

        // Keep only the latest maxDataPointsPerSymbol points for each symbol
        const limitedData = Object.values(groupedData).flatMap((symbolData) =>
          symbolData.slice(-maxDataPointsPerSymbol)
        );

        return limitedData;
      });
    }
  }, [latestMessage, subscribedSymbols]);

  const handleSubscribe = () => {
    if (symbol) {
      subscribe(symbol);
      setSubscribedSymbols((prev) => new Set([...prev, symbol]));
    }
  };

  const handleUnsubscribe = () => {
    if (symbol) {
      unsubscribe(symbol);
      setSubscribedSymbols((prev) => {
        const newSet = new Set(prev);
        newSet.delete(symbol);
        return newSet;
      });
      // Remove data for unsubscribed symbol
      setStockPriceHistory((prev) =>
        prev.filter((item) => item.symbolName !== symbol)
      );
      // Remove price alerts for unsubscribed symbol
      setPriceAlerts((prev) => prev.filter((alert) => alert.symbol !== symbol));
    }
  };

  const handleClearChart = () => {
    setStockPriceHistory([]);
    setPriceAlerts([]);
  };

  const handleSetPriceAlert = () => {
    if (symbol && priceAlert) {
      const alertPrice = parseFloat(priceAlert);
      if (!isNaN(alertPrice)) {
        setPriceAlerts((prev) => {
          // Remove existing alert for this symbol if it exists
          const filtered = prev.filter((alert) => alert.symbol !== symbol);
          // Add new alert
          return [...filtered, { symbol, price: alertPrice }];
        });
        setPriceAlert(null); // Clear the input
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            margin: "0 0 1rem 0",
            color: "#333",
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >
          Stock Subscription
        </h2>

        <ConnectionStatus
          isConnected={isConnected}
          label="Finnhub Socket Status"
        />

        <SearchInput
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setSymbol(value);
          }}
          placeholder="Search for a stock"
          label="Search for a stock"
          suggestions={filteredSymbols}
          onSuggestionClick={(suggestion) => {
            setSymbol(suggestion);
            setSearchTerm(suggestion);
          }}
        />

        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <SearchInput
              value={priceAlert || ""}
              onChange={(value) => setPriceAlert(value)}
              placeholder="Enter price alert value"
              label="Price Alert"
            />
          </div>
          <Button
            onClick={handleSetPriceAlert}
            disabled={!symbol || !priceAlert}
          >
            Set Alert
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button onClick={handleSubscribe} fullWidth>
            Subscribe
          </Button>
          <Button onClick={handleUnsubscribe} variant="secondary" fullWidth>
            Unsubscribe
          </Button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          height: "600px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          padding: "2rem",
          marginLeft: "2rem",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleClearChart} variant="secondary">
            Clear Chart
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <StockChart stockData={stockPriceHistory} priceAlerts={priceAlerts} />
        </div>
      </div>
    </div>
  );
};
