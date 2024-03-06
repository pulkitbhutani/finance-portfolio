import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IPortfolio, IPosition } from "../models/finance.interface";
import { fetchPortfolios } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HistoricalChart() {
  const timePeriods = ["1Y", "2Y", "3Y", "4Y", "Full"];
  const [timePeriod, setTimePeriod] = useState("Full");
  const [portfolioData, setPortfolioData] = useState<IPortfolio | null>(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetchPortfolios();
      setPortfolioData(response.data);
    } catch (error) {
      console.error("Error fetc hing portfolio data:", error);
    }
  };

  const calculateCumulativePortfolioValue = () => {
    const cumulativeValues: number[] = [];
    let cumulativeValue = 0;

    portfolioData?.positions.forEach((position: IPosition) => {
      const positionValue = position.quantity * position.price;
      cumulativeValue += positionValue;
      cumulativeValues.push(cumulativeValue);
    });

    return cumulativeValues;
  };

  const filterData = () => {
    if (timePeriod === "Full") {
      return portfolioData?.positions;
    }

    const currentDate = new Date();
    const filteredPositions = portfolioData?.positions.filter(
      (position: IPosition) => {
        const positionDate = new Date(position.asOf);
        const yearsDiff =
          currentDate.getFullYear() - positionDate.getFullYear();
        return yearsDiff <= parseInt(timePeriod);
      }
    );

    return filteredPositions;
  };

  const chartData = {
    labels: filterData()?.map((position: IPosition) =>
      new Date(position.asOf).toDateString()
    ),
    datasets: [
      {
        label: "Portfolio Value",
        data: calculateCumulativePortfolioValue(),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">{chartData && <Line data={chartData} />}</div>
      <div className="flex align-center">
        {timePeriods.map((period, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTimePeriodChange(period)}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0081FB] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-white"
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HistoricalChart;
