'use client';


import { Item } from "@prisma/client";
import React, { useState , useRef , MouseEvent } from 'react';
import OrderItem from '@/components/orderItem';
import { handleMouseOver , handleMouseDown , handleMouseOut  } from '@/utlltiy/index';

interface OrderListrops {
  orderList: Item[];
  getSelectedItem: ( itemId: number | null ) => void
}


export default function OrderList( {  orderList, getSelectedItem }: OrderListrops){
 
  const listRef = useRef<(HTMLLIElement | null )[]>([]);
  const [ selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item for highlighting
  const [ selectedMouseOverIndex , setSelectedMouseOverIndex] = useState<number | null>(null)
  const [ isItemselected, setIsItemselected ] = useState(false); 
 
  
  const setRef = (index: number) => (element: HTMLLIElement | null) => listRef.current[index] = element;
  
  return (
    <ul className="h-40 overflow-auto bg-slate-100 p-2 border border-gray-300">       
       { orderList.map( ( item )=> <OrderItem  
        key={ item.id }
        item={ item }                   
        setRef={ setRef }   
        handleMouseOver={ handleMouseOver({
          itemId:item.id,
          listRef,
          selectedIndex, 
          isItemselected,
          setSelectedMouseOverIndex,
                         
        })}

        handleMouseOut = { handleMouseOut({
          itemId:item.id,
          listRef,
          selectedIndex,
          isItemselected, 
        })}           

        handleMouseDown={ handleMouseDown({
          itemId:item.id,
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