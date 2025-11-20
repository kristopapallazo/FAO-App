import type { FC } from "react";
// import { useApp } from "../hooks/useAppCtx";
import classes from "./DashboardPage.module.css";
import DashboardTopSection from "../components/sections/DashboardSection/DashboardTopSection/DashboardTopSection";
import InfoPanelCardSection from "../components/sections/DashboardSection/InfoPanelCardSection/InfoPanelCardSection";
import LatestEventsSection from "../components/sections/DashboardSection/LatestEventsSection/LatestEventsSection";
import AgenciesSummary from "../components/sections/DashboardSection/AgenciesSummary/AgenciesSummary";
import "../components/sections/DashboardSection/DashboardSecton.css";
import BottomChartSection from "../components/sections/DashboardSection/BottomChartSection/BottomChartSection";

const DashboardPage: FC = () => {
  // const appCtx = useApp();
  // const isMobile = appCtx?.isMobile;

  // if (!appCtx) return <div>Error occured</div>;

  // if (!isMobile) return <div>Dashboard Page - Not a laptop device</div>;

  return (
    <div className={classes.dashboard_page}>
      <DashboardTopSection />
      <InfoPanelCardSection />
      <LatestEventsSection />
      <AgenciesSummary />
      <BottomChartSection />
    </div>
  );
};

export default DashboardPage;
