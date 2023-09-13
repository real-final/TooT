const UserInfomation: React.FC = () => {
  let 프로필사진: string = "";
  let 이름: string = "잠자는 커비";
  let 평가금: string = "734,500";
  let 시드머니: string = "340,000";
  let 총자산: string = "1,047,500";

  return (
    <div className="h-full">
      <div className="h-1/4 w-full rounded-t-lg bg-point flex justify-center items-center">
        <img src={프로필사진} alt="" />
        <p className="text-md font-semibold">{이름}</p>
      </div>
      <div className="h-3/4 w-full rounded-b-lg bg-white px-8 py-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <p className="text-slate-500">평가금</p>
            <p>
              <span className="text-black">{평가금}</span>
              <span>원</span>
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">시드머니</p>
            <p>
              <span className="text-black">{시드머니}</span>
              <span>원</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-md font-semibold text-slate-500 mb-1">총자산</p>
          <p className="text-2xl font-regualr">
            <span className="text-black">{총자산}</span>
            <span>원</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfomation;
