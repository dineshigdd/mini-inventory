'use client';


import { Order  } from "@prisma/client";
import React, { useState , useRef , MouseEvent } from 'react';
import OrderItem from '@/components/orderItem';
import { handleMouseOver , handleMouseDown , handleMouseOut  } from '@/utlltiy/index';

interface OrderListrops {
  orderList: Order[];
  getSelectedItem: ( itemId: number | null ) => void;
  deleteOrderItem:()=> void;
}


export default function OrderList( {  orderList, getSelectedItem , deleteOrderItem }: OrderListrops){
 
  const listRef = useRef<(HTMLLIElement | null )[]>([]);
  const [ selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item for highlighting
  const [ selectedMouseOverIndex , setSelectedMouseOverIndex] = useState<number | null>(null)
  const [ isItemselected, setIsItemselected ] = useState(false); 
 
  
  const setRef = (index: number) => (element: HTMLLIElement | null) => listRef.current[index] = element;
  
  return (
    <ul className="h-40 overflow-auto bg-slate-100 p-2 border border-gray-300 min-w-[200px]">       
       { orderList.map( ( item )=> <OrderItem  
          key={ item.itemId }
          item={ item }                   
          setRef={ setRef }   
          deleteOrderItem={ deleteOrderItem }
          handleMouseOver={ handleMouseOver({
            itemId:item.itemId,
            listRef,
            selectedIndex, 
            isItemselected,
            setSelectedMouseOverIndex,
                          
          })}

          handleMouseOut = { handleMouseOut({
            itemId:item.itemId,
            listRef,
            selectedIndex,
            isItemselected, 
          })}           

          handleMouseDown={ handleMouseDown({
            itemId:item.itemId,
            listRef,
            selectedIndex,
            selectedMouseOverIndex,
            getSelectedItem,
            setIsItemselected,
            setSelectedIndex
          })} 
          
       
       
       />)}
    </ul>
  );
}