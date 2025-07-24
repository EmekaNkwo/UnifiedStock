import Dexie from "dexie";

export interface InventoryItem {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  isSynced?: boolean;
}

export class InventoryDB extends Dexie {
  inventory: Dexie.Table<InventoryItem, number>;

  constructor() {
    super("inventoryDB");
    this.version(1).stores({
      inventory: "++id, name, quantity, price, isSynced",
    });
    this.inventory = this.table("inventory");
  }
}

export const db = new InventoryDB();
