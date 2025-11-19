import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  ReactElement,
  FC,
} from "react";
import ErrorBoundary from "../common/ErrorBoundary";
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner";
import ErrorRequestLabel from "./AccountsTable/ErrorRequestLabel";
import LoadingTable from "./AccountsTable/LoadingTable";
import ButtonExtended from "../ui/button-extended";
import Title from "../ui/title";
import { TitleProps } from "react-helmet-async";
import {
  CircleFilledClose,
  FileIcon,
  LoadingIcon,
  RefreshIcon,
  SearchIcon,
  WarningIcon,
} from "../../icons";
import Input from "../form/input/InputField";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
  className?: string;
}

export interface PaginationConfig {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface SortConfig {
  field: string | null;
  order: "asc" | "desc";
  onSort: (field: string) => void;
}

export interface SearchConfig {
  value: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  onClear: () => void;
  isSearching?: boolean;
  resultText?: string;
}

export interface FiltersConfig {
  search?: string;
}

export interface UnsavedChangesConfig {
  hasChanges: boolean; // Whether there are unsaved changes
  changedItems?: Array<{
    id: string | number;
    description: string; // e.g., "Quote 250861: pending changes"
  }>;
  onSave: () => void | Promise<void>; // Callback to save changes
  onDiscard: () => void; // Callback to discard changes
  isSaving?: boolean; // Loading state during save
  disableSave?: boolean; // Disable save button (e.g., validation errors)
  saveButtonText?: string; // Default: "Save Changes"
  discardButtonText?: string; // Default: "Discard"
  alertType?: "error" | "warning"; // Default: "warning"
  customMessage?: string; // Custom alert message
}

// Simplified configs for client mode
export interface ClientPaginationConfig {
  rowsPerPage?: number; // Default: 10
  initialPage?: number; // Default: 1
}

export interface ClientSortConfig {
  defaultField?: string | null;
  defaultOrder?: "asc" | "desc";
}

export interface ClientSearchConfig {
  placeholder?: string;
  searchableFields?: (string | string[])[]; // String for direct field, array for nested path (e.g., ['contact', 'name'])
  caseSensitive?: boolean; // Default: false
}

export interface DynamicTableProps<T> {
  title?: string;
  titlePlacement?: "header" | "innerHeader"; // Default: "header"
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  error?: string | null;
  onRowClick?: (item: T) => void;
  selectedRowKey?: string | number | null; // Allow parent to control selected row
  // defaultSelectedRow?: string | number | null; // Initial selected row (uncontrolled mode only)
  onRowSelectionChange?: (rowKey: string | number | null) => void; // Notify parent of selection changes

  // Mode selection
  mode?: "server" | "client"; // Default: "server"

  // Server mode props (existing behavior)
  pagination?: PaginationConfig;
  sorting?: SortConfig;
  search?: SearchConfig;
  //   filters?: Record<string, any>;
  filters?: FiltersConfig;

  // Client mode props (new - simpler configuration)
  clientPagination?: ClientPaginationConfig | boolean; // true uses defaults
  clientSorting?: ClientSortConfig | boolean; // true enables sorting on sortable columns
  clientSearch?: ClientSearchConfig | boolean; // true uses defaults

