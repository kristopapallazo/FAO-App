import type { CSSProperties, ReactNode } from "react";
import classes from "./MainCard.module.css";

interface MainCardProps {
  height?: string | number;
  width?: string | number;
  style?: CSSProperties;
  color?: CSSProperties["backgroundColor"];
  children?: ReactNode;
}

/* Card take full height and width by default, configurable via props */

const MainCard: React.FC<MainCardProps> = ({
  height = "100%",
  width = "100%",
  color = "#ffffff",
  style,
  children,
}) => {
  return (
    <div
      className={classes.card}
      style={{ height, width, backgroundColor: color, ...style }}
    >
      {children}
    </div>
  );
};

export default MainCard;
