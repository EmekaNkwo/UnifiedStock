"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   useGetInventoryQuery,
//   useAddInventoryItemMutation,
// } from "@/store/apiSlice";
import { db, InventoryItem } from "@/lib/db";

const remoteItems: InventoryItem[] = [];

export default function InventoryPage() {
  const query = useParams();
  const { tenant } = query;
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  //   const { data: remoteItems, refetch } = useGetInventoryQuery(tenant as string);
  //   const [addItemMutation] = useAddInventoryItemMutation();

  // Load from local DB on mount
  useEffect(() => {
    const loadLocalData = async () => {
      const localItems = await db.inventory.toArray();
      setItems(localItems);
    };
    loadLocalData();
  }, []);

  // Sync with server when online
  useEffect(() => {
    if (remoteItems) {
      // Update local DB with server data
      db.inventory.clear();
      db.inventory.bulkAdd(remoteItems as InventoryItem[]);
      setItems(remoteItems);
    }
  }, [remoteItems]);

  const handleAddItem = async () => {
    // Add to local DB immediately
    const localId = await db.inventory.add({ ...newItem, isSynced: false });
    const localItem = { ...newItem, id: localId, isSynced: false };
    setItems((prev) => [...prev, localItem]);

    try {
      // Try to sync with server
      //   await addItemMutation({ tenant: tenant as string, item: newItem });
      // Update sync status if successful
      await db.inventory.update(localId, { isSynced: true });
    } catch (err) {
      console.error("Sync failed, will retry later");
    }

    setNewItem({ name: "", quantity: 0, price: 0 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{tenant} Inventory</h1>

      <div className="mb-6">
        <div className="grid grid-cols-4 gap-4 mb-2">
          <Input
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: +e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
          />
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Inventory Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-b py-2">
              {item.name} - {item.quantity} x ${item.price}
              {!item.isSynced && (
                <span className="ml-2 text-orange-500">(Syncing...)</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
