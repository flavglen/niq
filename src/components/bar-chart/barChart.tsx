import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useProductContext } from '../../context/productContext';

const BarChart = () => {
  const { selectedProducts } = useProductContext();
  const [chartType, setChartType] = React.useState<string>('Price');
  const generateBarChartOptions = () => {
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: `${chartType} Comparison`,
      },
      xAxis: {
        title: {
          text: 'Product Title',
        },
        categories: selectedProducts.map(product => product.title),
      },
      yAxis: {
        title: {
          text: chartType
        },
        tickInterval: 150,
      },
      series: [
        {
          name: chartType,
          data: chartType === 'Price' ? selectedProducts.map(product => product.price) : selectedProducts.map(product => product.rating.count),
        },
      ],
    };

    return options;
  }

  const changeChart = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setChartType(value);
  }

  const chartOptions = generateBarChartOptions();

  return (
    <Box component="div" style={{border: '1px solid rgba(224, 224, 224, 1)', marginBottom: 15}}>
      <FormControl variant="outlined" style={{ width: '350px', margin: 20 }}>
        <InputLabel id="dropdown-label">Products</InputLabel>
        <Select
          labelId="dropdown-label"
          value={chartType}
          onChange={changeChart}
          label="Select an Option"
        >
          <MenuItem value="Price">Price</MenuItem>
          <MenuItem value="Rating">Rating</MenuItem>
        </Select>
      </FormControl>

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  )
}

export default BarChart;