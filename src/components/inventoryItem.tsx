// src/components/InventoryItemComponent.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface InventoryItem {
    id: number,
    name : string;
    quantity_in_hand: number;
    category_code : string;
    date:Date,
}

const InventoryItem: React.FC<{ item: InventoryItem }> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INVENTORY_ITEM',
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li ref={drag as unknown as React.Ref<HTMLLIElement>} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.name}
    </li>
  );
};

export default InventoryItem;
