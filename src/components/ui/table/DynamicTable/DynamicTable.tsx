import clsx from "clsx";
import {
  ArrowLeftIcon,
  FilterIcon,
  SettingIcon,
  SortAscendingIcon,
  SortTableHeaderCellIcon,
} from "../../../../icons";
import { IconOnlyBttn, PrimaryBttn } from "../../button";
import Checkbox from "../../form/checkbox/Checkbox";
import classes from "./DynamicTable.module.css";
import { useCallback, useState, type ReactNode } from "react";
import Select from "../../form/select/Select";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
  className?: string;
}

export type RowKey = string | number;

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  height?: string | number;
  width?: string | number;
  keyExtractor: (item: T) => RowKey;
  canSelectRow?: boolean;
  onRowSelect?: (selectedKeys: RowKey[]) => void;
  defaultSelectedRowKeys?: RowKey[];
  pagination?: {
    pageSize?: number;
    pageSizeOptions?: number[];
  };
  defaultSort?: SortConfig;
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
    pagination = {
      pageSize: 25,
      pageSizeOptions: [5, 10, 25, 50],
    },
    defaultSort,
    // onRowClick,
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    defaultSelectedRowKeys || []
  );
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 25);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    defaultSort || null
  );

  // Sorting logic
  const sortedData = useCallback(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortConfig.key];
      const bValue = (b as Record<string, unknown>)[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortConfig])();

  // Calculate pagination values
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

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

    const newSelection = newSelectAll ? paginatedData.map(keyExtractor) : [];
    setSelectedRowKeys(newSelection);

    if (onRowSelect) {
      onRowSelect(newSelection);
    }
  }, [selectAll, paginatedData, keyExtractor, onRowSelect]);

  const handlePageSizeChange = useCallback((value: string) => {
    const newPageSize = parseInt(value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const handleSort = useCallback((columnKey: string) => {
    setSortConfig((prevSort) => {
      if (!prevSort || prevSort.key !== columnKey) {
        return { key: columnKey, direction: "asc" };
      }
      if (prevSort.direction === "asc") {
        return { key: columnKey, direction: "desc" };
      }
      return null;
    });
    setCurrentPage(1); // Reset to first page when sorting changes
  }, []);

  const tableHeaders = (
    <>
      {canSelectRow && (
        <th className={classes.select_column_header}>
          {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
        </th>
      )}
      {columns.map((column) => {
        const isSorted = sortConfig?.key === column.key;
        const isSortable = column.sortable ?? false;
        const className = clsx(
          classes.table_header_cell,
          column.className,
          isSorted && classes.sorted_column,
          isSortable && classes.sortable_column
        );

        return (
          <th
            key={column.key}
            className={className}
            onClick={isSortable ? () => handleSort(column.key) : undefined}
            style={{ cursor: isSortable ? "pointer" : "default" }}
          >
            <span className={classes.table_header_cell_label}>
              {column.label}
            </span>
            {isSortable && (
              <>
                {!isSorted && <SortTableHeaderCellIcon />}
                {isSorted && sortConfig.direction === "asc" && (
                  <SortAscendingIcon />
                )}
                {isSorted && sortConfig.direction === "desc" && (
                  <span
                    style={{ transform: "rotate(180deg)", display: "flex" }}
                  >
                    <SortAscendingIcon />
                  </span>
                )}
              </>
            )}
          </th>
        );
      })}
    </>
  );

  const tableRows = paginatedData.map((item /* index */) => {
    const rowKey = keyExtractor(item);
    const isSelected = selectedRowKeys.includes(rowKey);

    return (
      <tr
        key={rowKey}
        className={classes.table_row}
        onClick={() => handleRowSelection(rowKey)}
      >
        {canSelectRow && (
          <td
            className={classes.select_column_cell}
            onClick={(e) => e.stopPropagation()}
          >
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
            label="Sort: Column Name"
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
          <PrimaryBttn
            label="Add Member"
            width={100}
            onClick={() => {
              alert("Open Add Member Modal");
            }}
          />
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
            onClick={() => {
              alert("Open Filter Modal");
            }}
          />
        </span>
      </div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.table_header}>
            {tableHeaders}
            <th
              className={classes.config_bttn_wrapper}
              onClick={() => {
                alert("Open the Table Config Modal");
              }}
            >
              <IconOnlyBttn icon={<SettingIcon />} />
            </th>
          </tr>
        </thead>
        <tbody className={classes.table_body}>{tableRows}</tbody>
      </table>
      {/* Footer */}
      <div className={classes.panel}>
        <span className={classes.pannel_inner}>
          <span className={classes.pagination_label}>
            {startIndex + 1} - {endIndex} of {totalItems}
          </span>
          <span className={classes.pagination_controls}>
            <PrimaryBttn
              variant="secondary"
              icon={<ArrowLeftIcon />}
              width={30}
              height={30}
              style={{
                borderColor: "var(--bttn-border-gray)",
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              onClick={currentPage === 1 ? undefined : handlePreviousPage}
            />
            <PrimaryBttn
              variant="secondary"
              icon={<ArrowLeftIcon />}
              width={30}
              height={30}
              style={{
                borderColor: "var(--bttn-border-gray)",
                transform: "rotate(180deg)",
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={currentPage === totalPages ? undefined : handleNextPage}
            />
          </span>
        </span>
        <span
          className={clsx(classes.pannel_inner, classes.pagination_page_size)}
        >
          <span className={classes.pagination_label}>Show</span>

          <Select
            wrapperStyle={{ height: "100%" }}
            options={(pagination?.pageSizeOptions || [5, 10, 25, 50]).map(
              (size) => ({
                value: String(size),
                label: `${size} Items`,
              })
            )}
            value={String(pageSize)}
            onChange={handlePageSizeChange}
            width="95px"
          />
        </span>
      </div>
    </div>
  );
};

export default DynamicTable;
