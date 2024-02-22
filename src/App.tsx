import React from 'react';
import ScatterPlotChart from './ScatterPlotChart'; // Import the ScatterPlotChart component

const App: React.FC = () => {
  // Generate larger dataset based on sales and product
  const generateData = (count: number) => {
    const data = [];
    const products = ['Product A', 'Product B']; // Example product list
    for (let i = 1; i <= count; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const sales = Math.floor(Math.random() * 100);
      data.push({ sales, product, country: 'Unknown' }); // Add a default country value
    }
    return data;
  };

  const largerData = generateData(100); // Generating 100 data points

  return (
    <div className="App">
      {/* Render the ScatterPlotChart component with the correct props */}
      <ScatterPlotChart data={largerData} width={600} height={400} />
    </div>
  );
};

export default App;

