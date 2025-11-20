import { DUMMY_SUMMARY_DATA } from "../../../../data";
import {
  DotsIcon,
  TablerCirclesIcon,
  TablerUserCheckIcon,
  TickSquareIcon,
} from "../../../../icons";
import MainCard from "../../../ui/Cards/MainCard/MainCard";
import classes from "./AgenciesSummary.module.css";
// import AgencieSummaryCard from "./AgencieSummaryCard";
// import AgencieSummaryCard from "./AgencieSummaryCard.";
import AgencieSummaryCard from "./AgencieSummaryCard.tsx";
import type { ReactNode } from "react";

const getIcon = (id: number): ReactNode => {
  switch (id) {
    case 1:
      return <TablerCirclesIcon />;
    case 2:
      return <TablerUserCheckIcon />;
    case 3:
      return <TickSquareIcon />;
    default:
      return <TablerCirclesIcon />;
  }
};

const AgenciesSummary = () => {
  const onClickDotIcon = () => {
    alert("Open popover with more options");
  };

  const cards = DUMMY_SUMMARY_DATA.map((data) => {
    const icon = getIcon(data.id);
    return <AgencieSummaryCard key={data.id} card={data} icon={icon} />;
  });

  // return null;
  return (
    <MainCard className={classes.wrapper}>
      <div className={classes.top_section}>
        <span className="section_header_title">Agencies Summary</span>
        <span onClick={onClickDotIcon}>
          <DotsIcon />
        </span>
      </div>

      <div className={classes.summary_card_grid}>{cards}</div>

      <div className={classes.bottom_section}>
        <div className={classes.left}>
          <span className={classes.top_label}>On-time Completion Rate</span>
          <span className={classes.percentage_wrapper}>
            <span className={classes.percentage_value}>95%</span>
            <span className={classes.percetage_change}>+2,5%</span>
          </span>
        </div>
        <div className={classes.right}>test</div>
      </div>
    </MainCard>
  );
};

export default AgenciesSummary;
