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
  minCandle: IstockChart | null;
  dayCandle: IstockChart | null;
  weekCandle: IstockChart | null;
}

export interface IstockChart {
  time: string;
  price: string;
  amount: string;
}
