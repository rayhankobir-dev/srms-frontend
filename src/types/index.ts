export type Role = "ADMIN" | "MANAGER" | "STAFF";
export type MealType = "DINNER" | "LUNCH" | "SUPPER" | "BREAKFAST";

export type LinkedUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type IPricing = {
  unit: string;
  unitPrice: number;
  inventoryImpact: number;
};

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

export interface IStock {
  _id: string;
  itemName: string;
  storeIn: number;
  storeOut: number;
  carried: number;
  current: number;
  unit: string;
  createdBy: LinkedUser;
  updatedBy: LinkedUser;
  createdAt: string;
  updatedAt: string;
}

export interface IInventory {
  _id: string;
  itemName: string;
  newStock: number;
  inStock: number;
  cooked: number;
  sold: number;
  unit: string;
  createdBy: LinkedUser;
  updatedBy: LinkedUser;
  createdAt: string;
  updatedAt: string;
}

export interface IMenuItem {
  _id: string;
  itemName: string;
  thumbnail: string;
  meal: MealType;
  pricing: IPricing[];
  date: string;
  linkedInventory: Partial<IInventory>;
  createdBy: LinkedUser;
  updatedBy: LinkedUser;
  createdAt: string;
  updatedAt: string;
}

export type IOrderStatus = "RESERVED" | "CONFIRMED" | "CANCELLED";
export type IOrderItem = {
  menu: Partial<IMenuItem>;
  itemName: string;
  quantity: number;
  unitPrice: number;
  inventoryImpact: number;
};
export type IPaymentMethod = "CASH" | "CARD" | "ONLINE";
export type IPaymentStatus = "PAID" | "UNPAI" | "PARTIAL";

export interface IOrder {
  _id: string;
  meal: MealType;
  table: Partial<ITable>;
  menu: Partial<IMenuItem>;
  status: IOrderStatus;
  totalAmount: number;
  discountPercent: number;
  discountAmount: string;
  taxApplied: LinkedUser;
  taxAmount: LinkedUser;
  paymentMethod: IPaymentMethod;
  paymentStatus: IPaymentStatus;
  items: IMenuItem[];
  createdBy: LinkedUser;
  updatedBy: LinkedUser;
  createdAt: string;
  updatedAt: string;
}
