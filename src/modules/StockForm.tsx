import React, { useEffect, useState, useMemo } from "react";
import { useFinnhubSocket } from "../hooks/useFinnhubSocket";
import { getSymbolsFromApi } from "../services/FinnhubApiService";

export const StockForm = () => {
  const { isConnected, latestMessage, subscribe, unsubscribe, closeSocket } =
    useFinnhubSocket({ reconnectInterval: 5000 });
  const [symbol, setSymbol] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string | null>(null);
  const [symbols, setSymbols] = useState<(string | undefined)[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter symbols based on search term
  const filteredSymbols = useMemo(() => {
    if (!searchTerm) return symbols.slice(0, 20); // Show only first 20 symbols when no search term

    return symbols
      .filter((s) => s && s.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 20); // Limit to 20 results for better performance
  }, [symbols, searchTerm]);

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            backgroundColor: isConnected ? "#e6f7e6" : "#fde8e8",
            borderRadius: "6px",
            border: `1px solid ${isConnected ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: isConnected ? "#28a745" : "#dc3545",
            }}
          ></div>
          <p
            style={{
              margin: 0,
              color: isConnected ? "#155724" : "#721c24",
              fontWeight: "500",
            }}
          >
            Finnhub Socket Status: {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <label
            htmlFor="symbol-search"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#495057",
            }}
          >
            Search for a stock
          </label>
          <input
            id="symbol-search"
            type="text"
            placeholder="Search for a stock"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSymbol(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "1rem",
              transition:
                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#80bdff";
              e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.25)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ced4da";
              e.target.style.boxShadow = "none";
            }}
          />
          {searchTerm && filteredSymbols.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "250px",
                overflowY: "auto",
                backgroundColor: "white",
                border: "1px solid #ced4da",
                borderRadius: "0 0 6px 6px",
                zIndex: 1000,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginTop: "2px",
              }}
            >
              {filteredSymbols.map((symbol, index) => (
                <div
                  key={`${symbol}-${index}`}
                  onClick={() => {
                    setSymbol(symbol || null);
                    setSearchTerm(symbol || "");
                  }}
                  style={{
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #f1f1f1",
                    transition: "background-color 0.15s ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="price-alert"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
              color: "#495057",
            }}
          >
            Price Alert
          </label>
          <input
            id="price-alert"
            type="text"
            placeholder="Enter price alert value"
            onChange={(e) => setPriceAlert(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "1rem",
              transition:
                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#80bdff";
              e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.25)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ced4da";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => subscribe(symbol)}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.15s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0069d9";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            Subscribe
          </button>
          <button
            onClick={() => unsubscribe(symbol)}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.15s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#5a6268";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#6c757d";
            }}
          >
            Unsubscribe
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          padding: "2rem",
          marginLeft: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #ced4da",
            borderRadius: "6px",
            color: "#6c757d",
            fontSize: "1.2rem",
          }}
        >
          Chart will be displayed here
        </div>
      </div>
    </div>
  );
};
