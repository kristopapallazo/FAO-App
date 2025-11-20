import { memo, type FC } from "react";
import MainCard from "../../../ui/Cards/MainCard/MainCard";
import type { Event } from "../../../../types/dto.types";
import { DotsIcon } from "../../../../icons";
import classes from "./EventsCard.module.css";
import Badge from "../../../ui/badge/Badge";
import { EventStatusDictionaryEnum } from "../../../../data";

const EventsCard: FC<Event> = memo((event) => {
  const { title, date, statusId } = event;

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });
  const year = dateObj.getFullYear();
  const formattedDate = `${month} ${day}${getOrdinalSuffix(day)} ${year}`;

  return (
    <MainCard style={{ height: 73, padding: "14px 24px", borderRadius: 4 }}>
      <span className={classes.section}>
        <span className={classes.title}>{title}</span>
        <span>
          <DotsIcon />
        </span>
      </span>
      <span className={classes.section}>
        <span className={classes.date}>{formattedDate}</span>
        <Badge variant={EventStatusDictionaryEnum[statusId].status}>
          {EventStatusDictionaryEnum[statusId].label}
        </Badge>
      </span>
    </MainCard>
  );
});

export default EventsCard;
