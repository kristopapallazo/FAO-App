import clsx from "clsx";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  FilterIcon,
  SortAscendingIcon,
} from "../../../../icons";
import { PrimaryBttn } from "../../button";
import Checkbox from "../../form/checkbox/Checkbox";
import classes from "./DynamicTable.module.css";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
  className?: string;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  height?: string | number;
  width?: string | number;
}

const DynamicTable = <T,>(props: DynamicTableProps<T>) => {
  console.log("props :>> ", props);
  const { /* columns, data, */ height = "100%", width = "100%" } = props;

  return (
    <div className={classes.wrapper} style={{ width, height }}>
      {/* Header */}
      <div className={classes.panel}>
        <span className={classes.pannel_inner}>
          <Checkbox label="Select All" checked />
          <PrimaryBttn
            label="Sort: Location"
            variant="secondary" /* width={100} */
            icon={<SortAscendingIcon />}
          />
        </span>

        <span
          className={classes.pannel_inner}
          style={{
            margin: "0 12px",
          }}
        >
          <PrimaryBttn label="Add Member" width={100} />
          <PrimaryBttn label="Export" variant="secondary" width={83} />
          <PrimaryBttn
            variant="ghost"
            icon={<FilterIcon />}
            width={33}
            // height={33}
          />
        </span>
      </div>
      <table className={classes.table}></table>
      {/* Footer */}
      <div className={classes.panel}>
        <span className={classes.pannel_inner}>
          <span className={classes.pagination_label}>1 - 30 of 140</span>
          <span className={classes.pagination_controls}>
            <PrimaryBttn
              variant="secondary"
              icon={<ArrowLeftIcon />}
              width={30}
              height={30}
              style={{ borderColor: "var(--bttn-border-gray)" }}
            />
            <PrimaryBttn
              variant="secondary"
              icon={<ArrowLeftIcon />}
              width={30}
              height={30}
              style={{
                borderColor: "var(--bttn-border-gray)",
                transform: "rotate(180deg)",
              }}
            />
          </span>
        </span>
        <span
          className={clsx(classes.pannel_inner, classes.pagination_page_size)}
        >
          <span className={classes.pagination_label}>Show</span>
          <PrimaryBttn
            variant="secondary"
            icon={<ArrowDownIcon />}
            // width={30}
            // height={30}
            style={{ borderColor: "var(--bttn-border-gray)", color: "#334155" }}
            label="25 Items"
          />
        </span>
      </div>
    </div>
  );
};

export default DynamicTable;
