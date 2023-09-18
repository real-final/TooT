import * as React from "react";
import { ReactNode } from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  setOpen,
  children,
}) => {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sheet
          variant="plain"
          sx={{
            width: 360,
            height: 330,
            borderRadius: "md",
            p: 3,
          }}
        >
          {children}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default CustomModal;
