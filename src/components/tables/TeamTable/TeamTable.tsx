import DynamicTable, {
  type Column,
} from "../../ui/table/DynamicTable/DynamicTable";

interface Team {
  name: string;
  surname: string;
  email: string;
  phone: string;
  status: string;
  permission: string;
  createdAt: string;
}

const TeamTable = () => {
  const columns: Column<Team>[] = [];
  const data: Team[] = [];

  return (
    <div style={{ height: "100%" }}>
      <DynamicTable<Team> columns={columns} data={data} />
    </div>
  );
};

export default TeamTable;
