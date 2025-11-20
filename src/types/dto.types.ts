// #region Dto
export interface User {
  id: string;
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

export interface Event {
  id: number;
  title: string;
  date: string;
  statusId: number;
}

export type BadgeStatus = "success" | "warning" | "error";
export type EventStatusDictionary = {
  [key: number]: {
    label: "Unregistered" | "Registered" | "Cancelled";
    status: BadgeStatus;
  };
};
