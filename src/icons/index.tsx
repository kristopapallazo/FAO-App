// #region React Icons Imports
import { FaBoltLightning } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuLogs } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";
// import { FaCalendarCheck } from "react-icons/fa";
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { MdDarkMode } from "react-icons/md";
import { CiGrid2H } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import { LuLayoutGrid } from "react-icons/lu";
import { LuCalendar1 } from "react-icons/lu";
import { AiOutlineLoading } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
// #endregion React Icons Imports

// #region Figma SVG Imports
import BellIcon from "./bell-icon.svg";
import ArrowDownIcon from "./chevron-down.svg";
import SearchIcon from "./search.svg";
import FilterIcon from "./filter.svg";
import SortAscendingIcon from "./sort-ascending.svg";
import SortTableHeaderCellIcon from "./sort_table_header_cell.svg";
import CheckIcon from "./check.svg";
import ArrowLeftIcon from "./chevron-left.svg";
import SettingIcon from "./settings.svg";

// #endregion Figma SVG Imports

const Icons = {
  LightIcon: FaBoltLightning,
  DashboardIcon: LuLayoutGrid,
  UserGroupIcon: FaUserGroup,
  CalendarIcon: LuCalendar1,
  DocumentIcon: FaRegFileAlt,
  AnalyticsIcon: MdOutlineAnalytics,
  LogsIcon: LuLogs,
  SettingsIcon: VscSettingsGear,
  DarkModeIcon: BsMoonStars,
  BlocksIcon: CiGrid2H,
  LoadingIcon: AiOutlineLoading,
  ArrowDownIcon: MdKeyboardArrowDown,
  // BellIcon: BellIcon,
};

export {
  BellIcon,
  ArrowDownIcon,
  SearchIcon,
  FilterIcon,
  SortAscendingIcon,
  SortTableHeaderCellIcon,
  CheckIcon,
  ArrowLeftIcon,
  SettingIcon,
};

export default Icons;
