
'use client'

import { Item } from "@prisma/client";
import { useState , useRef , MouseEvent } from "react";


interface ItemProps{
    inventory: Item[]
}


export default function Inventory( { inventory  }: ItemProps ){

    const listRef = useRef<(HTMLLIElement | null )[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item
    const [ isItemselected, setIsItemselected ] = useState(false); 

    const setRef = (index: number) => (element: HTMLLIElement | null) => {
        listRef.current[index] = element;
      };
         
      const handleMouseOver = ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> {
          const item = listRef.current[ itemId ];
          
          if( itemId && item?.style  ){
                item.style.backgroundColor = 'lightgray';         
          }
      
          if( itemId && item?.style && isItemselected ){
            if( selectedIndex !== itemId ){
              item.style.backgroundColor = 'lightgray';
            }else{
              item.style.backgroundColor = 'gray';
            }
        }
      
         
      } 
      
      const handleMouseOut = ( itemId:number )=> (event: MouseEvent<HTMLLIElement>)=> {
        const item = listRef.current[ itemId ];
          
      
        if( itemId && item?.style && !isItemselected ) {
              item.style.backgroundColor = '';      
        }
      
        if( itemId && item?.style && isItemselected ){
          if( selectedIndex !== itemId ){
            item.style.backgroundColor = '';
          }else{
            item.style.backgroundColor = 'gray';
          }
      }
      } 
      
      const handleClick = (itemId: number) =>(event: MouseEvent<HTMLLIElement>)=> {
        setSelectedIndex(itemId); // Update the selected item index
        setIsItemselected( true )
        
        listRef.current.forEach((item, idx) => {
          if (item) {
            item.style.backgroundColor = idx === itemId ? 'gray' : ''; // Set background to gray for selected item
          }
        });
      }; 


    return (
        <ul className="h-40 overflow-auto bg-slate-100 p-2">  
                     { inventory.map( ( item ) =>
                        <li  
                            ref={ setRef(item.id)} 
                            onMouseOver={ handleMouseOver( item.id ) } 
                            onMouseOut={ handleMouseOut( item.id )}
                            onClick={ handleClick(item.id)}
                            key={ item.id }>{ item.name }                            
                        </li>)}
        </ul> 
    )
}