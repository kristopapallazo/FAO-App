import { TEAM_MEMBERS } from "../../../data";
import type { TeamMember } from "../../../types/dto.types";
import { SettingIcon } from "../../../icons";
import { PrimaryBttn } from "../../ui/button";
import DynamicTable, {
  type Column,
} from "../../ui/table/DynamicTable/DynamicTable";

const TeamTable = () => {
  // const columns: Column<TeamMember>[] = [];
  const data: TeamMember[] = TEAM_MEMBERS;
  const columns: Column<TeamMember>[] = [
    { key: "name", label: "Name", render: (item) => <span>{item.name}</span> },
    {
      key: "surname",
      label: "Surname",
      render: (item) => <span>{item.surname}</span>,
    },
    {
      key: "email",
      label: "Email",
      render: (item) => <span>{item.email}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (item) => <span>{item.phone}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <span>{item.status}</span>,
    },
    {
      key: "permission",
      label: "Permission",
      render: (item) => <span>{item.permission}</span>,
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item) => <span>{item.createdAt}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            height: "100%",
            width: "100%",
          }}
        >
          <PrimaryBttn
            variant="secondary"
            icon={<SettingIcon />}
            withoutStyle={true}
          />
          <PrimaryBttn
            variant="secondary"
            icon={<SettingIcon />}
            withoutStyle
          />
          <PrimaryBttn
            variant="secondary"
            icon={<SettingIcon />}
            withoutStyle
          />
        </span>
      ),
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      <DynamicTable<TeamMember>
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
        canSelectRow={true}
        onRowSelect={(selectedKeys) => console.log("Selected:", selectedKeys)}
        // defaultSelectedRowKeys={[1, 2]}
      />
    </div>
  );
};

export default TeamTable;
