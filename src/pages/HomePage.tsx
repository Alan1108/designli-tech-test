import { Header } from "../modules/Header";
import { StockForm } from "../modules/StockForm";
import { useFinnhubSocket } from "../hooks/useFinnhubSocket";
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "subscribedStocks";

export const HomePage = () => {
  const { isConnected, latestMessage, subscribe, unsubscribe, closeSocket } =
    useFinnhubSocket({ reconnectInterval: 5000 });

  // Initialize state from localStorage
  const [subscribedSymbols, setSubscribedSymbols] = useState<Set<string>>(
    () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return new Set();
      }
    }
  );

  // Save to localStorage whenever subscribedSymbols changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(subscribedSymbols))
      );
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [subscribedSymbols]);

  // Subscribe to stored symbols when connection is established
  useEffect(() => {
    if (isConnected) {
      console.log(
        "Subscribing to stored symbols:",
        Array.from(subscribedSymbols)
      );
      subscribedSymbols.forEach((symbol) => {
        if (symbol) {
          console.log("Subscribing to:", symbol);
          subscribe(symbol);
        }
      });
    }
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      subscribedSymbols.forEach((symbol) => {
        if (symbol) {
          unsubscribe(symbol);
        }
      });
    };
  }, [isConnected, subscribe, unsubscribe, subscribedSymbols]);

  const handleSubscribe = useCallback(
    (symbol: string | null) => {
      if (symbol) {
        subscribe(symbol);
        setSubscribedSymbols((prev) => new Set([...prev, symbol]));
      }
    },
    [subscribe]
  );

  const handleUnsubscribe = useCallback(
    (symbol: string | null) => {
      if (symbol) {
        unsubscribe(symbol);
        setSubscribedSymbols((prev) => {
          const newSet = new Set(prev);
          newSet.delete(symbol);
          return newSet;
        });
      }
    },
    [unsubscribe]
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      <Header
        latestMessage={latestMessage}
        subscribedSymbols={subscribedSymbols}
      />
      <StockForm
        isConnected={isConnected}
        latestMessage={latestMessage}
        subscribe={handleSubscribe}
        unsubscribe={handleUnsubscribe}
        closeSocket={closeSocket}
        subscribedSymbols={subscribedSymbols}
      />
    </div>
  );
};
