import type { FC } from "react";
import classes from "./button.module.css";

interface IconBttnProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const IconBttn: FC<IconBttnProps> = ({ children, style = {} }) => {
  return (
    <button
      className={`${classes.icon_bttn} ${classes.default_bttn}`}
      style={style}
    >
      {children}
    </button>
  );
};

interface MainMenuBttnProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  active?: boolean;
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

export const MainMenuBttn: FC<MainMenuBttnProps> = ({
  children,
  label,
  style = {},
  active = false,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`${classes.main_menu_bttn} ${classes.default_bttn} ${
        active ? classes.active : ""
      }`}
      style={style}
      onClick={onClick}
    >
      {icon}
      {(children || label) && (
        <span className={classes.label_text}>{children || label}</span>
      )}
    </button>
  );
};
