import { DefaultApi, StockSymbol } from "finnhub-ts";
import { environment } from "../utils/environment";

const finnhubClient = new DefaultApi({
  apiKey: environment.apiKey,
  isJsonMime: (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {}
    return false;
  },
});
export const getSymbolsFromApi = async () => {
  const response = await finnhubClient.stockSymbols("US");
  return response.data.map((symbol: StockSymbol) => {
    return symbol.symbol;
  });
};
