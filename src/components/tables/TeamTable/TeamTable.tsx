import {
  TEAM_MEMBERS,
  TeamPermissionDictionaryEnum,
  TeamStatusDictionaryEnum,
} from "../../../data";
import type { TeamMember } from "../../../types/dto.types";
import {
  EditIcon,
  EyeIcon,
  TicIcon,
  TrashIcon,
  UserIcon,
} from "../../../icons";
import { IconOnlyBttn } from "../../ui/button";
import DynamicTable, {
  type Column,
} from "../../ui/table/DynamicTable/DynamicTable";
import Badge from "../../ui/badge/Badge";

const TeamTable = () => {
  // const columns: Column<TeamMember>[] = [];
  const data: TeamMember[] = TEAM_MEMBERS;
  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item) => <span>{item.name}</span>,
    },
    {
      key: "surname",
      label: "Surname",
      sortable: true,
      render: (item) => <span>{item.surname}</span>,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item) => <span>{item.email}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      render: (item) => <span>{item.phone}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => {
        const { status } = item;
        return (
          <Badge
            variant={TeamStatusDictionaryEnum[status].status}
            addPointerStatus={true}
          >
            {TeamStatusDictionaryEnum[status].label}
          </Badge>
        );
      },
    },
    {
      key: "permission",
      label: "Permission",
      render: (item) => {
        const { permission } = item;
        return (
          <Badge
            variant={TeamPermissionDictionaryEnum[permission].status}
            wrapperStyle={{}}
            icon={
              TeamPermissionDictionaryEnum[permission].status === "warning" ? (
                <UserIcon />
              ) : (
                <TicIcon />
              )
            }
          >
            {TeamPermissionDictionaryEnum[permission].label}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      render: (item) => <span>{item.createdAt}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: () => {
        const onView = () => {
          alert("Opening Modal to view item...");
        };
        const onDelete = () => {
          alert("Deleting item...");
        };
        const onEdit = () => {
          alert("Opening Modal to edit item...");
        };
        return (
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
            <IconOnlyBttn icon={<EyeIcon />} onClick={onView} />
            <IconOnlyBttn icon={<EditIcon />} onClick={onDelete} />
            <IconOnlyBttn icon={<TrashIcon />} onClick={onEdit} />
          </span>
        );
      },
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
        defaultSort={{ key: "surname", direction: "asc" }}
        // defaultSelectedRowKeys={[1, 2]}
      />
    </div>
  );
};

export default TeamTable;
