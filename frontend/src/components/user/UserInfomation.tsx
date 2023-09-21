const UserInfomation: React.FC = () => {
  let 프로필사진: string = "";
  let 이름: string = "잠자는 커비";
  let 평가액: string = "734,500";
  let 시드머니: string = "340,000";
  let 총자산: string = "1,047,500";

  return (
    <div className="h-full overflow-hidden">
      <div className="h-1/3 w-full rounded-t-lg bg-point flex justify-center items-center">
        <div
          className="w-12 h-12 bg-slate-300 mr-4 rounded-full"
          style={{ backgroundImage: `url(${프로필사진})` }}
        />
        <p className="text-lg font-semibold">{이름}</p>
      </div>
      <div className="h-2/3 w-full rounded-b-lg bg-white px-12 py-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between mb-1">
            <p className="text-slate-500">평가액</p>
            <p>
              <span className="text-black text-lg">{평가액}</span>
              <span>원</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-500">시드머니</p>
            <p>
              <span className="text-black text-lg">{시드머니}</span>

              <span>원</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg font-semibold text-slate-500">총자산</p>
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
