import type { CSSProperties, ReactNode } from "react";
import classes from "./MainCard.module.css";
import clsx from "clsx";

interface MainCardProps {
  height?: string | number;
  width?: string | number;
  style?: CSSProperties;
  color?: CSSProperties["backgroundColor"];
  children?: ReactNode;
  className?: string;
}

/* Card take full height and width by default, configurable via props */

const MainCard: React.FC<MainCardProps> = ({
  height = "100%",
  width = "100%",
  color = "#ffffff",
  style,
  children,
  className = "",
}) => {
  return (
    <div
      className={clsx(classes.card, className)}
      style={{ height, width, backgroundColor: color, ...style }}
    >
      {children}
    </div>
  );
};

export default MainCard;
