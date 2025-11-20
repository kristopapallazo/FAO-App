import type {
  EventStatusDictionary,
  Permission,
  Status,
  SummaryData,
  TeamMember,
  TeamPermissionDictionary,
  TeamStatusDictionary,
  User,
} from "../types/dto.types";

export const DUMMY_USER: User = {
  id: "#john-doe",
  name: "John Doe",
  role: "Project Manager",
};

// #region Constants
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Alice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Blice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 3,
    name: "Clice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 1,
    createdAt: "2023-01-15",
  },
  {
    id: 5,
    name: "Olise",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 1,
    createdAt: "2023-01-15",
  },
  {
    id: 6,
    name: "Clark",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 7,
    name: "Elice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 1,
    createdAt: "2023-01-15",
  },
  {
    id: 8,
    name: "Ulice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 9,
    name: "Ilice",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 10,
    name: "Smith",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 11,
    name: "John",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 12,
    name: "Johnatan",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 13,
    name: "Mike",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 1,
    createdAt: "2023-01-15",
  },
  {
    id: 14,
    name: "Michael",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 15,
    name: "Michelle",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 16,
    name: "Marina",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 1,
    permission: 2,
    createdAt: "2023-01-15",
  },
  {
    id: 17,
    name: "Erica",
    surname: "Smith",
    email: "alice.smith@example.com",
    phone: "0693259358",
    status: 2,
    permission: 1,
    createdAt: "2023-01-15",
  },
];

export const ALL_STATUSES: Status[] = [
  { id: 1, label: "Active" },
  { id: 2, label: "Pending" },
  { id: 3, label: "Trashed" },
];

export const ALL_PERMISSIONS: Permission[] = [
  { id: 1, fullLabel: "Read", label: "Read-Only" },
  { id: 2, fullLabel: "Write", label: "Can Edit" },
  { id: 3, fullLabel: "Delete", label: "Can Delete" },
];
// #endregion Constants

export const DUMMY_SUMMARY_DATA: SummaryData[] = [
  { id: 1, title: "Events", value: 40, color: "var(--green)" },
  { id: 2, title: "Members", value: 79, color: "var(--orange)" },
  { id: 3, title: "Finished", value: 89, color: "#ffffff" },
];

/* Todo: This need to be normalized and consume by the ctx */
// export const STATUSES_ALL_IDS = [1, 2, 3];
// export const STATUS_DICTIONARY = { 1: "Active", 2: "Pending", 3: "Trashed" };
export const PERMISSIONS_ALL_IDS = [1, 2, 3];
export const PERMISSION_DICTIONARY = {
  1: "Active",
  2: "Pending",
  3: "Trashed",
};

export const TeamStatusDictionaryEnum: TeamStatusDictionary = {
  1: { label: "Active", status: "success" },
  2: { label: "Trashed", status: "error" },
  // 3: { label: "Trashed", status: "error" },
};
export const TeamPermissionDictionaryEnum: TeamPermissionDictionary = {
  1: { label: "Read-Only", status: "warning" },
  2: { label: "Can Edit", status: "success" },
  // 3: { label: "Can Delete", status: "error" },
};
export const EventStatusDictionaryEnum: EventStatusDictionary = {
  1: { label: "Registered", status: "success" },
  2: { label: "Unregistered", status: "warning" },
  3: { label: "Cancelled", status: "error" },
};
