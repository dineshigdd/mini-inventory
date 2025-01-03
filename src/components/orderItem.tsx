import React , { MouseEvent, MouseEventHandler, useEffect }  from 'react';



interface OrderItem {
  id: number;
  itemId: number;
  name: string;
  quantity_order: number;
  category_code: string;
  orderDate: Date;
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
    <div className='flex justify-between'>
    <span className='cursor-pointer'     
      key= {item.itemId}          
      ref= { setRef( item.itemId )}
      onMouseOver={ handleMouseOver }
      onMouseOut={ handleMouseOut }      
      onMouseDown={ handleMouseDown }
    >
    { item.name}       
       
    </span>                                                                            
   <span>
      <button onClick={ deleteOrderItem } className='mx-2 text-sm px-2 bg-red-400 rounded-md'>del</button>  
   </span> 
                    
   </div>  
  );
}
