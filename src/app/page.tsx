'use client'

import Link from "next/link";
import { useEffect, useState , useRef, useMemo  } from "react";
import Inventory from "@/components/inventory";
import { Suspense } from "react";
import OrderList from "@/components/orderList";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { handleMouseOver , handleMouseDown , handleMouseOut ,  droppable as Droppable  } from '@/utlltiy/index';



interface Item {
    id: number,
    name : string;
    quantity_in_hand: number;
    category_code : string;
    date:Date,
}

      

export default  function Home() {

  const [ inventory, setInventory ] = useState<Item[]>([]);
  const [ orderList, setOrderList] = useState<Item[]>([]);
  const listRef = useRef<(HTMLLIElement | null )[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item
  const [selectedOrderListIndex, setSelectedIOrderListIndex] = useState<number | null>(null); // State to track the selected item
  const [ isItemselected, setIsItemselected ] = useState(false); 
  const tempList = useMemo<number[]>(() => [], []);

   useEffect(() => {
        (async () => {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setInventory(data);
    })()
    
}, []);

const getSelectedItem = ( itemId: number | null )=>{
  setSelectedIndex( itemId ) 
}

const getOrderSelectedItem = ( itemId: number | null )=>{
  setSelectedIOrderListIndex( itemId ) 
}



const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

        
  if (over?.id === 'droppable') {   
       
       const draggedItem = inventory.find(item => item.id === active.id );      
       
    if (draggedItem) {         
      
        // if( tempList.length == 0 ){       
        //     tempList.push( draggedItem.id );
         
        
        // }
        // else{        
            let i = 0;
            while (i < tempList.length) {
              if (tempList[i] === draggedItem.id) {
                // if the item was found
                return; // Exit the loop early
              }
              i++;
            // }           
          
       }          
            
      tempList.push(  draggedItem.id )  
      setOrderList((prevItems) =>[...prevItems, draggedItem]);
    } 
  }
 
    
  
};



  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div className="grid place-items-center min-h-screen bg-blue-100"> {/** <div className="flex items-center justify-center min-h-screen"> */}
        <div>
          <div><h2>Mini Inventory control system</h2></div>
      
        <div className="w-[25rem] ">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="font-bold">New Order</div>
                  <Droppable>
                    <OrderList 
                              orderList={ orderList }
                              getSelectedItem={ getOrderSelectedItem }
                        />
                  
                </Droppable>
                   
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
  </DndContext>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
