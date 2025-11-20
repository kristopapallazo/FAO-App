import { useCallback, useState, type FC } from "react";
import { ArrowLeftIcon } from "../../../../icons";
import classes from "./LatestEventsSection.module.css";
import EventsCard from "./EventsCard";
import type { Event } from "../../../../types/dto.types";

const LATEST_EVENTS: Event[] = [
  { id: 1, title: "Lorem 1", date: "2024-06-01", statusId: 1 },
  { id: 2, title: "Lorem 2", date: "2024-06-02", statusId: 2 },
  { id: 3, title: "Lorem 3", date: "2024-06-03", statusId: 3 },
  { id: 4, title: "Lorem 4", date: "2024-06-04", statusId: 1 },
  { id: 5, title: "Lorem 5", date: "2024-06-04", statusId: 2 },
  { id: 6, title: "Lorem 6", date: "2024-06-04", statusId: 3 },
  { id: 7, title: "Lorem 7", date: "2024-06-04", statusId: 1 },
  { id: 8, title: "Lorem 8", date: "2024-06-04", statusId: 2 },
  { id: 9, title: "Lorem 9", date: "2024-06-04", statusId: 3 },
];

const LatestEventsSection: FC = () => {
  const [latestEvents, setLatestEvents] = useState<Event[]>(
    LATEST_EVENTS.slice(0, 4)
  );
  const [isSeeAll, setIsSeeAll] = useState<boolean>(false);

  const events = latestEvents.map((event) => (
    <EventsCard key={event.id} {...event} />
  ));

  const onHandleSeeAll = useCallback(() => {
    if (isSeeAll) {
      setLatestEvents(LATEST_EVENTS.slice(0, 4));
    } else {
      setLatestEvents(LATEST_EVENTS);
    }
    setIsSeeAll((prev) => !prev);
  }, [isSeeAll]);

  console.log("latestEvents :, isSeeAll>> ", latestEvents, isSeeAll);

  return (
    <div className={classes.latest_events_section}>
      <div className={classes.top_section}>
        <span className={"section_header_title"} style={{ margin: 12 }}>
          Latest 4 Events
        </span>
        <button className={classes.bttn} onClick={onHandleSeeAll}>
          {isSeeAll ? "Latest" : "See All"} <ArrowLeftIcon />
        </button>
      </div>

      <div className={classes.events_list}>{events}</div>
    </div>
  );
};

export default LatestEventsSection;
