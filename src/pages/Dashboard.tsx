import React, { useState, useEffect } from "react";
import DonutChart from "../components/DonutChart";
import HistoricalChart from "../components/HistoricalChart";
import { IPortfolio } from "../models/finance.interface";
import { fetchPortfolios } from "../services/api";

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState<IPortfolio | null>(null);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    calculateTotalPortfolioValue();
  }, [portfolioData]);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetchPortfolios();
      setPortfolioData(response.data);
    } catch (error) {
      console.error("Error fetc hing portfolio data:", error);
    }
  };

  const calculateTotalPortfolioValue = () => {
    let portfolioValue = 0;
    portfolioData?.positions.map((position) => {
      portfolioValue += position.price * position.quantity;
    });

    setTotalPortfolioValue(portfolioValue);
  };

  return (
    <div className="flex flex-col py-12 px-14">
      <h2 className="text-5xl">Dashboard</h2>
      <div className="flex justify-between">
        <div className="flex flex-col justify-evenly w-2/5">
          <div className=" border border-gray-500 flex flex-col rounded justify-center p-4 text-gray-600">
            <span className="text-gray-900">Pulkit Bhutani</span>
            <span>Your Total Wealth : {totalPortfolioValue} USD</span>
          </div>
          <div className=" border border-gray-500 flex flex-col rounded justify-center p-4 mt-5 text-gray-600">
            <span className="text-gray-900">Todays Profit</span>
            <span>Your Made : 200 USD</span>
          </div>
        </div>
        <div className="w-3/5 flex flex-col align-center ml-6">
          <DonutChart />
        </div>
      </div>
      <div className="flex space-x-8 py-6">
        <div className="flex flex-col rounded-md border w-full p-8 justify-center">
          <HistoricalChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
