import clsx from "clsx";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  FilterIcon,
  SettingIcon,
  SortAscendingIcon,
  SortTableHeaderCellIcon,
} from "../../../../icons";
import { PrimaryBttn } from "../../button";
import Checkbox from "../../form/checkbox/Checkbox";
import classes from "./DynamicTable.module.css";
import { useCallback, useState, type ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
  className?: string;
}

export type RowKey = string | number;

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  height?: string | number;
  width?: string | number;
  keyExtractor: (item: T) => RowKey;
  canSelectRow?: boolean;
  onRowSelect?: (selectedKeys: RowKey[]) => void;
  defaultSelectedRowKeys?: RowKey[];
  // onRowClick?: (item: T) => void;
}

const DynamicTable = <T,>(props: DynamicTableProps<T>) => {
  console.log("props :>> ", props);

  const {
    columns,
    data,
    height = "100%",
    width = "100%",
    // keyExtractor,
    keyExtractor = (item: T) =>
      String((item as unknown as { id: RowKey }).id || data.indexOf(item)), //Todo: check if this works
    canSelectRow = false,
    onRowSelect,
    defaultSelectedRowKeys,
    // onRowClick,
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    defaultSelectedRowKeys || []
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleRowSelection = useCallback(
    (rowKey: string | number) => {
      setSelectedRowKeys((prev) => {
        const newSelection = prev.includes(rowKey)
          ? prev.filter((key) => key !== rowKey)
          : [...prev, rowKey];

        if (onRowSelect) {
          onRowSelect(newSelection);
        }
        return newSelection;
      });
    },
    [onRowSelect]
  );

  const handleSelectAll = useCallback(() => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelection = newSelectAll ? data.map(keyExtractor) : [];
    setSelectedRowKeys(newSelection);

    if (onRowSelect) {
      onRowSelect(newSelection);
    }
  }, [selectAll, data, keyExtractor, onRowSelect]);

  const tableHeaders = (
    <>
      {canSelectRow && (
        <th className={classes.select_column_header}>
          {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
        </th>
      )}
      {columns.map((column) => {
        const className = clsx(classes.table_header_cell, column.className);
        return (
          <th key={column.key} className={className}>
            <span className={classes.table_header_cell_label}>
              {column.label}
            </span>
            <SortTableHeaderCellIcon />
          </th>
        );
      })}
    </>
  );

  const tableRows = data.map((item /* index */) => {
    const rowKey = keyExtractor(item);
    const isSelected = selectedRowKeys.includes(rowKey);

    return (
      <tr
        key={rowKey}
        className={classes.table_row}
        onClick={() => handleRowSelection(rowKey)}
      >
        {canSelectRow && (
          <td className={classes.select_column_cell}>
            <Checkbox
              checked={isSelected}
              onChange={() => handleRowSelection(rowKey)}
            />
          </td>
        )}
        {columns.map((column) => {
          return (
            <td key={column.key} className={classes.table_cell}>
              {/* <div className="flex items-center"> */}
              <span>
                {column.render
                  ? column.render(item)
                  : String(
                      (item as Record<string, unknown>)[column.key] || "-"
                    )}
              </span>
              {/* </div> */}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className={classes.wrapper} style={{ width, height }}>
      {/* Header */}
      <div className={classes.panel}>
        <span className={classes.pannel_inner}>
          <Checkbox
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
          />
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
          <PrimaryBttn
            label="Export"
            variant="secondary"
            width={83}
            onClick={() => {
              const nrOfSelected = selectedRowKeys.length;

              if (nrOfSelected === 0) {
                alert("No items selected for export");
                return;
              }

              alert(
                "Exporting " +
                  nrOfSelected +
                  " items with keys: " +
                  selectedRowKeys
              );
            }}
          />
          <PrimaryBttn
            variant="ghost"
            icon={<FilterIcon />}
            width={33}
            // height={33}
          />
        </span>
      </div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.table_header}>
            {tableHeaders}
            <th className={classes.config_bttn_wrapper}>
              <SettingIcon />
            </th>
          </tr>
        </thead>
        <tbody className={classes.table_body}>{tableRows}</tbody>
      </table>
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
