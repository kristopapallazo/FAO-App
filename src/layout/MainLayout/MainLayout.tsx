import type { FC } from "react";
import styles from "./MainLayout.module.css";
import MainMenu from "../../components/ui/menu/MainMenu/MainMenu";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className={styles.appWrapper}>
      <MainMenu />
      {/* <aside className={styles.sidebar}>Menu</aside> */}
      <main className={styles.main}>
        <header className={styles.header}>Header</header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
