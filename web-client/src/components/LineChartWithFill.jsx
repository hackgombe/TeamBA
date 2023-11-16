import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const LineChartWithFill = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createOrUpdateLineChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(chartCanvas.current, {
        type: "line",
        data: {
          ...data,
          datasets: data.datasets.map((dataset) => ({
            ...dataset,
            fill: true, // Enable fill
            backgroundColor: "rgba(75,192,192,0.4)", // Fill color
            // Other dataset options...
          })),
        },
        // Other chart configuration options...
      });
    };

    createOrUpdateLineChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  const chartCanvas = useRef(null);

  return <canvas ref={chartCanvas} />;
};

export default LineChartWithFill;
