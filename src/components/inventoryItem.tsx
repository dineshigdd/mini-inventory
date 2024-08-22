// src/components/InventoryItemComponent.tsx
import React from 'react';
import { MouseEvent } from "react";


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
    handleMouseDown:( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> void;
}



export default function InventoryItem({ 
    item ,  
    handleMouseOver, 
    handleMouseOut ,    
    handleMouseDown , 
  }: InventoryItemProps) { 
  
  return (    
    
    <li      
      key= {item.id }          
      onMouseOver={ handleMouseOver( item.id )}
      onMouseOut={ handleMouseOut( item.id )}      
      onMouseDown={ handleMouseDown( item.id )}
    >
    <p>{item.name}</p>
   
   
  </li>  
  );
}
