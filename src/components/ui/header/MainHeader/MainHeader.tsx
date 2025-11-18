import { ArrowDownIcon, BellIcon } from "../../../../icons";
import Avatar from "../../avatar/Avatar";
import ProfileImg from "../../../../assets/projfile-icon.png";
import { user } from "../../../../data";
// import Icon from "../../icon/Icon";

import classes from "./MainHeader.module.css";
import SearchInput from "../../form/input/Input";

const MainHeader = () => {
  const { name, role } = user || {};
  return (
    <header className={classes.header}>
      <SearchInput />
      <span className={classes.bell_icon}>
        <BellIcon />
      </span>
      <Avatar img={ProfileImg} />
      <span className={classes.user_info}>
        <span className={classes.user_name}>{name ?? ""}</span>
        <span className={classes.user_role}>{role ?? ""}</span>
      </span>

      <span className={classes.arrow_down_icon}>
        <ArrowDownIcon />
      </span>
      {/* <Icons.ArrowDownIcon
        className={classes.arrow_down_icon}
        style={{ marginLeft: 36 }}
      /> */}
    </header>
  );
};

export default MainHeader;
