import React from "react";
import { useNavigate } from "react-router-dom";
import { getStockStyle } from "../../utils/getStockStyle";

function createData(
  ranking: string,
  id: string,
  name: string,
  price: string,
  percentage: string
) {
  return { ranking, id, name, price, percentage };
}

const rows = [
  createData("1", "030435", "삼성전자", "71,400", "0.54"),
  createData("2", "030425", "포스코DX", "53,600", "3.47"),
  createData("3", "030415", "뉴로메카", "47,000", "11.24"),
  createData("4", "030445", "하나마이크론", "29,950", "0.00"),
  createData("5", "030425", "에코프로", "1,117,000", "-5.26"),
];

const TopStocks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <table className="w-full h-full overflow-hidden">
      <tbody>
        {rows.map((row) => {
          const { textColor, icon } = getStockStyle(row.percentage);
          const handleTableRowClick = () => navigate(`/stock/${row.id}`);
          return (
            <tr
              key={row.name}
              onClick={handleTableRowClick}
              className="hover:cursor-pointer"
            >
              <td align="left" className="w-1/12">
                <span className="text-slate-500">{row.ranking}</span>
              </td>
              <td align="left" className="w-4/12">
                {row.name}
              </td>
              <td align="right" className="w-4/12">
                {row.price}
              </td>
              <td className="w-3/12">
                <p className={textColor + " flex items-center justify-end"}>
                  <span className="text-[10px]">{icon}</span>&nbsp;
                  {row.percentage}%
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TopStocks;
