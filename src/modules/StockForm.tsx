import React, { useEffect, useState } from "react";
import { useFinnhubSocket } from "../hooks/useFinnhubSocket";
import { getSymbolsFromApi } from "../services/FinnhubApiService";

export const StockForm = () => {
  const { isConnected, latestMessage, subscribe, unsubscribe, closeSocket } =
    useFinnhubSocket({ reconnectInterval: 5000 });
  const [symbol, setSymbol] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string | null>(null);
  const [symbols, setSymbols] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const getSymbols = async () => {
      const symbols = await getSymbolsFromApi();
      setSymbols(symbols);
    };
    getSymbols();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p>
          Finnhub Socket Status: {isConnected ? "Connected" : "Disconnected"}
        </p>
        <input
          list="stock-symbols"
          onChange={(e) => setSymbol(e.target.value)}
        />
        <datalist id="stock-symbols">
          {symbols.map((symbol, index) => {
            return <option key={`${symbol}-${index}`} value={symbol} />;
          })}
        </datalist>
        <input
          type="text"
          placeholder="Price Alert"
          onChange={(e) => setPriceAlert(e.target.value)}
        />
        <button onClick={() => subscribe(symbol)}>Subscribe</button>
        <button onClick={() => unsubscribe(symbol)}>Unsubscribe</button>
      </div>
      <div>Chart</div>
    </div>
  );
};
