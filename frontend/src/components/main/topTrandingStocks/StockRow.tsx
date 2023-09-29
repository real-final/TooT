import { getStockStyle } from "../../../utils/getStockStyle";

type RowType = {
  rank: number;
  stockId: string;
  stockName: string;
  price: number;
  rateDifference: string;
};

type RowsType = {
  row: RowType;
  onClick: () => void;
};

/** 거래량 순위 요소 */
const StockRow: React.FC<RowsType> = ({ row, onClick }) => {
  const { textColor, icon } = getStockStyle(row.rateDifference);
  return (
    <tr
      key={row.stockName}
      onClick={onClick}
      className="hover:cursor-pointer hover:bg-slate-100"
    >
      <td align="left" className="w-1/12 align-middle">
        <span className="text-slate-500">{row.rank}</span>
      </td>
      <td align="left" className="w-3/12 align-middle">
        {row.stockName}
      </td>
      <td align="right" className={textColor + " w-4/12 align-middle"}>
        {row.price.toLocaleString()}
      </td>
      <td align="right" className="w-4/12 align-middle">
        <p className={textColor + " items-center justify-end"}>
          <span className="text-[10px]">{icon}</span>&nbsp;
          {row.rateDifference}%
        </p>
      </td>
    </tr>
  );
};

export default StockRow;
