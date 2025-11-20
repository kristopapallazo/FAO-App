import React, { type FC } from "react";
import classes from "./Badge.module.css";
import clsx from "clsx";
import type { BadgeStatus } from "../../../types/dto.types";

interface BadgeProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  color?: string;
  backgroundColor?: string;
  icon?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  iconWrapperStyle?: React.CSSProperties;
  variant?: BadgeStatus;
  children?: React.ReactNode;
  addPointerStatus?: boolean;
}

const Badge: FC<BadgeProps> = ({
  width,
  height,
  label,
  color,
  backgroundColor,
  icon,
  wrapperStyle = {},
  labelStyle = {},
  iconWrapperStyle = {},
  variant = "success",
  children,
  addPointerStatus = false,
}: BadgeProps) => {
  const className = clsx(classes.badge, {
    [classes.success]: variant === "success",
    [classes.warning]: variant === "warning",
    [classes.error]: variant === "error",
  });

  return (
    <div
      className={className}
      style={{ width, height, color, backgroundColor, ...wrapperStyle }}
    >
      {icon && (
        <span className={classes.icon_wrapper} style={iconWrapperStyle}>
          {icon}
        </span>
      )}

      {addPointerStatus && (
        <span
          className={clsx(classes.pointer_status, {
            [classes.success]: variant === "success",
            [classes.warning]: variant === "warning",
            [classes.error]: variant === "error",
          })}
        ></span>
      )}

      <span className={classes.label} style={{ color, ...labelStyle }}>
        {label || children}
      </span>
    </div>
  );
};

export default Badge;
