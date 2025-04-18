import { useState, useEffect } from "react";

export const useSubscribedStocks = () => {
  const [subscribedStocks, setSubscribedStocks] = useState<string[]>(() => {
    try {
      const item = window.localStorage.getItem("subscribedStocks");
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(
        "Error reading subscribed stocks from localStorage:",
        error
      );
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "subscribedStocks",
        JSON.stringify(subscribedStocks)
      );
    } catch (error) {
      console.error("Error writing subscribed stocks to localStorage:", error);
    }
  }, [subscribedStocks]);

  const subscribeToStock = (symbol: string) => {
    setSubscribedStocks((prev) => {
      if (!prev.includes(symbol)) {
        return [...prev, symbol];
      }
      return prev;
    });
  };

  const unsubscribeFromStock = (symbol: string) => {
    setSubscribedStocks((prev) => prev.filter((s) => s !== symbol));
  };

  const isSubscribed = (symbol: string) => {
    return subscribedStocks.includes(symbol);
  };

  return {
    subscribedStocks,
    subscribeToStock,
    unsubscribeFromStock,
    isSubscribed,
  };
};
