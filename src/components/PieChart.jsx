import React from "react";
import "./PieChart.css";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = ({ show, handleClose, inputValues }) => {
  // Initialize counters for available and not available values
  let availableCount = 0;
  let notAvailableCount = 0;

  // Iterate through each sub-indicator and count the values
  inputValues.forEach(subInd => {
    ['best', 'worst', 'current'].forEach(key => {
        if (subInd[key] !== null && subInd[key] !== "" ) {
            availableCount++;
        } else {
            notAvailableCount++;
        }
    });
  });

  // Calculate total values
  const totalCount = availableCount + notAvailableCount;

  // Calculate percentages
  const availablePercentage = (availableCount / totalCount) * 100;
  const notAvailablePercentage = (notAvailableCount / totalCount) * 100;

  const data = {
      labels: ["Not Available","Available"],
      datasets: [
        {
          data: [ notAvailablePercentage,availablePercentage],
          backgroundColor: [
            'rgba(255, 159, 64, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
          hoverOffset: 1
        },
      ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return ` ${Math.round(tooltipItem.raw)}%`;
            // return ` ${tooltipItem.raw.toFixed(2)}%`;
          }
        }
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="pieModal">
      <div className="pieModal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
          Sub-Indicator Values
        </div>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
