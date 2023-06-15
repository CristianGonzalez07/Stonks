import { StockSearcher, Table, MainLayout } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";

interface Stock {
  id: number,
  symbol: string;
  name: string;
  currency: string;
}

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getStocks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stocks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStocks(response.data.stocks)
      console.log("success");
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      if (!stocks.length) {
        await getStocks();
        setLoading(false);
      }
      return true;
    })();
  }, []);

  return (
    <MainLayout>
      <StockSearcher />
      <Table stocks={stocks} />
    </MainLayout>
  );
};

export default Home;
