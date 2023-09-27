import { ReactNode } from "react";
interface Icard {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<Icard> = (props) => {
  const { children, className } = props;
  const combinedClassName =
    "w-48 h-[88px] p-2 bg-white border border-solid rounded-lg border-neutral-300 " +
    (className || "");
  return <div className={combinedClassName}>{children}</div>;
};

export default Card;
