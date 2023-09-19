import { ReactNode } from "react";

const Card: React.FC<ICardProps> = (props) => {
  const { children, className } = props;
  const combinedClassName =
    "w-44 h-20 p-2 bg-white border border-solid rounded-lg border-neutral-300 " +
    (className || "");
  return <div className={combinedClassName}>{children}</div>;
};

export default Card;

interface ICardProps {
  children: ReactNode;
  className?: string;
}
