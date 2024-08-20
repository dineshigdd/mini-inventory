// src/components/OrderList.tsx
import React from 'react';
import { useDrop } from 'react-dnd';

interface Item {
    id: number;
    name : string;
    quantity_in_hand: number;
    category_code : string;
    date:Date,
}

interface OrderListProps {
  items: Item[];
  addItem: (item: Item) => void;
}

const OrderList: React.FC<OrderListProps> = ({ items, addItem }) => {
  const [ , drop] = useDrop(() => ({
    accept: 'INVENTORY_ITEM',
    drop: (item: { 
        id: number;
        name :string
        quantity_in_hand: number;
        category_code : string;
        date:Date,
    }) => {
      addItem(item);
    },
  }));


  return (
    <ul
      className="h-40 overflow-auto bg-slate-100 p-2 border border-gray-300"
      ref={drop as unknown as React.Ref<HTMLUListElement>}
    >
      {items.length === 0 ? (
        <li>No items in the order list.</li>
      ) : (
        <li>{ items.length.toString() }</li>
      )}
    </ul>
  );
};
//   return (
//     <ul className="h-40 overflow-auto bg-slate-100 p-2" ref={drop as unknown as React.Ref<HTMLUListElement>}>
//       {items.map((item) => (
//         <li key={item.id}>{item.name}</li>
//       ))}
//     </ul>
//   );
// };

export default OrderList;
