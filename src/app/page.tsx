'use client'

import Link from "next/link";
import * as actions from '@/actions';
import { useEffect, useState , useRef , MouseEvent } from "react";
import ItemCreatePage from "./items/new/page";

/*interface InvemtoryItemProps {
    inventory: Item[]
    
}
*/
interface Item {
    id: number,
    name : string;
    quantity_in_hand: number;
    category_code : string;
     
}

export default  function Home() {

  const [ Inventory, setInventory ] = useState<Item[]>([]);
  const listRef = useRef<(HTMLLIElement | null )[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item
  const [ isItemselected, setIsItemselected ] = useState(false); 

   useEffect(() => {
        (async () => {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setInventory(data);
    })()
    
}, []);


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
  // setIsItemselected( false )
  

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
    <div className="grid place-items-center min-h-screen bg-blue-100"> {/** <div className="flex items-center justify-center min-h-screen"> */}
        <div>
          <div><h2>Mini Inventory control system</h2></div>
      
        <div className="w-[25rem] ">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="font-bold">New Order</div>
                   <ul className="h-40 overflow-auto bg-slate-100 p-2">
                      <li>Jelly Roll</li>
                      <li>Concha</li>
                      <li>Croissant</li>
                  </ul>                 
                </div>
                <div>
                  <div className="font-bold">Available Items</div>
                  <ul className="h-40 overflow-auto bg-slate-100 p-2">  
                     { Inventory.map( (item) =>
                        <li  
                            ref={ setRef(item.id)} 
                            onMouseOver={ handleMouseOver( item.id ) } 
                            onMouseOut={ handleMouseOut( item.id )}
                            onClick={ handleClick(item.id)}
                            key={ item.id }>{ item.name }                            
                        </li>)}
                  </ul>                
                </div>
              </div>

              <div className="flex flex-col justify-center mt-5">
                  <div className="flex justify-between">
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Covert to Image</button>
                      <Link  href="/items/new" className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full">New Item</Link>                     
                  </div >
                  <div className="flex justify-between">
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Send order</button>
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Edit</button>
                  </div>
                  </div>
              <div className="mt-5">
                <div className="font-bold">Previous order</div>
                  <ul className="h-40 overflow-auto bg-slate-100 p-2">
                    <li>Jelly Roll</li>
                    <li>Concha</li>
                    <li>Croissant</li>
                    <li>Jelly Roll</li>
                    <li>Concha</li>
                    <li>Croissant</li>     
                    <li>Jelly Roll</li>
                    <li>Concha</li>                                
                  </ul>
              </div>
        </div>
      </div>
  </div>
  );
}
