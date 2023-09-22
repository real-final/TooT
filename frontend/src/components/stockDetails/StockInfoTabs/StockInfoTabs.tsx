import ItemFinancialDetails from "./ItemFinancialDetails";
import ItemSummary from "./ItemSummary";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Avatar from "@mui/joy/Avatar";

/** 상세조회 페이지 종목요약 & 재무정보 */
const StockInfoTabs: React.FC = () => {
  return (
    <Tabs
      variant="outlined"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={{
        borderRadius: "lg",
        boxShadow: "sm",
        overflow: "auto",
        height: "100%",
      }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: "sm",
            fontWeight: "lg",
            [`&[aria-selected="true"]`]: {
              color: "primary.500",
              bgcolor: "background.surface",
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: "-4px",
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          종목요약
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          재무정보
        </Tab>
      </TabList>
      <TabPanel value={0} sx={{ overflowY: "auto" }} className="no-scrollbar">
        {/* 종목요약 */}
        <ItemSummary />
      </TabPanel>
      <TabPanel value={1}>
        {/* 재무정보 */}
        <ItemFinancialDetails />
      </TabPanel>
    </Tabs>
  );
};

export default StockInfoTabs;

/** 종목 타이틀 */
export const ItemOverviewHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Avatar
          alt="회사로고"
          src={
            "https://images.samsung.com/kdp/aboutsamsung/brand_identity/logo/256_144_3.png?$512_288_PNG$"
          }
          size="sm"
        />
        <div>
          <h2 className="text-md font-bold">삼성전자</h2>
          <p className="text-xs text-gray-500">코스피 001230</p>
        </div>
      </div>
      <hr />
    </>
  );
};
