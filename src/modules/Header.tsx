import { StockCard } from "../components/StockCard";

export const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        backgroundColor: "#222323",
      }}
    >
      <StockCard
        symbolName="BTC-USD"
        isProfit={false}
        percentage="-0.09"
        price="83555.88"
        profitLoss={-73.9}
      />
      <StockCard
        symbolName="BTC-USD"
        isProfit={true}
        percentage="-0.09"
        price="83555.88"
        profitLoss={-73.9}
      />
      <StockCard
        symbolName="BTC-USD"
        isProfit={false}
        percentage="-0.09"
        price="83555.88"
        profitLoss={-73.9}
      />
      <StockCard
        symbolName="BTC-USD"
        isProfit={true}
        percentage="-0.09"
        price="83555.88"
        profitLoss={-73.9}
      />
    </div>
  );
};
