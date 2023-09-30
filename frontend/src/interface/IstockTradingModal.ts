import { MuiTheme } from "../types/muiTheme";

export interface IstockThemeContent {
  title: string;
  color: MuiTheme;
  textColor: string;
}

export interface IstockTheme {
  buy: IstockThemeContent;
  sell: IstockThemeContent;
}

export interface IstockTradingInfo {
  accessToken: string;
  stockName: string;
  stockId: string;
  currentPrice: number;
  availableQuantity: number;
}

export interface Itheme {
  title: string;
  color: MuiTheme;
  textColor: string;
}

export interface IstockOrderModal {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stockTradingInfo: IstockTradingInfo;
  theme: Itheme;
}

export interface IpercentageButton {
  value: number;
  onClick: (value: number) => void;
}
