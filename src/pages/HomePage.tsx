import { Header } from "../modules/Header";
import { StockForm } from "../modules/StockForm";

export const HomePage = () => {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <Header />
      <StockForm />
    </div>
  );
};