  // Unsaved changes alert (optional)
  unsavedChanges?: UnsavedChangesConfig;

  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  striped?: boolean;
  hoverEffect?: boolean;
  height?: string; // Default: "100%", or use "auto" for content-based height
  rounded?: boolean; // Default: true - controls rounded-lg class
  innerHeader?: ReactElement[]; // Each element should have a unique 'key' prop
  index?: string;
}

function DynamicTable<T>({
  title,
  titlePlacement = "header",
  columns,
  data,
  keyExtractor,
  loading = false,
  error = null,
  onRowClick,
  selectedRowKey: controlledSelectedRowKey,
  // defaultSelectedRow,
  onRowSelectionChange,
  mode = "server",
  pagination,
  sorting,
  search,
  filters,
  clientPagination,
  clientSorting,
  clientSearch,
  unsavedChanges,
  onRefresh,
  isRefreshing = false,
  className = "",
  emptyStateMessage,
  emptyStateIcon,
  striped = true,
  hoverEffect = true,
  height = "100%",
  rounded = true,
  innerHeader,
}: DynamicTableProps<T>) {
  // Client mode state

  const [clientSearchValue, setClientSearchValue] = useState("");
  const [clientSortField, setClientSortField] = useState<string | null>(
    typeof clientSorting === "object"
      ? clientSorting.defaultField || null
      : null
  );
  const [clientSortOrder, setClientSortOrder] = useState<"asc" | "desc">(
    typeof clientSorting === "object"
      ? clientSorting.defaultOrder || "asc"
      : "asc"
  );
  const [clientCurrentPage, setClientCurrentPage] = useState(
    typeof clientPagination === "object" ? clientPagination.initialPage || 1 : 1
  );

  // Server mode state
  const [searchInput, setSearchInput] = useState(search?.value || "");
  const [previousSearchInput, setPreviousSearchInput] = useState(searchInput);

  // Selected row state (controlled or uncontrolled)
  const [internalSelectedRowKey, setInternalSelectedRowKey] = useState<
    string | number | null
  >(null);
  const selectedRowKey =
    controlledSelectedRowKey !== undefined
      ? controlledSelectedRowKey
      : internalSelectedRowKey;

  const handleRowSelection = useCallback(
    (rowKey: string | number | null) => {
      // Allow toggling selection by clicking the same row again
      const newSelectedKey = selectedRowKey === rowKey ? null : rowKey;

      if (controlledSelectedRowKey === undefined) {
        // Uncontrolled mode - manage state internally
        setInternalSelectedRowKey(newSelectedKey);
      }
      // Notify parent component if callback provided
      if (onRowSelectionChange) {
        onRowSelectionChange(newSelectedKey);
      }
    },
    [controlledSelectedRowKey, onRowSelectionChange, selectedRowKey]
  );

  const isClientMode = mode === "client";

  useEffect(() => {
    if (!isClientMode && search) {
      if (previousSearchInput && !searchInput.trim()) {
        search.onClear();
      }
      setPreviousSearchInput(searchInput);
    }
  }, [searchInput, previousSearchInput, search, isClientMode]);

  // Client-side data processing
  const processedData = useMemo(() => {
    if (!isClientMode) return data;

    let result = [...data];

    // 1. Client-side Search
    if (clientSearch && clientSearchValue.trim()) {
      const searchLower = clientSearchValue.toLowerCase();
      const searchConfig = typeof clientSearch === "object" ? clientSearch : {};
      const caseSensitive = searchConfig.caseSensitive || false;
      const searchableFields =
        searchConfig.searchableFields || columns.map((c) => c.key);

      result = result.filter((item) => {
        return searchableFields.some((field) => {
          let value: unknown;

          // Handle nested paths (e.g., ['contact', 'name', 'first'])
          if (Array.isArray(field)) {
            value = field.reduce(
              (obj: Record<string, unknown>, key: string) => {
                if (obj && typeof obj === "object" && key in obj) {
                  return obj as Record<string, unknown>;
                }
                return obj?.[key] as Record<string, unknown>;
              },
              item as Record<string, unknown>
            );
            // value = field.reduce((obj: Record<string, unknown>, key: string) => {
            //   if (obj && typeof obj === 'object' && key in obj) {
            //     return obj as Record<string, unknown>;
            //   }
            //   return obj?.[key] as Record<string, unknown>;
            // }, item as Record<string, unknown>);
          } else {
            value = (item as Record<string, unknown>)[field];
          }

          // Convert to string for comparison
          if (value == null) return false;

          const stringValue = String(value);
          if (caseSensitive) {
            return stringValue.includes(clientSearchValue);
          }
          return stringValue.toLowerCase().includes(searchLower);
        });
      });
    }

    // 2. Client-side Sorting
    if (clientSorting && clientSortField) {
      result.sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[clientSortField];
        const bValue = (b as Record<string, unknown>)[clientSortField];

        // Handle null/undefined
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Compare values
        let comparison = 0;
        if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return clientSortOrder === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [
    isClientMode,
    data,
    clientSearch,
    clientSearchValue,
    clientSorting,
    clientSortField,
    clientSortOrder,
    columns,
  ]);

  // 3. Client-side Pagination
  const paginatedData = useMemo(() => {
    if (!isClientMode || !clientPagination) return processedData;

    const rowsPerPage =
      typeof clientPagination === "object"
        ? clientPagination.rowsPerPage || 10
        : 10;

    const startIndex = (clientCurrentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return processedData.slice(startIndex, endIndex);
  }, [isClientMode, clientPagination, processedData, clientCurrentPage]);

  // Determine which data to display
  const displayData = isClientMode ? paginatedData : data;
  const totalRows = isClientMode
    ? processedData.length
    : pagination?.totalRows || data.length;

  // Client mode handlers
  const handleClientSearch = useCallback((value: string) => {
    setClientSearchValue(value);
    setClientCurrentPage(1); // Reset to first page on search
  }, []);

  const handleClientClearSearch = useCallback(() => {
    setClientSearchValue("");
    setClientCurrentPage(1);
  }, []);

  const handleClientSort = useCallback((field: string) => {
    setClientSortField((prevField) => {
      if (prevField === field) {
        setClientSortOrder((prevOrder) =>
          prevOrder === "asc" ? "desc" : "asc"
        );
      } else {
        setClientSortOrder("asc");
      }
      return field;
    });
  }, []);

  const handleClientPageChange = useCallback((page: number) => {
    setClientCurrentPage(page);
  }, []);

  // Server mode handlers
  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  const handleSearch = useCallback(() => {
    if (search) {
      if (searchInput.trim()) {
        search.onSearch(searchInput);
      } else {
        // If search input is empty, treat it as clear search
        search.onClear();
      }
    }
  }, [search, searchInput]);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    if (search) {
      search.onClear();
    }
  }, [search]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Unified handlers and configs based on mode
  const activeSearchValue = isClientMode ? clientSearchValue : searchInput;
  const activeSearchPlaceholder = isClientMode
    ? typeof clientSearch === "object"
      ? clientSearch.placeholder
      : "Search..."
    : search?.placeholder || "Search...";
  const hasSearch = isClientMode ? !!clientSearch : !!search;
  const isSearching = isClientMode ? false : search?.isSearching || false;

  const handleActiveSearch = isClientMode
    ? () => handleClientSearch(clientSearchValue)
    : handleSearch;
  const handleActiveClearSearch = isClientMode
    ? handleClientClearSearch
    : handleClearSearch;
  const handleActiveSearchInputChange = isClientMode
    ? (e: React.ChangeEvent<HTMLInputElement>) =>
        setClientSearchValue(e.target.value)
    : handleSearchInputChange;

  const activeSortConfig = useMemo(() => {
    if (isClientMode) {
      return clientSorting
        ? {
            field: clientSortField,
            order: clientSortOrder,
            onSort: handleClientSort,
          }
        : undefined;
    }
    return sorting;
  }, [
    isClientMode,
    clientSorting,
    clientSortField,
    clientSortOrder,
    handleClientSort,
    sorting,
  ]);

  const activePaginationConfig =
    isClientMode && clientPagination
      ? {
          currentPage: clientCurrentPage,
          totalRows,
          rowsPerPage:
            typeof clientPagination === "object"
              ? clientPagination.rowsPerPage || 10
              : 10,
          onPageChange: handleClientPageChange,
        }
      : pagination;

  const SortIcon = useCallback(
    ({ field }: { field: string }) => {
      if (!activeSortConfig || activeSortConfig.field !== field) return null;
      return (
        <span className="ml-1 text-blue-600">
          {activeSortConfig.order === "asc" ? "↑" : "↓"}
        </span>
      );
    },
    [activeSortConfig]
  );

  // if (loading) return <LoadingSpinner />;
  if (loading)
    return (
      <LoadingTable
        className="h-full"
        isLoading={true}
        title={title}
        tableColumns={columns.length}
      />
    );

  if (error)
    return (
      <ErrorRequestLabel
        error={error}
        label="Accounts"
        onRefresh={onRefresh}
        // className={className}
      />
    );

  return (
    <ErrorBoundary>
      <div
        className={`bg-white ${
          rounded ? "rounded-lg" : ""
        } shadow flex flex-col ${className}`}
        style={height !== "auto" ? { height } : undefined}
        tabIndex={0}
        // onKeyDown={handleKeyDown}
      >
        {/* Inner Header=> Title & Actions */}
        {(!!innerHeader?.length ||
          (!!title?.length && titlePlacement === "innerHeader")) && (
          <div
            className={`shrink-0 flex items-center gap-3 p-3 border-b border-gray-200 overflow-x-auto ${
              title?.length && titlePlacement === "innerHeader"
                ? "justify-between"
                : "justify-end"
            }`}
          >
            {!!title?.length && titlePlacement === "innerHeader" && (
              <TableTitle title={title} /* level="span" */ />
            )}
            {innerHeader && innerHeader.length > 0 && (
              <div className="flex items-center gap-3">{innerHeader}</div>
            )}
          </div>
        )}
        {/* Unsaved Changes Alert */}
        {unsavedChanges && unsavedChanges.hasChanges && (
          <div
            className={`px-6 py-4 flex items-start ${
              unsavedChanges.alertType === "error"
                ? "bg-red-50 border-b border-red-200"
                : "bg-yellow-50 border-b border-yellow-200"
            } shrink-0`}
          >
            <div className="shrink-0">
              {unsavedChanges.alertType === "error" ? (
                <CircleFilledClose className="h-5 w-5 text-red-400" />
              ) : (
                <WarningIcon className="h-5 w-5 text-yellow-400" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <h3
                className={`text-sm font-medium ${
                  unsavedChanges.alertType === "error"
                    ? "text-red-800"
                    : "text-yellow-800"
                }`}
              >
                {unsavedChanges.alertType === "error"
                  ? "Required fields are missing"
                  : "You have unsaved changes"}
              </h3>
              <div
                className={`mt-2 text-sm ${
                  unsavedChanges.alertType === "error"
                    ? "text-red-700"
                    : "text-yellow-700"
                }`}
              >
                {unsavedChanges.customMessage ? (
                  <p>{unsavedChanges.customMessage}</p>
                ) : (
                  <>
                    {unsavedChanges.changedItems &&
                    unsavedChanges.changedItems.length > 0 ? (
                      <p>
                        {unsavedChanges.changedItems[0].description}
                        {unsavedChanges.changedItems.length > 1 &&
                          ` and ${
                            unsavedChanges.changedItems.length - 1
                          } more item${
                            unsavedChanges.changedItems.length - 1 > 1
                              ? "s"
                              : ""
                          }`}
                      </p>
                    ) : (
                      <p>
                        Please save or discard your changes before continuing.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="ml-auto pl-3 flex gap-2">
              <ButtonExtended
                variant={
                  unsavedChanges.alertType === "error" ? "danger" : "warning"
                }
                onClick={unsavedChanges.onDiscard}
                disabled={unsavedChanges.isSaving}
                // className={`px-4 py-2 text-sm font-medium rounded-md ${
                //   unsavedChanges.alertType === "error"
                //     ? "text-red-700 bg-red-100 hover:bg-red-200"
                //     : "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                // } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                //   unsavedChanges.alertType === "error"
                //     ? "focus:ring-red-500"
                //     : "focus:ring-yellow-500"
                // } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                {unsavedChanges.discardButtonText || "Discard"}
              </ButtonExtended>
              <ButtonExtended
                onClick={unsavedChanges.onSave}
                disabled={unsavedChanges.isSaving || unsavedChanges.disableSave}
                variant={
                  unsavedChanges.alertType === "error" ? "danger" : "primary"
                }
                // className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                //   unsavedChanges.alertType !== "error"
                //     ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                //     : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                // } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors`}
              >
                {unsavedChanges.isSaving && (
                  <LoadingIcon /* className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" */
                  />
                )}
                {unsavedChanges.saveButtonText || "Save Changes"}
              </ButtonExtended>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-3 border-b border-gray-200 shrink-0">
          <div className="flex justify-between items-center">
            {!!title?.length && titlePlacement === "header" && (
              <TableTitle title={title} />
            )}
            <div className="flex items-center space-x-4">
              {activePaginationConfig && (
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  {(activePaginationConfig.currentPage - 1) *
                    activePaginationConfig.rowsPerPage +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    activePaginationConfig.currentPage *
                      activePaginationConfig.rowsPerPage,
                    activePaginationConfig.totalRows
                  )}{" "}
                  of {activePaginationConfig.totalRows} results
                </div>
              )}
              {onRefresh && (
                <ButtonExtended
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  title="Refresh"
                  variant="ghost"
                >
                  <RefreshIcon
                    className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </ButtonExtended>
              )}
            </div>
          </div>
          {/* Search Bar */}
          {hasSearch && (
            <div className="mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder={activeSearchPlaceholder}
                    value={activeSearchValue}
                    onChange={handleActiveSearchInputChange}
                    onKeyPress={handleKeyPress}
                    leftIcon={<SearchIcon className="h-5 w-5" />}
                  />
                  {isSearching && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <LoadingSpinner size="sm" fullHeight={false} />
                    </div>
                  )}
                </div>
                <ButtonExtended onClick={handleActiveSearch}>
                  Search
                </ButtonExtended>
                {activeSearchValue && (
                  <ButtonExtended
                    variant="secondary"
                    onClick={handleActiveClearSearch}
                  >
                    Clear
                  </ButtonExtended>
                )}
              </div>
              {/* Show search results info */}
              {!isClientMode && filters?.search && (
                <div className="mt-2 text-sm text-gray-600">
                  Searching for:{" "}
                  <span className="font-medium">"{filters?.search}"</span>
                  {data.length > 0 && (
                    <span className="ml-2 text-blue-600">
                      - Found {data.length} results
                    </span>
                  )}
                </div>
              )}
              {isClientMode && activeSearchValue && (
                <div className="mt-2 text-sm text-gray-600">
                  Searching for:{" "}
                  <span className="font-medium">"{activeSearchValue}"</span>
                  {processedData.length > 0 && (
                    <span className="ml-2 text-blue-600">
                      - Found {processedData.length} results
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Table - Takes remaining height */}
        <div className="flex-1 overflow-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable && activeSortConfig
                        ? "cursor-pointer hover:bg-gray-100 transition-colors"
                        : ""
                    } ${column.className || ""}`}
                    onClick={
                      column.sortable && activeSortConfig
                        ? () => activeSortConfig.onSort(column.key)
                        : undefined
                    }
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {column.sortable && activeSortConfig && (
                        <SortIcon field={column.key} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      {emptyStateIcon || <FileIcon className="h-12 w-12" />}
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        No data found
                      </p>
                      <p className="text-gray-500">
                        {emptyStateMessage ||
                          (activeSearchValue
                            ? "Try adjusting your search terms"
                            : "No data available at the moment")}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayData.map((item, index) => {
                  const rowKey = keyExtractor(item);
                  const isSelected = selectedRowKey === rowKey;

                  return (
                    <tr
                      key={rowKey}
                      className={`${
                        isSelected
                          ? "bg-blue-100 border-l-4 border-blue-500 shadow-sm"
                          : striped
                          ? index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                          : "bg-white"
                      } ${
                        hoverEffect && onRowClick
                          ? isSelected
                            ? "hover:bg-blue-200 cursor-pointer"
                            : "hover:bg-blue-50 cursor-pointer"
                          : ""
                      } transition-all duration-200 ease-in-out`}
                      onClick={
                        onRowClick
                          ? () => {
                              handleRowSelection(rowKey);
                              onRowClick(item);
                            }
                          : undefined
                      }
                    >
                      {columns.map((column) => {
                        const isSticky = column.className?.includes("sticky");
                        const cleanClassName =
                          column.className
                            ?.replace(/bg-inherit|bg-gray-50/g, "")
                            .trim() || "";
                        const bgClass = isSticky
                          ? isSelected
                            ? "bg-blue-100"
                            : striped && index % 2 !== 0
                            ? "bg-gray-50"
                            : "bg-white"
                          : "";

                        return (
                          <td
                            key={column.key}
                            className={`px-4 py-2 text-sm ${cleanClassName} ${
                              isSelected ? "font-medium text-blue-900" : ""
                            } ${bgClass}`}
                          >
                            <div className="flex items-center">
                              <span>
                                {column.render
                                  ? column.render(item)
                                  : String(
                                      (item as Record<string, unknown>)[
                                        column.key
                                      ] || "-"
                                    )}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {activePaginationConfig &&
          activePaginationConfig.totalRows >
            activePaginationConfig.rowsPerPage && (
            // <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 shrink-0">
            <div className="flex justify-between items-center gap-3 overflow-x-auto p-3 border-t border-gray-200 bg-gray-50 shrink-0">
              <div className="text-sm text-gray-700 whitespace-nowrap">
                {activeSearchValue ? (
                  <>
                    Showing{" "}
                    {(activePaginationConfig.currentPage - 1) *
                      activePaginationConfig.rowsPerPage +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      activePaginationConfig.currentPage *
                        activePaginationConfig.rowsPerPage,
                      activePaginationConfig.totalRows
                    )}{" "}
                    of {activePaginationConfig.totalRows} results for "
                    {activeSearchValue}"
                  </>
                ) : (
                  <>
                    Showing{" "}
                    {(activePaginationConfig.currentPage - 1) *
                      activePaginationConfig.rowsPerPage +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      activePaginationConfig.currentPage *
                        activePaginationConfig.rowsPerPage,
                      activePaginationConfig.totalRows
                    )}{" "}
                    of {activePaginationConfig.totalRows} results
                  </>
                )}
              </div>
              <div className="flex items-center justify-between space-x-2">
                <ButtonExtended
                  onClick={() =>
                    activePaginationConfig.onPageChange(
                      activePaginationConfig.currentPage - 1
                    )
                  }
                  disabled={activePaginationConfig.currentPage === 1 || loading}
                  // className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </ButtonExtended>
                <span className="px-3 py-1 text-sm text-gray-700 whitespace-nowrap">
                  Page {activePaginationConfig.currentPage} of{" "}
                  {Math.ceil(
                    activePaginationConfig.totalRows /
                      activePaginationConfig.rowsPerPage
                  )}
                </span>
                <ButtonExtended
                  onClick={() =>
                    activePaginationConfig.onPageChange(
                      activePaginationConfig.currentPage + 1
                    )
                  }
                  disabled={
                    activePaginationConfig.currentPage *
                      activePaginationConfig.rowsPerPage >=
                      activePaginationConfig.totalRows || loading
                  }
                  // className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </ButtonExtended>
              </div>
            </div>
            // </div>
          )}
      </div>
    </ErrorBoundary>
  );
}

// #region Helper Components
export const TableTitle: FC<TitleProps> = (props) => {
  const { title } = props;

  return <Title title={title} className="whitespace-nowrap" {...props} />;
};

export default DynamicTable;
