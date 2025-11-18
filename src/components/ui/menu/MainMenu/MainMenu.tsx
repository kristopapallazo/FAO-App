import { type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MainMenu.module.css";
import { IconBttn, MainMenuBttn } from "../../button";
import Icons from "../../../../icons";

const AppTitle: FC = () => {
  return (
    <div className={styles.app_title} style={{ marginBottom: 20 }}>
      <IconBttn /* style={{ marginRight: 10 }} */>
        <Icons.LightIcon />
      </IconBttn>
      <h1 className={styles.title_text}>PortFarm</h1>
      <div className={styles.top_menu_border} />
    </div>
  );
};

interface MenuItem {
  key: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  justifyEnd?: boolean;
}

const items: MenuItem[] = [
  { key: "dashboard", label: "Dashboard", Icon: Icons.DashboardIcon },
  { key: "team", label: "Team", Icon: Icons.UserGroupIcon },
  { key: "calendar", label: "Calendar", Icon: Icons.CalendarIcon },
  { key: "blocks", label: "Blocks", Icon: Icons.BlocksIcon },
  { key: "documents", label: "Documents", Icon: Icons.DocumentIcon },
  { key: "analytics", label: "Analytics", Icon: Icons.AnalyticsIcon },
  { key: "logs", label: "Logs", Icon: Icons.LogsIcon },
  {
    key: "settings",
    label: "Settings",
    Icon: Icons.SettingsIcon,
    justifyEnd: true,
  },
  {
    key: "dark-mode",
    label: "Dark Mode",
    Icon: Icons.DarkModeIcon,
    justifyEnd: true,
  },
];

const MainMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (key: string) => {
    if (key === "dark-mode") {
      // Handle dark mode toggle
      return;
    }
    const path = key === "dashboard" ? "/" : `/${key}`;
    navigate(path);
  };

  const regularItems: MenuItem[] = [];
  const endItems: MenuItem[] = [];

  items.forEach((item) => {
    if (item.justifyEnd) {
      endItems.push(item);
    } else {
      regularItems.push(item);
    }
  });
  //   const regularItems = items.filter((item) => !item.justifyEnd);
  //   const endItems = items.filter((item) => item.justifyEnd);

  const renderButton = (item: (typeof items)[0]) => {
    const isActive =
      (item.key === "dashboard" && location.pathname === "/") ||
      location.pathname === `/${item.key}`;

    return (
      <MainMenuBttn
        key={item.key}
        active={isActive}
        icon={<item.Icon style={{ width: 22, height: 22 }} />}
        onClick={() => handleNavigation(item.key)}
      >
        {item.label}
      </MainMenuBttn>
    );
  };

  return (
    <aside className={styles.main_menu}>
      <AppTitle />
      <nav className={styles.menu_items}>{regularItems.map(renderButton)}</nav>
      <nav className={styles.menu_items_end}>{endItems.map(renderButton)}</nav>
    </aside>
  );
};

export default MainMenu;
