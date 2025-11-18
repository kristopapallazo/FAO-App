// #region Dto
export interface User {
  name: string;
  role: string;
}
export interface TeamMember {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  status: Status["id"];
  permission: Permission["id"];
  createdAt: string;
}
export interface Status {
  id: number;
  label: "Active" | "Pending" | "Trashed";
}
export interface Permission {
  id: number;
  label: "Read" | "Write" | "Delete";
  fullLabel: string;
}
// #endregion Dto

export const user: User = { name: "John Doe", role: "Project Manager" };

// #region Constants
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Alice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 1,
    createdAt: "",
  },
];

export const ALL_STATUSES: Status[] = [
  { id: 1, label: "Active" },
  { id: 2, label: "Pending" },
  { id: 3, label: "Trashed" },
];

export const ALL_PERMISSIONS: Permission[] = [
  { id: 1, label: "Read", fullLabel: "Read-Only" },
  { id: 2, label: "Write", fullLabel: "Can Edit" },
  { id: 3, label: "Delete", fullLabel: "Can Delete" },
];
// #endregion Constants

/* Todo: This need to be normalized and consume by the ctx */
export const STATUSES_ALL_IDS = [1, 2, 3];
export const STATUS_DICTIONARY = { 1: "Active", 2: "Pending", 3: "Trashed" };
export const PERMISSIONS_ALL_IDS = [1, 2, 3];
export const PERMISSION_DICTIONARY = {
  1: "Active",
  2: "Pending",
  3: "Trashed",
};
