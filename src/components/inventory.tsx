
'use client'

import { Item } from "@prisma/client";
import { useState , useRef } from "react";
import InventoryItem from "./inventoryItem";
import { handleMouseOver , handleMouseDown , handleMouseOut , draggable as Draggable } from '@/utlltiy/index';


interface InventoryProps {
  inventory: Item[];
  getSelectedItem: ( itemId: number | null ) => void
}




export default function Inventory( { inventory  , getSelectedItem }: InventoryProps ){

    const listRef = useRef<(HTMLLIElement | null )[]>([]);
    const [ selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item for highlighting
    const [ selectedMouseOverIndex , setSelectedMouseOverIndex] = useState<number | null>(null)
    const [ isItemselected, setIsItemselected ] = useState(false); 
   
    
    const setRef = (index: number) => (element: HTMLLIElement | null) => listRef.current[index] = element;
         

    return (
        <ul className="h-40 overflow-auto bg-slate-100 p-2">  
                
                  {
                    inventory.map( item => <Draggable 
                      key={ item.id }
                      itemId={ item.id }  
                      setRef={ setRef }
                      ><InventoryItem                                 
                            item={ item }                      
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
                          />  </Draggable>)
                  }
                    
                 
                  
                     {/* { inventory.map( ( item ) =>
                        <li  
                            ref={ setRef(item.id)} 
                            onMouseOver={ handleMouseOver( item.id ) } 
                            onMouseOut={ handleMouseOut( item.id )}
                            onClick={ handleClick(item.id)}
                            key={ item.id }>{ item.name }                            
                        </li>)} */}
        </ul> 
    )
}