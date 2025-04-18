import React from "react";
import { StockCard } from "./StockCard";

interface StockCardData {
  symbolName: string;
  isProfit: boolean;
  percentage: string;
  price: string;
  profitLoss: number;
}

interface StockCardListProps {
  cards: StockCardData[];
}

export const StockCardList: React.FC<StockCardListProps> = ({ cards }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#222323",
      }}
    >
      {cards.map((card, index) => (
        <StockCard
          key={`${card.symbolName}-${index}`}
          symbolName={card.symbolName}
          isProfit={card.isProfit}
          percentage={card.percentage}
          price={card.price}
          profitLoss={card.profitLoss}
        />
      ))}
    </div>
  );
};
