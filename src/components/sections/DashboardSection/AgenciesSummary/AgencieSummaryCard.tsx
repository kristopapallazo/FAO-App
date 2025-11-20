import { memo, useMemo, type FC } from "react";
import type { SummaryData } from "../../../../types/dto.types";
import MainCard from "../../../ui/Cards/MainCard/MainCard";
import classes from "./AgencieSummaryCard.module.css";
import clsx from "clsx";

interface AgencieSummaryCardProps {
  card: SummaryData;
  icon: React.ReactNode;
}

const AgencieSummaryCard: FC<AgencieSummaryCardProps> = memo(
  ({ card, icon }) => {
    const { id, title, value, color } = card;

    const specialStyle = useMemo(
      () => color?.includes("ffffff") || id === 3,
      [color, id]
    );

    return (
      <MainCard
        className={clsx(classes.card, {
          [classes.special_style]: specialStyle,
        })}
        style={{ backgroundColor: color || "var(--card-bg)" }}
      >
        <div className={classes.icon_wrapper}>{icon}</div>
        <div className={classes.title}>{title}</div>
        <div className={classes.value}>{value}</div>
      </MainCard>
    );
  }
);

export default AgencieSummaryCard;
