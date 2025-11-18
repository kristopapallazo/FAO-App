import type { FC } from "react";
import MainCard from "../components/ui/Cards/MainCard/MainCard";
import TeamTable from "../components/tables/TeamTable/TeamTable";

const TeamPage: FC = () => {
  return (
    <div style={{ height: "100%" }}>
      {/* On large screen card will take the height from the Figma design, on small screen it will take full height */}
      <MainCard style={{ maxHeight: 691 }}>
        <TeamTable />
      </MainCard>
    </div>
  );
};

export default TeamPage;
