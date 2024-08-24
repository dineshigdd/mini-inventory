
'use client'

import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import { useState , useRef , MouseEvent, ReactNode, MouseEventHandler } from "react";
import InventoryItem from "./inventoryItem";
import  Draggable  from '@/utlltiy/draggable';
import { handleMouseOver , handleMouseDown , handleMouseOut } from '@/utlltiy/index';


interface InventoryProps {
  inventory: Item[];
  getSelectedItem: ( itemId: number | null ) => void
}



export default function Inventory( { inventory  , getSelectedItem }: InventoryProps ){

    const listRef = useRef<(HTMLLIElement | null )[]>([]);
    const [ selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item for highlighting
    const [ selectedMouseOverIndex , setSelectedMouseOverIndex] = useState<number | null>(null)
    const [ isItemselected, setIsItemselected ] = useState(false); 
  

    const setRef = (index: number) => (element: HTMLLIElement | null) => {
      
        listRef.current[index] = element;
      };
         
      

      // const handleMouseOver = ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> {
      //     const item = listRef.current[ itemId ];
      //     setSelectedMouseOverIndex( itemId )
          
      //     if( itemId && item?.style  ){
      //           item.style.backgroundColor = 'lightgray';         
      //     }
      
      //     if( itemId && item?.style && isItemselected ){
      //       if( selectedIndex !== itemId ){
      //         item.style.backgroundColor = 'lightgray';
      //       }else{
      //         item.style.backgroundColor = 'gray';
      //       }
      //   }
      
         
      // } 
      
      // const handleMouseOut = ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> {
      //   const item = listRef.current[ itemId ];
          
      
      //   if( itemId && item?.style && !isItemselected ) {
      //         item.style.backgroundColor = '';      
      //   }
      
      //   if( itemId && item?.style && isItemselected ){
      //     if( selectedIndex !== itemId ){
      //       item.style.backgroundColor = '';
      //     }else{
      //       item.style.backgroundColor = 'gray';
      //     }
      // }
      // } 
      
      // const handleMouseDown = (itemId: number) =>(event: MouseEvent<HTMLLIElement>)=> {
        
      //   // handleClick(itemId);
      //   setSelectedIndex(itemId); // Update the selected item index for highlighting
      //   setIsItemselected( true )
        
        
      //   if ( selectedIndex == null ){             
      //         getSelectedItem( selectedMouseOverIndex)
      //   }else{
      //         getSelectedItem( itemId )
      //   }
          
      //   listRef.current.forEach((item, idx) => {
      //     if (item) {
      //       item.style.backgroundColor = idx === itemId ? 'gray' : ''; // Set background to gray for selected item
      //     }
      //   });
      // };
    

      // const handleClick = (itemId: number) => {
        
      //   setSelectedIndex(itemId); // Update the selected item index for highlighting
      //   setIsItemselected( true )
        
        
      //   if ( selectedIndex == null ){             
      //         getSelectedItem( selectedMouseOverIndex)
      //   }else{
      //         getSelectedItem( itemId )
      //   }
          
      //   listRef.current.forEach((item, idx) => {
      //     if (item) {
      //       item.style.backgroundColor = idx === itemId ? 'gray' : ''; // Set background to gray for selected item
      //     }
      //   });
      // }; 


  

    return (
        <ul className="h-40 overflow-auto bg-slate-100 p-2">  
                
                  {
                    inventory.map( item => <Draggable 
                      key={ item.id }
                      itemId={ item.id }  
                      setRef={ setRef }
                      ><InventoryItem                                 
                            item={ item }                      
                            handleMouseOver={ ()=>handleMouseOver({
                              itemId:item.id,
                              listRef,
                              selectedIndex, 
                              isItemselected,
                              setSelectedMouseOverIndex,
                                             
                            })}

                            handleMouseOut = { ()=>handleMouseOut({
                              itemId:item.id,
                              listRef,
                              selectedIndex,
                              isItemselected, 
                            }) }           
                                      
                            handleMouseDown={ ()=>handleMouseDown({
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