import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface Stock {
  symbol: string;
  name: string;
  currency: string;
}

const StockSearcher = ({ handleAdd }: { handleAdd: (stock: Stock) => void }) => {
  const [options, setOptions] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [stock, setStock] = useState<Stock>({
    symbol: "",
    name: "",
    currency: ""
  });

  useEffect(() => {
    (async () => {
      if (!options.length) {
        const response = await axios.get(`${import.meta.env.VITE_TWELVE_API_URL}/stocks?source=docs&exchange=NYSE`);
        const data: Stock[] = response.data.data;
        setOptions(data);
        setLoading(false);
      }
      return true;
    })();
  }, []);

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center"
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd(stock)
      }}
    >
      <Autocomplete
        size="small"
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
        getOptionLabel={(option) => `${option.symbol} (${option.name})`}
        options={options}
        loading={loading}
        value={stock.symbol === "" ? null : stock}
        onChange={(event, value) => {
          if (value) {
            setStock(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Simbolo"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      <Button
        style={{ marginLeft: "20px" }}
        type="submit"
        disabled={loading}
        variant="contained"
        color="primary"
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {"Agregar"}
      </Button>
    </form>
  );
};

export default StockSearcher;
