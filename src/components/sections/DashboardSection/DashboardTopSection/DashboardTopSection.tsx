import { CalendarIcon } from "../../../../icons";
import { PrimaryBttn } from "../../../ui/button";
import classes from "./DashboardTopSection.module.css";

const DashboardTopSection = () => {
  return (
    <div className={classes.top_section}>
      <h3 className={classes.title}>Dashboard</h3>
      <span className={classes.right_section}>
        <span className={classes.calendar_icon_wrapper}>
          <CalendarIcon />
        </span>
        <PrimaryBttn label="Create Entry" width={114} />
      </span>
    </div>
  );
};

export default DashboardTopSection;
