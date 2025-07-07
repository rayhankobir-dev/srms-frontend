export type Role = "ADMIN" | "MANAGER" | "STAFF";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type ITable = {
  _id: string;
  name: string;
  status: "RESERVED" | "FREE";
  assignedStaff: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  updatedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ISettings = {
  tableCount: number;
  taxPercentage: number;
  currency: string;
  inventoryInsufficencyAt: number;
};
