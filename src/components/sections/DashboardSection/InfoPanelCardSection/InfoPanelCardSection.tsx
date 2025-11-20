import { memo, type FC, useState } from "react";
import MainCard from "../../../ui/Cards/MainCard/MainCard";
import Modal from "../../../ui/modal/Modal";
import classes from "./InfoPanelCardSection.module.css";
import { ArrowNarrowDownIcon, ExpandIcon } from "../../../../icons";

interface CardInfo {
  id: number;
  title: string;
  value: string | number;
  percentage: number;
  lastWeekValue: number;
}

const ALL_CARDS_INFO: CardInfo[] = [
  {
    id: 1,
    title: "Total Events",
    value: 40.55,
    percentage: 59,
    lastWeekValue: 84.7,
  },
  {
    id: 2,
    title: "Total Agencies",
    value: 240.11,
    percentage: 0.5,
    lastWeekValue: 242.99,
  },
];

const InnerCard: FC<CardInfo> = memo(
  ({ title, value, percentage, lastWeekValue }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fullValue = `${value}K`;
    const fullPercentage = `${percentage}%`;
    const fullLastWeekValue = `Last week ${lastWeekValue}K`;

    const handleExpandClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <div className={classes.inner_card}>
          <span className={classes.right_separator}></span>
          <span className={classes.top_section}>
            <span className={classes.title}>{title}</span>
            <span
              className={classes.expand_icon_wrapper}
              onClick={handleExpandClick}
            >
              <ExpandIcon />
            </span>
          </span>
          <span className={classes.bottom_section}>
            <div>
              <span className={classes.value}>{fullValue}</span>
              <span className={classes.percentage_wrapper}>
                <ArrowNarrowDownIcon />
                <span className={classes.percentage}>{fullPercentage}</span>
              </span>
            </div>
            <div className={classes.last_week_value}>{fullLastWeekValue}</div>
          </span>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={classes.modal_header}>
            <h2 className={classes.modal_title}>{title}</h2>
          </div>
          <div className={classes.modal_content}>
            <div className={classes.stat_row}>
              <span className={classes.stat_label}>Current Value</span>
              <span className={classes.stat_value}>{fullValue}</span>
            </div>
            <div className={classes.percentage_section}>
              <span className={classes.percentage_badge}>
                <ArrowNarrowDownIcon />
                <span className={classes.percentage_text}>
                  {fullPercentage}
                </span>
              </span>
              <span className={classes.comparison_text}>
                {fullLastWeekValue}
              </span>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

const InfoPanelCardSection = () => {
  const innerCards = ALL_CARDS_INFO.map((cardInfo) => {
    return <InnerCard key={cardInfo.id} {...cardInfo} />;
  });

  return (
    <MainCard height={143} className={classes.info_panel}>
      {innerCards}
    </MainCard>
  );
};

export default InfoPanelCardSection;
