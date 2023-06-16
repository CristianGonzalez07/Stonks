import { StockSearcher, Table, MainLayout } from "../components";
import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


interface Stock {
  id: number,
  symbol: string;
  name: string;
  currency: string;
}

interface StockInput {
  symbol: string;
  name: string;
  currency: string;
}

function Transition(props:any) {
  return <Slide {...props} direction="up" />;
}

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

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
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      if (!stocks.length) {
        await getStocks();
      }
      return true;
    })();
  }, []);

  const handleDelete = async (rowID: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/remove-stock?stockID=${rowID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAlertType("success")
      setMessage("Acción eliminada correctamente!");
      setOpenAlert(true);
      await getStocks();
    } catch (error) {
      setAlertType("error")
      setMessage("Error Al eliminar la acción");
      setOpenAlert(true);
      console.error("Error:", error);
    }
    setLoading(false);
  }

  const handleAdd = async (stock: StockInput) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_URL}/add-stock`, stock, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAlertType("success")
      setMessage("Acción Agregada correctamente!");
      setOpenAlert(true);
      await getStocks();
    } catch (error:any) {
      const errorMsg: string = error.response.data.message;
      setAlertType("error")
      setMessage(errorMsg === "Already Exists" ? "La acción ya existe, no se puede agregar nuevamente" : "Error al agregar la acción, intente nuevamente");
      setOpenAlert(true);
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <MainLayout headerTitle="Mis Acciones">
      <StockSearcher handleAdd={handleAdd} loading={loading} setLoading={setLoading}/>
      <Table stocks={stocks} handleDelete={handleDelete} />
      <Snackbar
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        autoHideDuration={3000}
        TransitionComponent={Transition} 
      >
        <Alert severity={alertType as AlertColor} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default Home;
