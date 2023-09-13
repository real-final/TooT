import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import getStockStyle from "../../utils/getStockStyle";
import React from "react";

function createData(
  ranking: number,
  name: string,
  price: string,
  percentage: string
) {
  return { ranking, name, price, percentage };
}

const rows = [
  createData(1, "삼성전자", "71,400", "0.54"),
  createData(2, "포스코DX", "53,600", "3.47"),
  createData(3, "뉴로메카", "47,000", "11.24"),
  createData(4, "하나마이크론", "29,950", "0.00"),
  createData(5, "에코프로", "1,117,000", "-5.26"),
];

const TradingRanking: React.FC = () => {
  return (
    <Table size="small" aria-label="a dense table">
      <TableBody>
        {rows.map((row) => {
          const { textColor, icon } = getStockStyle(row.percentage);
          return (
            <TableRow key={row.name}>
              <TableCell align="left">
                <span className="text-slate-500">{row.ranking}</span>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell>
                <p className={textColor + " flex items-center justify-end"}>
                  <span className="text-[10px]">{icon}</span>&nbsp;
                  {row.percentage}%
                </p>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TradingRanking;
