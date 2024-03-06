import { mockAssets, mockPortfolio, mockPrices } from "../mockData";

export const fetchAssets = () => {
  return Promise.resolve({ data: mockAssets });
};

export const fetchPrices = (assets: string[], asOf?: string) => {
  // Filter mock prices based on provided assets
  const filteredPrices = mockPrices.filter((price) =>
    assets.includes(price.asset)
  );
  return Promise.resolve({ data: filteredPrices });
};

export const fetchPortfolios = (asOf?: string) => {
  return Promise.resolve({ data: mockPortfolio });
};
