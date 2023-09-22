import React from "react";

import CustomModal from "../../../common/modal/CustomModal";

import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";

interface IsellModal {
  sellModalOpen: boolean;
  setSellModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellModal: React.FC<IsellModal> = ({
  sellModalOpen: sellModalopen,
  setSellModalOpen,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <CustomModal open={sellModalopen} setOpen={setSellModalOpen}>
      <div className="h-full flex flex-col items-center justify-between">
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          <Typography level="title-lg" color="primary" children="매도" />
          <Typography level="title-lg" color="neutral" children="주문" />
        </Box>
        <div className="w-full">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-bold">주문수량</p>
              <div className="flex gap-1">
                <p className="text-sm text-neutral-400 font-bold">주문가능</p>
                <p className="text-sm text-blue-700 font-bold">126</p>
                <p className="text-sm text-neutral-400 font-bold">주</p>
              </div>
            </div>
            <Input
              type="number"
              endDecorator={"주"}
              defaultValue={1}
              slotProps={{
                input: {
                  ref: inputRef,
                  min: 1,
                  max: 126,
                },
              }}
            />
            <div className="flex justify-between">
              <Button className="w-[70px]" variant="soft" color="neutral">
                10%
              </Button>
              <Button className="w-[70px]" variant="soft" color="neutral">
                25%
              </Button>
              <Button className="w-[70px]" variant="soft" color="neutral">
                50%
              </Button>
              <Button className="w-[70px]" variant="soft" color="neutral">
                100%
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-bold">주문단가</p>
              <div className="flex items-center">
                <p className="text-lg text-black font-semibold mr-1">79,100</p>
                <p className="text-sm text-neutral-400 font-bold">원</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-bold">총 주문금액</p>
              <div className="flex items-center">
                <p className="text-lg text-black font-semibold mr-1">
                  1,977,500
                </p>
                <p className="text-sm text-neutral-400 font-bold">원</p>
              </div>
            </div>
          </div>
        </div>
        <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
          <Button
            onClick={() => setSellModalOpen(false)}
            color="primary"
            variant="soft"
            size="md"
            className="w-36"
          >
            취소
          </Button>
          <Button
            onClick={() => setSellModalOpen(false)}
            color="primary"
            variant="solid"
            size="md"
            className="w-36"
          >
            매도(Enter)
          </Button>
        </Box>
      </div>
    </CustomModal>
  );
};

export default SellModal;
