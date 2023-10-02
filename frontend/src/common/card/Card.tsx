import { ReactNode } from "react";

interface Icard {
  children: ReactNode;
  className?: string;
  size?: string;
}

const Card: React.FC<Icard> = (props) => {
  const { children, className, size } = props;
  const width = (size === "big") ? "w-[300px] " : "w-[100px] ";
  const heigth = (size === "big") ? "h-[130px] " : "h-[100px] ";
  const combinedClassName =
    `${width} ${heigth} p-2 bg-white border border-solid rounded-lg border-neutral-300 ` +
    (className || "");
  return <div className={combinedClassName}>{children}</div>;
};

export default Card;
