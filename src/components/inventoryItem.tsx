// src/components/InventoryItemComponent.tsx
import React from 'react';
import { useState , useRef , MouseEvent } from "react";
import { useDrag } from 'react-dnd';

interface InventoryItem {
  id: number;
  name: string;
  quantity_in_hand: number;
  category_code: string;
  date: Date;
};

interface InventoryItemProps {
item: InventoryItem;
handleMouseOver:( itemId: number ) => (event: MouseEvent<HTMLLIElement>)=> void;
handleMouseOut : ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> void;
handleClick: ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> void;
setRef: (itemId: number) => (instance: HTMLLIElement | null) => void;
}




// const InventoryItem: React.FC<{ item: InventoryItem }> = ({ item }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'INVENTORY_ITEM',
//     item: { item },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

export default function InventoryItem({ item, setRef ,handleMouseOver, handleMouseOut , handleClick }: InventoryItemProps) {

  // const listRef = useRef<(HTMLLIElement | null )[]>([]);

  // const setRef = (index: number) => (element: HTMLLIElement | null) > {
  //   listRef.current[index] = element;
  // };=

  return (
    <li 
      key= {item.id }
      ref={ setRef(item.id)}
      onMouseOver={ handleMouseOver( item.id )}
      onMouseOut={ handleMouseOut( item.id )}
      onClick= { handleClick( item.id )}
    >
    <p>{item.name}</p>
   
  </li>
  );
}
