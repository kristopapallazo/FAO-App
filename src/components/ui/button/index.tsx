import { useMemo, type FC } from "react";
import classes from "./button.module.css";
import clsx from "clsx";

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

type BttnVariant = "primary" | "secondary" | "ghost";

interface PrimaryBttnProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  label?: string;
  icon?: React.ReactNode;
  variant?: BttnVariant;
  onClick?: () => void;
  height?: number | string;
  width?: number | string;
}

export const PrimaryBttn: FC<PrimaryBttnProps> = ({
  children,
  label,
  style = {},
  // active = false,
  icon,
  variant = "primary",
  onClick,
  height = "100%",
  width,
  // height = "33px",
}) => {
  /* Determine if only contains an icon */
  const onlyIcon = useMemo(() => {
    return icon && !children && !label;
  }, [children, label, icon]);

  /* Determine if has label/children & an icon */
  const hasIcon = useMemo(() => {
    return icon && (children || label);
  }, [children, label, icon]);

  const variantClassName = clsx(
    classes.default_bttn,
    classes.bttn_common,
    variant === "primary" ? classes.primary_bttn : classes.secondary_bttn,
    onlyIcon ? classes.only_icon : "",
    hasIcon ? classes.with_icon : ""
  );

  return (
    <button
      className={variantClassName}
      // className={`${classes.main_menu_bttn} ${classes.default_bttn} ${
      //   active ? classes.active : ""
      // }`}
      style={{ height, width, ...style }}
      onClick={onClick}
    >
      {icon}
      {(children || label) && (
        <>
          {children || label}
          {/* <span className={classes.label_text}>{children || label}</span> */}
        </>
      )}
    </button>
  );
};
