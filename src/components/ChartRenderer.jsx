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

    const backgroundColors = data.map(() =>
      `rgba(${Math.floor(Math.random() * 255)}, 
            ${Math.floor(Math.random() * 255)}, 
            ${Math.floor(Math.random() * 255)}, 0.6)`
    );

    const borderColors = backgroundColors.map(color => color.replace('0.6', '1'));

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14, 
              },
            },
          },
          tooltip: {
            bodyFont: {
              size: 12, 
            },
            titleFont: {
              size: 14, 
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 8, 
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 12, 
              },
            },
          },
        },
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
