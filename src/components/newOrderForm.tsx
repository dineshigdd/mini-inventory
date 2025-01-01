'use client';

import { useState } from "react";
import OrderList from "./orderList";
import { Item } from "@prisma/client";

interface ItemOrderProps{
    orderList: Item[];
    quantityOrder:number;
    selectedOrderListIndex:number | null;
    setQuantityOrder: React.Dispatch<React.SetStateAction<number>>;
   
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>  {
  event.preventDefault();
}

export default function ItemOrder({ 
  orderList, 
  quantityOrder, 
  setQuantityOrder, 
  selectedOrderListIndex }: ItemOrderProps){
    return(
        <form onSubmit={ handleSubmit } >
                          <label className="mx-2">Quantity to order</label>
                            {(
                              () => {
                                    const selectedItem = orderList.find(item => item.id === Number(selectedOrderListIndex)) ;
                                    // Use 0 as the default value.nullish coalescing operator
                                    // const quantity = selectedItem?.quantity_in_hand ?? 0 ;
                                    // console.log( "quantity and  selectedOrderListIndex")
                                    // console.log( quantity + " " + selectedOrderListIndex )
                                  return (
                                    <>
                                      <input
                                          name="quantity"
                                          className="w-10 text-center rounded-sm" type='text' 
                                          value={ quantityOrder  }
                                        /> 
                                        <button 
                                            onClick={ ()=>setQuantityOrder( quantityOrder + 1)  } 
                                            className="bg-gray-500 w-fit m-2 px-2">+</button>
                                        <button 
                                            onClick={ ()=>setQuantityOrder( quantityOrder - 1) } 
                                          className="bg-gray-500 w-fit m-2 px-2">-</button> 
                                    </>  
                                  );
                                })()                           
                                
                                }                                        
                          
                          <button 
                                  className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" 
                                  type="button">submit
                          </button>    
                      </form>
    )
}