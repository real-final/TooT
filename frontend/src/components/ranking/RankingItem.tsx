import Avatar from "@mui/joy/Avatar";

const RankingItem = ({
  size,
  user,
  index,
}: {
  user: {
    id?: string;
    name: string;
    profileImage: string;
    favorite: boolean;
    bankruptcyNo: number;
    netProfit: number;
  };
  index: number;
  size: string;
}) => {
  return (
    <tr className="w-full">
      <td
        align="center"
        className={`${
          size === "small" ? "text-[24px]" : "text-[52px]"
        } align-middle ${index === 0 ? "text-first " : " "}${
          index === 1 ? "text-second " : " "
        }${index === 2 ? "text-third " : " "}`}
      >
        {index + 1}
      </td>
      <td align="center" className="align-middle">
        <Avatar
          src={user.profileImage}
          sx={{
            "--Avatar-size": "55px",
          }}
        />
      </td>
      <td
        align="center"
        className={`${
          size === "small" ? "text-[16px]" : "text-[28px]"
        } align-middle`}
      >
        {user.name}
      </td>
      <td
        align="right"
        className={`${
          size === "small" ? "text-[16px]" : "text-[28px]"
        } align-middle ${
          user.netProfit > 0 ? "text-stockRed" : "text-stockBlue"
        }`}
      >
        {user.netProfit.toLocaleString("ko-KR")}
        <span className="text-stockGray"> 원</span>
      </td>
      <td
        align="right"
        className={`${
          size === "small" ? "text-[12px]" : "text-[20px]"
        } align-middle text-stockGray`}
      >
        파산 {user.bankruptcyNo}회
      </td>
    </tr>
  );
};

export default RankingItem;
