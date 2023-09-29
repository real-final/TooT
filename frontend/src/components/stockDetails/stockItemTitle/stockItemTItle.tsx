import React from "react";

import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";

import { IstockItem } from "../../../interface/IstockDetails";

/** 회사 이름, 로고, 코드 */
export const ItemTitle: React.FC<{
  stockId?: string;
  stockItem: IstockItem;
}> = ({ stockId, stockItem }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar alt="회사로고" src={stockItem.imageUrl} size="sm" />
      <h2 className="text-2xl mx-1">{stockItem?.stockName}</h2>
      <p className="text-md text-gray-400">코스피32 {stockId}</p>
    </div>
  );
};

/** 매수 버튼 */
export const BuyButton = (props: { onClick?: () => void }) => {
  return (
    <Button
      className="h-6"
      color="danger"
      variant="soft"
      onClick={props.onClick}
    >
      매수
    </Button>
  );
};

/** 매도 버튼 */
export const SellButton = (props: { onClick?: () => void }) => {
  return (
    <Button
      className="h-6"
      color="primary"
      variant="soft"
      onClick={props.onClick}
    >
      매도
    </Button>
  );
};
