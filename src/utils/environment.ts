export const environment = {
  wsUrl:
    import.meta.env.VITE_FINNHUB_SOCKET_URL || "wss://ws.finnhub.io?token=",
  apiKey: import.meta.env.VITE_FINNHUB_API_KEY || "",
};
