import React from 'react';
import ScatterPlotChart from './ScatterPlotChart'; // Import the ScatterPlotChart component

const App: React.FC = () => {
  // Generate larger dataset
  const generateData = (count: number) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({ hoursStudied: i, examScore: Math.floor(Math.random() * 100) });
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
