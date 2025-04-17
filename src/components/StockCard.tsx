import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

interface IStockCardProps {
  symbolName: string;
  price: string;
  percentage: string;
  isProfit: boolean;
  profitLoss: number;
}

export const StockCard = (props: IStockCardProps) => {
  const { symbolName, price, percentage, isProfit, profitLoss } = props;
  return (
    <div
      style={{
        borderRight: "solid grey",
        width: "20rem",
        padding: "1rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <span>{symbolName}</span>
        <span style={{ fontWeight: "bold" }}>{price}</span>
      </div>
      <div
        style={{ color: isProfit ? "#1FB955" : "#F55B5A", fontSize: ".9rem" }}
      >
        {isProfit ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <span style={{ fontSize: "1.2rem" }}>{`${percentage}%`}</span>
        <span>{`(${profitLoss})`}</span>
      </div>
    </div>
  );
};
