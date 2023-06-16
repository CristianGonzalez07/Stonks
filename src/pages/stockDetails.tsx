import { CustomDateTimePicker, CustomSelect, LineChart, MainLayout } from '../components';
import { SelectChangeEvent } from '@mui/material/Select';
import { Alert, Slide, Snackbar } from "@mui/material";
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


interface stockInfo {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface stockInput {
  symbol: string;
  name: string;
  currency: string;
}

const Historical: string = "Histórico";
const Timezone: string = "America/New_York";

const StockDetails = () => {
  const date = dayjs().startOf('day');;
  const initialDate = date.format('YYYY-MM-DD HH:mm:ss')
  const location = useLocation();
  const [stockSymbol, setStockSymbol] = useState<string>(location.pathname.split('/')[2]);
  const [stock, setStock] = useState<stockInput | undefined>();
  const [intervalTime, setIntervalTime] = useState<string>("1")
  const [type, setType] = useState<string>("Tiempo Real")
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dataChart, setDataChart] = useState<stockInfo[]>()
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
    setStartDate("");
    setEndDate("");
  };

  function Transition(props: any) {
    return <Slide {...props} direction="up" />;
  }

  const handleChangeInterval = (event: SelectChangeEvent) => {
    setIntervalTime(event.target.value);
  };

  const fetchData = async () => {
    if (type !== Historical && initialDate !== "") {
      try {
        let actualDate = dayjs();
        let actualDateString = actualDate.format('YYYY-MM-DD HH:mm:ss')
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_TWELVE_API_URL}/time_series?symbol=${stockSymbol}&interval=${intervalTime}min&start_date=${initialDate}&end_date=${dayjs(actualDateString).tz(Timezone)}&apikey=${import.meta.env.VITE_TWELVE_API_KEY}`);
        if (response.data.status === "ok") {
          let data = response.data.values;
          setDataChart(data.reverse())
        }
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  useEffect(() => {
    setStockSymbol(location.pathname.split('/')[2]);
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      if (stockSymbol !== '') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_TWELVE_API_URL}/stocks?symbol=${stockSymbol}&source=docs`);
          let data = response.data.data.filter((item: any) => item.exchange === 'NYSE')[0];
          setStock(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      return true;
    })();
  }, [stockSymbol]);

  useEffect(() => {
    if (type === Historical && startDate !== "" && endDate !== "") {
      (async () => {
        try {
          setLoading(true)
          const response = await axios.get(`${import.meta.env.VITE_TWELVE_API_URL}/time_series?symbol=${stockSymbol}&interval=${intervalTime}min&start_date=${dayjs(startDate).tz(Timezone)}&end_date=${dayjs(endDate).tz(Timezone)}&apikey=${import.meta.env.VITE_TWELVE_API_KEY}`);
          if (response.data.status === "ok") {
            let data = response.data.values;
            setDataChart(data.reverse())
          } else {
            setOpenAlert(true);
          }
          setLoading(false)
        } catch (error) {
          console.error('Error:', error);
        }
        return true;
      })();
    }
  }, [type, intervalTime, startDate, endDate]);
  
  useEffect(() => {
    fetchData();
  
    const interval = setInterval(fetchData, 60000 * parseInt(intervalTime));
  
    return () => {
      clearInterval(interval);
    };
  }, [type, initialDate]);  

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'minutesStep':
      case 'maxDate':
      case 'minDate': {
        return 'Selecciona una fecha posterior';
      }

      case 'invalidDate': {
        return 'Fecha no válida';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <MainLayout headerTitle={stock ? `${stock.symbol} - ${stock.name} - ${stock.currency}` : ''}>
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <CustomSelect
                  label="Intervalo"
                  items={["1", "5", "15"]}
                  value={intervalTime}
                  handleChange={handleChangeInterval}
                  disabled={loading}
                />
              </Grid>
              <Grid item>
                <CustomSelect
                  label="Tipo"
                  items={["Tiempo Real", Historical]}
                  value={type}
                  handleChange={handleChangeType}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <CustomDateTimePicker
                  selectedDate={startDate ? dayjs(startDate) : null}
                  label="Desde"
                  format="DD-MM-YYYY HH:mm"
                  minDate={null}
                  handleChange={(date: any) => setStartDate((date.format('YYYY-MM-DD HH:mm:ss')))}
                  handleError={(newError: string | null) => setError(newError || '')}
                  errorMessage={errorMessage}
                  disabled={type !== Historical || loading}
                />
              </Grid>
              <Grid item>
                <CustomDateTimePicker
                  selectedDate={endDate ? dayjs(endDate) : null}
                  label="Hasta"
                  format="DD-MM-YYYY HH:mm"
                  minDate={dayjs(startDate)}
                  handleChange={(date: any) => setEndDate((date.format('YYYY-MM-DD HH:mm:ss')))}
                  handleError={(newError: string | null) => setError(newError || '')}
                  errorMessage={errorMessage}
                  disabled={type !== Historical || loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box py={10}>
        <LineChart originTimezone={Timezone} data={dataChart} interval={parseInt(intervalTime)} currency={stock?.currency || ""} />
      </Box>
      <Snackbar
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        autoHideDuration={3000}
        TransitionComponent={Transition}
      >
        <Alert severity={'error'} sx={{ width: '100%' }}>
          {"No existen datos para las fechas solicitadas"}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default StockDetails;
