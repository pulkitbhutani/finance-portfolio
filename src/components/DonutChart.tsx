import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchAssets, fetchPortfolios } from "../services/api";

import { IPortfolio, IAsset, IDataMapper } from "../models/finance.interface";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [portfolioData, setPortfolioData] = useState<IPortfolio | null>(null);
  const [portfolioAssets, setPortfolioAssets] = useState<string[]>([]);

  const [donutChartData, setDonutChartData] = useState<any>(null);

  useEffect(() => {
    fetchAssetsData();
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    calculateOnAssets();
  }, [assets, portfolioData]);

  const fetchAssetsData = async () => {
    try {
      const response = await fetchAssets();
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchPortfolioData = async () => {
    try {
      const response = await fetchPortfolios();
      setPortfolioData(response.data);
    } catch (error) {
      console.error("Error fetc hing portfolio data:", error);
    }
  };

  const calculateOnAssets = () => {
    const assetTotalMap: IDataMapper = {};
    const assetsInvested: string[] = [];

    portfolioData?.positions?.map((position) => {
      const { asset, quantity, price } = position;
      const assetInfo = assets.find((assetInfo) => assetInfo.id === asset);
      if (assetInfo) {
        const totalValue = quantity * price;
        if (assetTotalMap.hasOwnProperty(assetInfo.type)) {
          assetTotalMap[assetInfo.type] += totalValue;
        } else {
          assetTotalMap[assetInfo.type] = totalValue;
          assetsInvested.push(assetInfo.type);
        }
      }
    });

    setPortfolioAssets(assetsInvested);
    const donutChartData = createChartData(assetTotalMap, "Asset Total");
    setDonutChartData(donutChartData);
  };

  const calculateOnAssetType = (assetType: string): void => {
    const positions = portfolioData?.positions.filter((position) => {
      const assetInfo = assets.find((asset) => asset.id === position.asset);
      return assetInfo && assetInfo.type === assetType;
    });

    const assetInvestmentMapping: IDataMapper = {};

    positions?.forEach((position) => {
      const { asset, quantity, price } = position;
      const assetInfo = assets?.find((asset) => asset.id === position.asset);
      const totalInvestment = quantity * price;
      if (assetInfo) {
        if (assetInvestmentMapping.hasOwnProperty(assetInfo.name)) {
          assetInvestmentMapping[assetInfo.name] += totalInvestment;
        } else {
          assetInvestmentMapping[assetInfo.name] = totalInvestment;
        }
      }
    });

    const donutChartData = createChartData(assetInvestmentMapping, "Total");
    setDonutChartData(donutChartData);
  };

  const createChartData = (donutDataMap: IDataMapper, label?: string) => {
    const labels: string[] = [];
    const data: number[] = [];

    Object.entries(donutDataMap).forEach(([type, totalAmount]) => {
      labels.push(type);
      data.push(totalAmount);
    });

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return chartData;
  };

  return (
    <div className="flex flex-col items-center">
      <div>{donutChartData && <Doughnut data={donutChartData} />}</div>
      <div className="inline-flex rounded-md p-6 justify-center" role="group">
        <button
          type="button"
          onClick={() => calculateOnAssets()}
          className="px-4 py-2 text-sm font-medium text-white bg-[#0081FB] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-white"
        >
          All
        </button>

        {portfolioAssets.map((asset, index) => (
          <button
            key={index}
            type="button"
            onClick={() => calculateOnAssetType(asset)}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0081FB] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-white"
          >
            {asset[0].toUpperCase() + asset.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
