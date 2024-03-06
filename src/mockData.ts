export const mockAssets = [
  { id: "3b164506-8d42-4a16-80f8-2ff4479c21c4", name: "AAPL", type: "stock" },
  { id: "4ff3163b-645b-4082-9d5d-98640f3144d7", name: "BTC", type: "crypto" },
  { id: "b955f6fe-acd1-4345-9c44-955684d921bf3", name: "USD", type: "fiat" },
  { id: "b24ae1a5-239e-4ce4-856a-5d5a7bd4b820", name: "MSFT", type: "stock" },
  { id: "b45f3cce-cfe3-42bf-b51b-e9e00148e159", name: "DODGE", type: "crypto" },
  { id: "a3861bf6-e496-45e6-afe4-385b0cf15fb3", name: "GBP", type: "fiat" },
];

export const mockPortfolio = {
  id: "201910db-7090-4d2c-9a06-e7279211b756",
  asOf: "2023-01-01T00:00:00Z",
  positions: [
    {
      id: 1,
      asset: "3b164506-8d42-4a16-80f8-2ff4479c21c4",
      quantity: 100,
      asOf: "2018-02-10T00:00:00Z",
      price: 150.25,
    },
    {
      id: 2,
      asset: "4ff3163b-645b-4082-9d5d-98640f3144d7",
      quantity: 5,
      asOf: "2018-11-01T00:00:00Z",
      price: 4500,
    },
    {
      id: 3,
      asset: "b955f6fe-acd1-4345-9c44-955684d921bf3",
      quantity: 10000,
      asOf: "2019-01-09T00:00:00Z",
      price: 1,
    },
    {
      id: 4,
      asset: "b24ae1a5-239e-4ce4-856a-5d5a7bd4b820",
      quantity: 15,
      asOf: "2019-01-21T00:00:00Z",
      price: 15.25,
    },
    {
      id: 8,
      asset: "b45f3cce-cfe3-42bf-b51b-e9e00148e159",
      quantity: 89,
      asOf: "2020-07-04T00:00:00Z",
      price: 450,
    },
    {
      id: 12,
      asset: "b955f6fe-acd1-4345-9c44-955684d921bf3",
      quantity: 1000,
      asOf: "2021-05-09T00:00:00Z",
      price: 1.3,
    },
    {
      id: 5,
      asset: "b45f3cce-cfe3-42bf-b51b-e9e00148e159",
      quantity: 50,
      asOf: "2022-02-04T00:00:00Z",
      price: 476,
    },

    {
      id: 6,
      asset: "a3861bf6-e496-45e6-afe4-385b0cf15fb3",
      quantity: 100,
      asOf: "2022-03-14T00:00:00Z",
      price: 1123,
    },
    {
      id: 7,
      asset: "b955f6fe-acd1-4345-9c44-955684d921bf3",
      quantity: 1000,
      asOf: "2022-05-04T00:00:00Z",
      price: 2,
    },
    {
      id: 8,
      asset: "b45f3cce-cfe3-42bf-b51b-e9e00148e159",
      quantity: 55,
      asOf: "2023-02-04T00:00:00Z",
      price: 512,
    },
    {
      id: 9,
      asset: "a3861bf6-e496-45e6-afe4-385b0cf15fb3",
      quantity: 10,
      asOf: "2023-05-19T00:00:00Z",
      price: 1300,
    },
    {
      id: 10,
      asset: "b24ae1a5-239e-4ce4-856a-5d5a7bd4b820",
      quantity: 10,
      asOf: "2023-12-21T00:00:00Z",
      price: 18.66,
    },
    {
      id: 11,
      asset: "3b164506-8d42-4a16-80f8-2ff4479c21c4",
      quantity: 88,
      asOf: "2024-01-10T00:00:00Z",
      price: 160.25,
    },
  ],
};

export const mockPrices = [
  { id: "1", asset: "AAPL", price: 150.25 },
  { id: "2", asset: "BTC", price: 45000 },
  { id: "3", asset: "USD", price: 1 },
];
