import { Header } from "../modules/Header";
import { StockForm } from "../modules/StockForm";
import { useFinnhubSocket } from "../hooks/useFinnhubSocket";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const { isConnected, latestMessage, subscribe, unsubscribe, closeSocket } =
    useFinnhubSocket({ reconnectInterval: 5000 });
  const [subscribedSymbols, setSubscribedSymbols] = useState<Set<string>>(
    new Set()
  );

  const handleSubscribe = (symbol: string | null) => {
    if (symbol) {
      subscribe(symbol);
      setSubscribedSymbols((prev) => new Set([...prev, symbol]));
    }
  };

  const handleUnsubscribe = (symbol: string | null) => {
    if (symbol) {
      unsubscribe(symbol);
      setSubscribedSymbols((prev) => {
        const newSet = new Set(prev);
        newSet.delete(symbol);
        return newSet;
      });
    }
  };

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
      />
    </div>
  );
};
