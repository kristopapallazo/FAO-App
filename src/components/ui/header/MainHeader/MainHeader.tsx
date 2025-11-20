import { ArrowDownIcon, BellIcon, BurgerBttnIcon } from "../../../../icons";
import Avatar from "../../avatar/Avatar";
import ProfileImg from "../../../../assets/projfile-icon.png";
// import { user } from "../../../../data";
// import Icon from "../../icon/Icon";

import classes from "./MainHeader.module.css";
import SearchInput from "../../form/input/Input";
import { useApp } from "../../../../hooks/useAppCtx";
import { PrimaryBttn } from "../../button";
import clsx from "clsx";
import { useState } from "react";
import MainMenu from "../../menu/MainMenu/MainMenu";

const MainHeader = () => {
  const appCtx = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!appCtx) return <div>Error occured</div>;

  const user = appCtx?.user;
  const isMobile = appCtx?.isMobile;
  // const toggleTheme = appCtx.toggleTheme;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${classes.header} ${isMobile ? classes.mobile : ""} ${
          isMobile ? classes.mobile : ""
        } ${appCtx?.theme === "dark" ? classes.dark : ""}`}
      >
        {isMobile && (
          <span className={classes.burger_bttn_icon} onClick={toggleMenu}>
            <BurgerBttnIcon />
          </span>
        )}
        <SearchInput />
        <span
          className={clsx(classes.bell_icon, isMobile ? classes.mobile : "")}
        >
          <BellIcon />
        </span>

        {user && user.id ? (
          <>
            {/* Todo: add a logout on the dropdown */}
            <Avatar
              img={ProfileImg}
              width={isMobile ? 40 : 30}
              height={isMobile ? 40 : 30}
              style={isMobile ? { padding: 5 } : {}}
            />
            {!isMobile && (
              <span className={classes.user_info}>
                <span className={classes.user_name}>{user.name ?? ""}</span>
                <span className={classes.user_role}>{user.role ?? ""}</span>
              </span>
            )}
          </>
        ) : (
          <PrimaryBttn label="Login" />
        )}
        {!isMobile && (
          <span className={classes.arrow_down_icon}>
            <ArrowDownIcon />
          </span>
        )}
        {/* <Icons.ArrowDownIcon
        className={classes.arrow_down_icon}
        style={{ marginLeft: 36 }}
        /> */}
      </header>

      {/* Mobile Side Menu */}
      {isMobile && (
        <>
          {/* Overlay */}
          {isMenuOpen && (
            <div className={classes.overlay} onClick={closeMenu} />
          )}

          {/* Side Menu */}
          <div
            className={`${classes.side_menu} ${isMenuOpen ? classes.open : ""}`}
            style={{ backgroundColor: "#0f172a" }}
          >
            <div style={{ color: "white", padding: "20px" }}>
              {/* <h3>Menu (State: {isMenuOpen ? "Open" : "Closed"})</h3> */}
              <MainMenu />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainHeader;
