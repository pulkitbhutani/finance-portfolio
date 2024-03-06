export interface IPosition {
  id: number;
  asset: string;
  quantity: number;
  asOf: string;
  price: number;
}

export interface IPortfolio {
  id: string;
  asOf: string;
  positions: IPosition[];
}

export interface IAsset {
  id: string;
  name: string;
  type: string;
}

export interface IDataMapper {
  [key: string]: number;
}
