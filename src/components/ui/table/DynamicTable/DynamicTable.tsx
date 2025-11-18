import { PrimaryBttn } from "../../button";
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
      <div className={classes.panel}>
        <PrimaryBttn label="Add New" />
        <PrimaryBttn label="Add New" variant="secondary" />
        <PrimaryBttn label="Add New" variant="ghost" />
      </div>
      <table className={classes.table}></table>
      <div className={classes.panel}>footer panel</div>
    </div>
  );
};

export default DynamicTable;
