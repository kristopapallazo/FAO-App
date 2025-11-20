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

const MainHeader = () => {
  const appCtx = useApp();

  if (!appCtx) return <div>Error occured</div>;

  const user = appCtx?.user;
  const isMobile = appCtx?.isMobile;

  return (
    <header className={`${classes.header} ${isMobile ? classes.mobile : ""}`}>
      {isMobile && (
        <span className={classes.burger_bttn_icon}>
          <BurgerBttnIcon />
        </span>
      )}
      <SearchInput />
      <span className={clsx(classes.bell_icon, isMobile ? classes.mobile : "")}>
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
  );
};

export default MainHeader;
