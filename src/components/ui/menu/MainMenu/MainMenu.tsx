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

const items = [
  { key: "dashboard", label: "Dashboard", Icon: Icons.DashboardIcon },
  { key: "team", label: "Team", Icon: Icons.UserGroupIcon },
  { key: "calendar", label: "Calendar", Icon: Icons.CalendarIcon },
  { key: "blocks", label: "Blocks", Icon: Icons.BlocksIcon },
  { key: "documents", label: "Documents", Icon: Icons.DocumentIcon },
  { key: "analytics", label: "Analytics", Icon: Icons.AnalyticsIcon },
  { key: "logs", label: "Logs", Icon: Icons.LogsIcon },
  { key: "settings", label: "Settings", Icon: Icons.SettingsIcon },
  { key: "dark-mode", label: "Dark Mode", Icon: Icons.DarkModeIcon },
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

  const bttns = items.map((item) => {
    const isActive =
      (item.key === "dashboard" && location.pathname === "/") ||
      location.pathname === `/${item.key}`;

    return (
      <MainMenuBttn
        key={item.key}
        active={isActive}
        style={{ marginBottom: 8 }}
        icon={<item.Icon style={{ width: 22, height: 22 }} />}
        onClick={() => handleNavigation(item.key)}
      >
        {item.label}
      </MainMenuBttn>
    );
  });

  return (
    <aside className={styles.main_menu}>
      <AppTitle />
      <nav className={styles.menu_items}>{bttns}</nav>
    </aside>
  );
};

export default MainMenu;
