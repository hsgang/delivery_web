"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type MenuItem = { 
    name: string; 
    qty: number;
    price: number;
};

interface OrderState {
  region: string;
  items: MenuItem[];
  setRegion: (r: string) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (item: { name: string; price: number }) => void;
  clearItems: () => void;
}

const OrderContext = createContext<OrderState | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<string>("");
  const [items, setItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.name === item.name);
      if (exist) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (item: { name: string; price: number }) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.name === item.name && i.price === item.price) {
            // qty가 1이면 제거, 아니면 1 감소
            return i.qty > 1 ? { ...i, qty: i.qty - 1 } : null;
          }
          return i;
        })
        .filter((i): i is MenuItem => i !== null)
    );
  };

  const clearItems = () => setItems([]);

  return (
    <OrderContext.Provider
      value={{ region, items, setRegion, addItem, removeItem, clearItems }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("OrderContext must be used within OrderProvider");
  return ctx;
}