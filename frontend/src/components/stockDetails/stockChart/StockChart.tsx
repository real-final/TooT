import ReactApexChart from "react-apexcharts";

import { IstockItem } from "../../../interface/IstockDetails";
import { IchartDataItem } from "../../../interface/IstockDetails";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";

const StockChart: React.FC<{ stockItem: IstockItem }> = ({ stockItem }) => {
  let minCandle = stockItem?.minCandle;
  return (
    <Tabs
      aria-label="stock-chart"
      defaultValue={0}
      size="sm"
      sx={{
        bgcolor: "transparent",
        height: "100%",
        marginRight: "12px",
        gap: 1,
      }}
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
        <ApexChart title="min" data={minCandle} />
      </TabPanel>
      <TabPanel value={1} sx={{ padding: "0" }} className="no-scrollbar">
        <ApexChart title="day" data={minCandle} />
      </TabPanel>
      <TabPanel value={2} sx={{ padding: "0" }} className="no-scrollbar">
        <ApexChart title="week" data={minCandle} />
      </TabPanel>
    </Tabs>
  );
};

export default StockChart;

/** 분봉의 시간 문자열을 파싱하는 함수 */
const parseMinTime = (timeStr: string) => {
  const hour = timeStr.substring(0, 2);
  const minute = timeStr.substring(2, 4);
  return `${parseInt(hour, 10)}시 ${parseInt(minute, 10)}분`;
};

/** 주식 차트 UI */
const ApexChart: React.FC<{ title: string; data: IchartDataItem[] }> = ({
  title,
  data,
}) => {
  let times = null;
  if (title === "min") {
    times = data.map((item) => parseMinTime(item.time)).reverse();
  } else {
    times = data.map((item) => item.time).reverse();
  }
  const prices = data.map((item) => parseInt(item.price)).reverse();
  const amounts = data.map((item) => parseInt(item.amount)).reverse();

  const sharedChartOptions = {
    chart: {
      group: "stock-charts", // 동일한 그룹 이름으로 두 차트를 그룹화
      toolbar: {
        show: true, // Line 그래프의 도구 모듈 활성화
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
        bottom: -25,
      },
    },
    xaxis: {
      ...sharedChartOptions.xaxis,
      labels: {
        show: false, // Line 그래프의 x축 라벨 숨김
      },
      axisTicks: {
        show: false, // Line 그래프의 x축 눈금 숨김
      },
    },
  };

  const amountOptions = {
    ...sharedChartOptions,
    chart: {
      ...sharedChartOptions.chart,
      toolbar: {
        show: false, // Bar 그래프의 도구 모듈 비활성화
      },
    },
    grid: {
      padding: {
        top: -20,
        bottom: -5,
      },
    },
    dataLabels: {
      enabled: true, // 거래량 데이터 값 보여줌
    },
    xaxis: {
      ...sharedChartOptions.xaxis,
      labels: {
        show: true,
        hideOverlappingLabels: true,
        trim: false,
        formatter: function (val: string) {
          const min = parseInt(val.split("시")[1], 10);
          return !(min % 10) ? val : "";
        },
      },
      axisTicks: {
        show: true, // x축 눈금 보여줌
      },
    },
  };

  return (
    <div className="h-full">
      <ReactApexChart
        options={priceOptions}
        series={[{ name: "시가", data: prices }]}
        height="66%"
        type="line"
      />
      <ReactApexChart
        options={amountOptions}
        series={[{ name: "거래량", data: amounts }]}
        height="34%"
        type="bar"
      />
    </div>
  );
};
