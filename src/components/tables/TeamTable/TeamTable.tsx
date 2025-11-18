import { TEAM_MEMBERS, type TeamMember } from "../../../data";
import DynamicTable, {
  type Column,
} from "../../ui/table/DynamicTable/DynamicTable";

const TeamTable = () => {
  const columns: Column<TeamMember>[] = [];
  const data: TeamMember[] = TEAM_MEMBERS;

  return (
    <div style={{ height: "100%" }}>
      <DynamicTable<TeamMember> columns={columns} data={data} />
    </div>
  );
};

export default TeamTable;
