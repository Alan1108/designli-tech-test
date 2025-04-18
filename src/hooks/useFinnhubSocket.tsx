import { useCallback, useEffect, useRef, useState } from "react";
import { environment } from "../utils/environment";

interface IFinnhubSocketOptions {
  reconnectInterval?: number;
}

export const useFinnhubSocket = (options: IFinnhubSocketOptions) => {
  const { reconnectInterval } = options;
  const [latestMessage, setLatestMessage] = useState<any>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const subscribedSymbolsRef = useRef<Set<string | null>>(new Set());

  const subscribe = useCallback(
    (symbol: string | null) => {
      console.log(symbol);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
        subscribedSymbolsRef.current.add(symbol);
      }
    },
    [socket]
  );

  const unsubscribe = useCallback(
    (symbol: string | null) => {
      if (
        socket &&
        socket.readyState === WebSocket.OPEN &&
        subscribedSymbolsRef.current.has(symbol)
      ) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        subscribedSymbolsRef.current.delete(symbol);
      }
    },
    [socket]
  );

  const closeSocket = useCallback(() => {
    if (socket) socket.close();
  }, [socket]);

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket(`${environment.wsUrl}${environment.apiKey}`);
      setSocket(socket);

      socket.onopen = (event) => {
        console.info("Socket connected to Finnhub");
        setIsConnected(true);
        subscribedSymbolsRef.current.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
        });
        console.info(event);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLatestMessage(data);
        console.log(data);
      };

      socket.onerror = (event) => {
        console.error("Socket error", event);
        setIsConnected(false);
        setSocket(null);
        throw event;
      };
    };
    connect();

    return () => {
      if (socket) {
        subscribedSymbolsRef.current.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        });
        socket.close();
      }
    };
  }, [reconnectInterval]);

  return {
    socket,
    isConnected,
    latestMessage,
    subscribe,
    unsubscribe,
    closeSocket,
  };
};
