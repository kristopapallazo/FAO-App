import type { FC } from "react";
import MainMenu from "../../components/ui/menu/MainMenu/MainMenu";
import { Outlet } from "react-router-dom";
import MainHeader from "../../components/ui/header/MainHeader/MainHeader";
import classes from "./MainLayout.module.css";
import { useApp } from "../../hooks/useAppCtx";
import clsx from "clsx";

const MainLayout: FC = () => {
  const appCtx = useApp();

  const isMobile = appCtx.isMobile;

  return (
    <div className={classes.appWrapper}>
      {isMobile ? null : <MainMenu />}
      <main className={classes.main}>
        <MainHeader />
        <section
          className={clsx(classes.content, isMobile ? classes.mobile : "")}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
