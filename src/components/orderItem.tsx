import React , { MouseEvent, MouseEventHandler, useEffect }  from 'react';



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
    deleteOrderItem: () => void;
}

export default function OrderItem({ 
    item ,  
    setRef,
    handleMouseOver, 
    handleMouseOut ,    
    handleMouseDown, 
    deleteOrderItem,
  }: OrderItemProps) { 

  return (    
    <div>
    <span className='cursor-pointer'     
      key= {item.id }          
      ref= { setRef( item.id )}
      onMouseOver={ handleMouseOver }
      onMouseOut={ handleMouseOut }      
      onMouseDown={ handleMouseDown }
    >
    { item.name}       
       
    </span>                                                                            
   <span>
      <button onClick={ deleteOrderItem } className='mx-2 px-2 bg-red-400 rounded-md'>del</button>  
   </span> 
                    
   </div>  
  );
}
