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

export const BOTTOM_SECTION_DUMMY_CHART_DATA = [
  { name: "Dec 24", value: 30000 },
  { name: "Dec 25", value: 35000 },
  { name: "Dec 26", value: 28000 },
  { name: "Dec 27", value: 31000 },
  { name: "Dec 28", value: 42000 },
  { name: "Dec 29", value: 23000 },
  { name: "Dec 30", value: 35000 },
  { name: "Dec 31", value: 30000 },
  { name: "Jan 1", value: 45000 },
  { name: "Jan 2", value: 35000 },
  { name: "Jan 3", value: 30000 },
  { name: "Jan 4", value: 41000 },
  { name: "Jan 5", value: 35000 },
];

export const AGENCIES_CHART_DATA = [
  { value: 0 },
  { value: 10 },
  { value: 88 },
  { value: 20 },
  { value: 90 },
  { value: 30 },
  { value: 89 },
  { value: 95 },
];
