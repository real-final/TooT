import ReactApexChart from "react-apexcharts";

import { IstockItem } from "../../../interface/IstockDetails";
import { IchartDataItem } from "../../../interface/IstockDetails";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";

// import CustomCircularProgress from "../../../common/circularProgress/CustomCircularProgress";

const StockChart: React.FC<{ stockItem: IstockItem }> = ({ stockItem }) => {
  let minCandle = stockItem?.minCandle;

  console.log(minCandle);

  return (
    <Tabs
      aria-label="stock-chart"
      defaultValue={0}
      size="sm"
      sx={{ bgcolor: "transparent", height: "100%", marginRight: "12px" }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "xl",
          bgcolor: "background.level1",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
          flex: "flex",
          justifyContent: "right",
        }}
      >
        <Tab disableIndicator>
          <Typography level="title-sm">분</Typography>
        </Tab>
        <Tab disableIndicator>
          <Typography level="title-sm">일</Typography>
        </Tab>
        <Tab disableIndicator>
          <Typography level="title-sm">주</Typography>
        </Tab>
      </TabList>
      <TabPanel value={0} sx={{ padding: "0" }} className="no-scrollbar">
        <ApexChart data={minCandle} />
      </TabPanel>
      <TabPanel value={1} sx={{ padding: "0" }} className="no-scrollbar">
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2} sx={{ padding: "0" }} className="no-scrollbar">
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
};

export default StockChart;

const ApexChart: React.FC<{ data: IchartDataItem[] }> = ({ data }) => {
  const times = data.map((item) => item.time).reverse(); // TODO: 시간 parsing 해야함.
  const prices = data.map((item) => parseInt(item.price)).reverse();
  const amounts = data.map((item) => parseInt(item.amount)).reverse();

  const sharedChartOptions = {
    chart: {
      group: "stock-charts", // 동일한 그룹 이름으로 두 차트를 그룹화
      toolbar: {
        show: true, // 첫 번째 차트 (Line 그래프)의 도구 모듈 활성화
      },
    },
    xaxis: {
      categories: times,
    },
  };

  const priceOptions = {
    ...sharedChartOptions,
    chart: {
      ...sharedChartOptions.chart,
    },
    stroke: {
      curve: "smooth" as const, // 선을 부드럽게 곡선 형태로 연결
    },
    grid: {
      padding: {
        top: 0,
        bottom: -10,
      },
    },
    xaxis: {
      ...sharedChartOptions.xaxis,
      labels: {
        show: false, // x축 라벨 숨김
      },
      axisTicks: {
        show: false, // x축 눈금 숨김
      },
    },
  };

  const amountOptions = {
    ...sharedChartOptions,
    chart: {
      ...sharedChartOptions.chart,
      toolbar: {
        show: false, // 두 번째 차트 (Bar 그래프)의 도구 모듈 비활성화
      },
    },
    grid: {
      padding: {
        top: -20,
        bottom: 0,
      },
    },
    xaxis: {
      ...sharedChartOptions.xaxis,
    },
  };

  return (
    <div className="h-full">
      <ReactApexChart
        options={priceOptions}
        series={[{ name: "Price", data: prices }]}
        height="66%"
        type="line"
      />
      <ReactApexChart
        options={amountOptions}
        series={[{ name: "Amount", data: amounts }]}
        height="34%"
        type="bar"
      />
    </div>
  );
};
