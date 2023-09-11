import { ReactNode } from "react";

const Card = (props: BAaProps) => {
  const { children, className } = props;
  const combinedClassName =
    "w-44 h-17 p-2 bg-white border border-solid rounded-lg border-neutral-300 " +
    (className || "");
  return <div className={combinedClassName}>{children}</div>;
};

export default Card;

interface BAaProps {
  children: ReactNode;
  className?: string;
}
