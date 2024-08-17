'use client'

import Link from "next/link";
import * as actions from '@/actions';
import { useEffect, useState , useRef , MouseEvent } from "react";
import ItemCreatePage from "./items/new/page";
import Inventory from "@/components/inventory";
import { Suspense } from "react";
import { useRouter } from 'next/navigation';

interface Item {
    id: number,
    name : string;
    quantity_in_hand: number;
    category_code : string;
    date:Date,
}


export default  function Home() {

  const [ inventory, setInventory ] = useState<Item[]>([]);

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

const getSelectedItem = ( itemId: number | null )=>{
  setSelectedIndex( itemId )
  console.log( itemId )
}


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
                  <Suspense fallback={<Loading />} >
                       <Inventory 
                            inventory={ inventory }
                            getSelectedItem={ getSelectedItem }
                      />
                  </Suspense>
                  {/* <ul className="h-40 overflow-auto bg-slate-100 p-2">  

                     { inventory.map( (item) =>
                        <li  
                            ref={ setRef(item.id)} 
                            onMouseOver={ handleMouseOver( item.id ) } 
                            onMouseOut={ handleMouseOut( item.id )}
                            onClick={ handleClick(item.id)}
                            key={ item.id }>{ item.name }                            
                        </li>)}
                  </ul>                 */}
                </div>
              </div>

              <div className="flex flex-col justify-center mt-5">
                  <div className="flex justify-between">
                     <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Send order</button>  
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Covert to Image</button>                                                           
                  </div>
              <div className="border-y-2 border-y-indigo-500 mt-2 py-2">
                  <h1><strong>Available Items Management</strong></h1><br/>
                  <div className="flex justify-between -mt-4">                      
                      <Link  href="/items/new" className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full">New Item</Link> 
                      <Link href={ `/items/${ selectedIndex }`} className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">View Item</Link>
                  </div>
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

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
