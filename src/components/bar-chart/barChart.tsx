import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useProductContext } from '../../context/productContext';

const BarChart = () => {
const { selectedProducts} = useProductContext();
  const generateBarChartOptions = () => {
    const options = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Price Comparison',
        },
        xAxis: {
          title: {
            text: 'Product Title',
          },
          categories: selectedProducts.map(product => product.title),
        },
        yAxis: {
          title: {
            text: 'Price',
          },
          tickInterval: 150,
        },
        series: [
          {
            name: 'Price',
            data: selectedProducts.map(product => product.price),
          },
        ],
      };

      return options;
  }

  const chartOptions =  generateBarChartOptions();

  return (
     <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  )
}

export default BarChart;