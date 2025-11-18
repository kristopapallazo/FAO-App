import React from "react";
import clsx from "clsx";
import classes from "./LoadingSpinner.module.css";
import Icons from "../../../icons";

const SIZE_CLASSES = {
  sm: classes.sm,
  md: classes.md,
  lg: classes.lg,
} as const;

export interface LoadingSpinnerProps {
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
  text?: string;
  fullHeight?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  fullHeight = true,
  text,
}) => {
  const wrapperClassName = clsx(
    classes.wrapper,
    fullHeight && classes.full_height,
    className
  );

  const spinnerClassName = clsx(classes.spinner, SIZE_CLASSES[size]);

  return (
    <div className={wrapperClassName} role="status" aria-live="polite">
      <Icons.LoadingIcon className={spinnerClassName} />
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
