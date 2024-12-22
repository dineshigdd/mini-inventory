import React , { MouseEvent }  from 'react';



interface OrderItem {
  id: number;
  name: string;
  quantity_in_hand: number;
  category_code: string;
  date: Date;
};

interface OrderItemProps {
    item: OrderItem;
    setRef: (itemId: number) => (instance: HTMLLIElement | null) => void;
    handleMouseOver:(event: MouseEvent<HTMLLIElement>)=> void;
    handleMouseOut : (event: MouseEvent<HTMLLIElement>)=> void;
    handleMouseDown: (event: MouseEvent<HTMLLIElement>)=> void;
}



export default function OrderItem({ 
    item ,  
    setRef,
    handleMouseOver, 
    handleMouseOut ,    
    handleMouseDown , 
  }: OrderItemProps) { 
  console.log( item.id)
  return (    
    
    <li      
      key= {item.id }          
      ref= { setRef( item.id )}
      onMouseOver={ handleMouseOver }
      onMouseOut={ handleMouseOut }      
      onMouseDown={ handleMouseDown }
    >
    <div>{item.name}       
          <button className='mx-3 px-1 bg-red-400'>del</button>                
    </div>
   
  </li>  
  );
}
