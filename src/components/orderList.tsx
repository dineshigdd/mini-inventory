// src/components/OrderList.tsx
import { Droppable } from '@/utlltiy/droppable';
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  quantity_in_hand: number;
  category_code: string;
  date: Date;
}

interface OrderListProps {
  orderList: Item[];  // Define the expected prop
  
}

export default function OrderList( { orderList }: OrderListProps){
 
  
  
  return (
    <ul className="h-40 overflow-auto bg-slate-100 p-2 border border-gray-300">       
       { orderList.map( item => <li>{ item.name }</li>)}   
    </ul>
  );
}