import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  hoursStudied: number;
  examScore: number;
}

interface Props {
  data: DataPoint[];
  width: number;
  height: number;
}

const ScatterPlotChart: React.FC<Props> = ({ data: initialData, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  const [data, setData] = useState<DataPoint[]>(initialData);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<DataPoint | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    const margin = { top: 40, right: 50, bottom: 60, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.hoursStudied)! + 1])
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.examScore)! + 10])
      .range([innerHeight, 0])
      .nice();

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.select('.x-axis').remove();
    svg.select('.y-axis').remove();
    svg.select('.x-axis-label').remove();
    svg.select('.y-axis-label').remove();

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 4)
      .attr('text-anchor', 'middle')
      .text('Hours Studied')
      .style('font-weight', 'bold');

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('text-anchor', 'middle')
      .text('Exam Score')
      .style('font-weight', 'bold');

    svg.selectAll('circle').remove(); // Clear existing circles

    const circles = g.selectAll('circle').data(data);

    circles
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.hoursStudied) + margin.left)
      .attr('cy', d => yScale(d.examScore) + margin.top)
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseover', function (event, d) {
        const [x, y] = d3.pointer(event);
        setTooltipPosition({ x, y });
        setTooltipData(d);
      })
      .on('mouseout', function () {
        setTooltipData(null);
      });

    // Remove any existing labels
    svg.selectAll('.label').remove();
  }, [data, height, width]);

  const handleRefresh = () => {
    // Generate new random data
    const newData: DataPoint[] = Array.from({ length: 100 }, () => ({
        hoursStudied: Math.floor(Math.random() * 100) + 1,
        examScore: Math.floor(Math.random() * 100) + 1,
    }));

    // Update the state with new data
    setData(newData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px', padding: '20px', marginBottom: '20px', position: 'relative' }}>
        <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }}>
          <g ref={gRef} />
          <text x={width / 2} y={20} textAnchor="middle" style={{ fontWeight: 'bold' }}>
            Scatter Plot Chart
          </text>
          {tooltipData && (
            <foreignObject x={tooltipPosition.x + 10} y={tooltipPosition.y - 50} width="180" height="90">
              <div style={{ backgroundColor: 'white', border: '1px solid black', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div><strong>Hours Studied:</strong> {tooltipData.hoursStudied}</div>
                <div><strong>Exam Score:</strong> {tooltipData.examScore}</div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>
      <button onClick={handleRefresh} style={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '15px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer', borderRadius: '8px' }}>Refresh</button>
    </div>
  );
};

export default ScatterPlotChart;
