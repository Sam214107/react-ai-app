import React, { useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartRenderer = ({ chartId, type, labels, data, title }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, labels, data, title]);

  return <canvas id={chartId} ref={chartRef} width="500" height="300" />;


};

export default ChartRenderer;
