import CircularProgress from "@mui/joy/CircularProgress";

/** 로딩중 화면 */
const CustomCircularProgress: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center opacity-25">
      <CircularProgress variant="plain" color="neutral" size="lg" />
    </div>
  );
};

export default CustomCircularProgress;
