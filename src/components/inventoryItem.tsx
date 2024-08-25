import React , { MouseEvent }  from 'react';



interface InventoryItem {
  id: number;
  name: string;
  quantity_in_hand: number;
  category_code: string;
  date: Date;
};

interface InventoryItemProps {
    item: InventoryItem;
    handleMouseOver:(event: MouseEvent<HTMLLIElement>)=> void;
    handleMouseOut : (event: MouseEvent<HTMLLIElement>)=> void;
    handleMouseDown: (event: MouseEvent<HTMLLIElement>)=> void;
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
      onMouseOver={ handleMouseOver }
      onMouseOut={ handleMouseOut }      
      onMouseDown={ handleMouseDown }
    >
    <p>{item.name}</p>
   
   
  </li>  
  );
}
