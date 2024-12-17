import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { categoryArr, incomeCategoryArr } from "../constants";

function Graph() {
  const categoriesData = [...categoryArr, ...incomeCategoryArr];
  const [chartData, setChartData] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('transactionList');
    if (data) {
      const parsedData = JSON.parse(data);
      setTransactionList(parsedData);
    }
  }, []);

  useEffect(() => {
    // Clear previous chart data
    setChartData([]);
    let calculatedTotalValue = 0;
    const newObj = {};

    // Calculate total value and accumulate category values
    transactionList.forEach(object => {
      categoriesData.forEach(category => {
        if (object.category === category) {
          if (newObj[category]) {
            newObj[category] += +object.value;
          } else {
            newObj[category] = +object.value;
          }
          calculatedTotalValue += +object.value;  // accumulate total value
        }
      });
    });

    setTotalValue(calculatedTotalValue);  // Set total value after calculation

    console.log(calculatedTotalValue, 'calculatedTotalValue')

    // Prepare chart data after totalValue is known
    const newChartData = Object.keys(newObj).map(item => ({
      id: Math.random(),
      value: (newObj[item] * 100) / calculatedTotalValue, // calculate percentage
      label: item
    }));

    setChartData(newChartData);

  }, [transactionList]);

  return (
    <div>
      Graph
      {/* <PieChart
        series={[{
          data: chartData
        }]}
        width={400}
        height={200}
      /> */}
       <PieChart
        series={[{
          data: chartData,
          valueFormatter: (datum) => `${datum.value.toFixed(2)}%`,
          arcLabel: (item) => `${item.label}`
        }]}
        width={600}
        height={400}
      />
    </div>
  );
}

export default Graph;
