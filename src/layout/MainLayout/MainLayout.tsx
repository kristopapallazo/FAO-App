import type { FC } from "react";
import MainMenu from "../../components/ui/menu/MainMenu/MainMenu";
import { Outlet } from "react-router-dom";
import MainHeader from "../../components/ui/header/MainHeader/MainHeader";
import classes from "./MainLayout.module.css";

const MainLayout: FC = () => {
  return (
    <div className={classes.appWrapper}>
      <MainMenu />
      <main className={classes.main}>
        <MainHeader />
        <section className={classes.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
