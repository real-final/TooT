import Avatar from "@mui/joy/Avatar";

type UserType = {
  name: string;
  profileImage: string;
  netProfit: number;
  bankruptcyNo: number;
};

interface ItotalRankingItem {
  user: UserType;
  index: number;
}

const TotalRankingItem: React.FC<ItotalRankingItem> = ({ user, index }) => {
  let textColor = "text-black ";

  if (0 <= index && index < 3) {
    textColor = ["text-first ", "text-second ", "text-third "][index];
  }

  return (
    <tr className="w-full">
      <td align="left" className={textColor + "align-middle"}>
        {index + 1}
      </td>
      <td align="center" className="align-middle">
        <Avatar src={user.profileImage} size="md" />
      </td>
      <td align="center" className="align-middle">
        {user.name}
      </td>
      <td
        align="right"
        className={`align-middle ${
          user.netProfit > 0 ? "text-stockRed" : "text-stockBlue"
        }`}
      >
        {user.netProfit.toLocaleString()}
        <span className="text-stockGray">원</span>
      </td>
      <td align="right" className="align-middle text-stockGray">
        파산 {user.bankruptcyNo}회
      </td>
    </tr>
  );
};

export default TotalRankingItem;
