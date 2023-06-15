import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dayjs from 'dayjs';

interface stockInfo {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

HighchartsExporting(Highcharts);

const LineChart = ({data, interval, currency}:{data:stockInfo[] | undefined, interval:number, currency:string}) => {
  useEffect(() => {
    Highcharts.setOptions({
      lang: {
        months: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        weekdays: [
          'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
        ],
        shortMonths: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        rangeSelectorZoom: 'Período',
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'Hasta',
        resetZoom: 'Restablecer zoom',
        downloadCSV: 'Descargar CSV',
        downloadJPEG: 'Descargar imagen JPEG',
        downloadPDF: 'Descargar documento PDF',
        downloadPNG: 'Descargar imagen PNG',
        downloadSVG: 'Descargar imagen SVG',
        downloadXLS: 'Descargar XLS',
        viewFullscreen: 'Ver en pantalla completa',
        exitFullscreen: 'Salir de pantalla completa',
        printChart: 'Imprimir gráfico',
      }
    });

    const chartData = data?.map(function(item) {
      const date = dayjs(item.datetime).valueOf();
      const close = parseFloat(item.close);
      return [date, close];
    });

    
    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Cotización',
        align: 'left'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Haz clic y arrastra en el área del gráfico para hacer zoom' :
          'Haz zoom en el gráfico con gestos de pellizco',
        align: 'left'
      },
      xAxis: {
        type: 'datetime',
        tickInterval: interval * 60 * 1000,
        labels: {
          format: '{value:%d-%m-%Y %H:%M}'
        }
      },
      yAxis: {
        title: {
          text: `Valor en ${currency}`
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.color('#ADD8E6').setOpacity(0.4).get('rgba')],
              [1, Highcharts.color('#ADD8E6').setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: 'Cotización',
        data: chartData
      }],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'exitFullscreen',
              'printChart',
              'separator',
              'downloadCSV',
              'downloadJPEG',
              'downloadPDF',
              'downloadPNG',
              'downloadSVG',
              'downloadXLS',
            ]
          }
        }
      }
    });
  }, [data]);

  return <div id="container" />;
};

export default LineChart;
