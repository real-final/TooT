import React, { CSSProperties } from "react";
import { useParams } from "react-router-dom";

import Carousel from "../../common/carousel/Carousel";
import StockCard from "../../common/card/StockCard";
import CustomModal from "../../common/modal/CustomModal";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

/** 주식 상세정보 화면 */
const StockDetails: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  let items = Array(10).fill(<StockCard item={item} />);
  const [buyModalOpen, setBuyModalOpen] = React.useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = React.useState<boolean>(false);

  return (
    <div className="h-full">
      <div className="h-1/5 flex p-6 items-start bg-slate-200 rounded-t-lg">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <Title>관심 종목</Title> */}
          <div className="flex flex-grow">
            <Carousel items={items} />
          </div>
        </div>
      </div>
      <div className="h-4/5 flex flex-col px-6 pt-6">
        <p>종목코드: {stockId}</p>
        {/* 매수/매도 버튼 & 모달 */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <CustomButton
            onClick={() => setBuyModalOpen(true)}
            color="danger"
            variant="soft"
            className="w-24 h-2 mr-2"
            style={{ marginRight: "0.5rem" }}
          >
            매수
          </CustomButton>
          <CustomButton
            onClick={() => setSellModalOpen(true)}
            color="primary"
            variant="soft"
            className="w-24 h-4"
          >
            매도
          </CustomButton>
          <BuyModal
            buyModalOpen={buyModalOpen}
            setBuyModalOpen={setBuyModalOpen}
          />
          <SellModal
            sellModalOpen={sellModalOpen}
            setSellModalOpen={setSellModalOpen}
          />
        </Box>
      </div>
    </div>
  );
};

export default StockDetails;

let item = {
  id: "001230",
  name: "삼성전자",
  price: "100,000",
  difference: "200",
  percentage: "-0.80",
};

interface CustomModalProps {
  buyModalOpen: boolean;
  setBuyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SellModalProps {
  sellModalOpen: boolean;
  setSellModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuyModal: React.FC<CustomModalProps> = ({
  buyModalOpen: buyModalopen,
  setBuyModalOpen,
}) => {
  return (
    <CustomModal open={buyModalopen} setOpen={setBuyModalOpen}>
      <div className="h-full flex flex-col items-center justify-between border border-dotted border-red-300">
        <div className="flex">
          <Typography level="title-lg" color="danger" sx={{ mr: 1 }}>
            매수
          </Typography>
          <Typography level="title-lg" color="neutral">
            주문
          </Typography>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          fuga soluta voluptates sit mollitia, labore debitis cumque atque
          maxime explicabo vel, voluptas neque laudantium dolorum ipsum!
          Repellat veniam minus beatae.
        </div>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <CustomButton
            onClick={() => setBuyModalOpen(false)}
            color="danger"
            variant="soft"
            size="md"
            className="w-28"
          >
            취소
          </CustomButton>
          <CustomButton
            onClick={() => setBuyModalOpen(false)}
            color="danger"
            variant="solid"
            size="md"
            className="w-28"
          >
            매수(Enter)
          </CustomButton>
        </Box>
      </div>
    </CustomModal>
  );
};

const SellModal: React.FC<SellModalProps> = ({
  sellModalOpen: sellModalopen,
  setSellModalOpen,
}) => {
  return (
    <CustomModal open={sellModalopen} setOpen={setSellModalOpen}>
      <div>
        <div className="title"></div>
        <div className="body"></div>
        <div className="button"></div>
      </div>
    </CustomModal>
  );
};

interface CustomButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
  variant?: "plain" | "outlined" | "soft" | "solid";
  size?: "sm" | "md" | "lg";
  children: string;
  className?: string;
  style?: CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  color,
  variant,
  size,
  className,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
};
