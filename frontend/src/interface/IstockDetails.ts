export interface IstockItem {
  stockName: string;
  imageUrl: string;
  interested: boolean;
  industryClass: string | null;
  wics: string;
  outline: string;
  currentPrice: number;
  max52: number;
  min52: number;
  totalPrice: string;
  totalStock: number;
  minCandle: IchartDataItem[];
  dayCandle: IchartDataItem[];
  weekCandle: IchartDataItem[];
  per: string;
  pbr: string;
  priceDifference: number;
  rateDifference: number;
}

export interface IchartDataItem {
  time: string;
  price: string;
  amount: string;
}
