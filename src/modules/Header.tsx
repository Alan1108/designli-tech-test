import React, { useEffect, useState, useRef } from "react";
import { StockCardList } from "../components/StockCardList";

interface HeaderProps {
  latestMessage: any;
  subscribedSymbols: Set<string>;
}

interface StockCardData {
  symbolName: string;
  isProfit: boolean;
  percentage: string;
  price: string;
  profitLoss: number;
}

export const Header: React.FC<HeaderProps> = ({
  latestMessage,
  subscribedSymbols,
}) => {
  const [stockCards, setStockCards] = useState<StockCardData[]>([]);
  // Use a ref instead of state for previousPrices to avoid re-renders
  const previousPricesRef = useRef<Record<string, number>>({});

  // Initialize stock cards with subscribed symbols
  useEffect(() => {
    // Create initial cards for all subscribed symbols
    const initialCards = Array.from(subscribedSymbols).map((symbol) => ({
      symbolName: symbol,
      isProfit: false,
      percentage: "0.00",
      price: "0.00",
      profitLoss: 0,
    }));

    setStockCards(initialCards);
  }, [subscribedSymbols]);

  // Process the latest message when it arrives
  useEffect(() => {
    if (latestMessage?.data && latestMessage.data.length > 0) {
      const newData = latestMessage.data
        .filter((item: any) => subscribedSymbols.has(item.s))
        .map((item: any) => {
          const symbol = item.s;
          const currentPrice = parseFloat(item.p);
          const previousPrice =
            previousPricesRef.current[symbol] || currentPrice;

          // Calculate price change and percentage
          const priceChange = currentPrice - previousPrice;
          const percentageChange =
            previousPrice !== 0
              ? ((priceChange / previousPrice) * 100).toFixed(2)
              : "0.00";

          // Update previous price for next calculation
          previousPricesRef.current[symbol] = currentPrice;

          return {
            symbolName: symbol,
            isProfit: priceChange >= 0,
            percentage: Math.abs(parseFloat(percentageChange)).toFixed(2),
            price: currentPrice.toFixed(2),
            profitLoss: parseFloat(priceChange.toFixed(2)),
          };
        });

      // Update stock cards with new data
      setStockCards((prevCards) => {
        // Create a map of existing cards by symbol for easy lookup
        const existingCardsMap = new Map(
          prevCards
            .filter((card) => subscribedSymbols.has(card.symbolName))
            .map((card) => [card.symbolName, card])
        );

        // Update or add new cards
        newData.forEach((newCard: StockCardData) => {
          existingCardsMap.set(newCard.symbolName, newCard);
        });

        // Convert map back to array
        return Array.from(existingCardsMap.values());
      });
    }
  }, [latestMessage, subscribedSymbols]);

  if (subscribedSymbols.size === 0) {
    return (
      <div
        style={{
          backgroundColor: "#222323",
          padding: "1rem",
          color: "#6c757d",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: 500,
          width: "100%",
        }}
      >
        No stocks subscribed. Use the form below to add stocks to track.
      </div>
    );
  }

  // If no data is available yet, show placeholder cards for subscribed symbols
  if (stockCards.length === 0 && subscribedSymbols.size > 0) {
    const placeholderCards = Array.from(subscribedSymbols).map((symbol) => ({
      symbolName: symbol,
      isProfit: false,
      percentage: "0.00",
      price: "0.00",
      profitLoss: 0,
    }));

    return <StockCardList cards={placeholderCards} />;
  }

  return <StockCardList cards={stockCards} />;
};
