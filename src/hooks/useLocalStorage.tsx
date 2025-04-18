import { useState, useEffect, useCallback } from "react";

interface StockPriceData {
  symbolName: string;
  isProfit: boolean;
  percentage: string;
  price: string;
  profitLoss: number;
  timestamp: number;
}

export const useLocalStorage = (key: string) => {
  // Initialize state with data from localStorage or empty array
  const [storedData, setStoredData] = useState<StockPriceData[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // Update localStorage when storedData changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedData));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedData]);

  // Function to update stock price data
  const updateStockPrice = useCallback(
    (newData: Omit<StockPriceData, "timestamp">) => {
      setStoredData((prevData) => {
        const existingIndex = prevData.findIndex(
          (item) => item.symbolName === newData.symbolName
        );

        const updatedData = {
          ...newData,
          timestamp: Date.now(),
        };

        if (existingIndex >= 0) {
          // Update existing stock data
          const newDataArray = [...prevData];
          newDataArray[existingIndex] = updatedData;
          return newDataArray;
        } else {
          // Add new stock data
          return [...prevData, updatedData];
        }
      });
    },
    []
  );

  // Function to get latest price for a specific symbol
  const getLatestPrice = useCallback(
    (symbolName: string): StockPriceData | undefined => {
      return storedData.find((item) => item.symbolName === symbolName);
    },
    [storedData]
  );

  // Function to get all stored stock data
  const getAllStoredData = useCallback((): StockPriceData[] => {
    return storedData;
  }, [storedData]);

  // Function to clear all stored data
  const clearStoredData = useCallback(() => {
    setStoredData([]);
  }, []);

  return {
    storedData,
    updateStockPrice,
    getLatestPrice,
    getAllStoredData,
    clearStoredData,
  };
};
