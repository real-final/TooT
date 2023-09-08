import { ReactNode } from "react";

const StockCard = () => {
  return (
    <div className="w-[184px] h-fit pr-2">
      <Card>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-xs text-slate-500 mr-2">001230</p>
              <p className="text-xs text-slate-500">코스피200</p>
            </div>
            <div>
              <div className="text-red-600">❤</div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium">삼성전자</h2>
          </div>
          <div className="flex items-center">
            <p className="text-base mr-2 text-red-500">100,000</p>
            <p className="text-xs text-center text-red-500">▲200(+0.30%)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockCard;

interface BAaProps {
  children: ReactNode;
  className?: string;
}

const Card = (props: BAaProps) => {
  const { children, className } = props;
  const combinedClassName =
    "w-44 h-17 p-2 bg-white border border-solid rounded-lg border-neutral-300 " +
    (className || "");
  return <div className={combinedClassName}>{children}</div>;
};

const CardContent = (props: BAaProps) => {
  const { children } = props;
  return <div className="h-full flex flex-col justify-between">{children}</div>;
};
