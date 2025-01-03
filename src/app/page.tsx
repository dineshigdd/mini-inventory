'use client'

import Link from "next/link";
import { useEffect, useState , useRef, useMemo } from "react";
import Inventory from "@/components/inventory";
import { Suspense } from "react";
import OrderList from "@/components/orderList";
import ItemOrderForm from "@/components/newOrderForm";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { handleMouseOver , handleMouseDown , handleMouseOut ,  Droppable  } from '@/utlltiy/index';




interface Item {
    id: number;
    name : string;
    quantity_in_hand: number;
    category_code : string;
    date:Date,
}

interface Order {
    itemId: number;
    name: string;
    quantity_order:number;
    category_code: string;  
    orderDate:Date;
}

export default  function Home() {

  const [ inventory, setInventory ] = useState<Item[]>([]);
  const [ orderList, setOrderList ] = useState<any[]>([]);
  const [quantityOrder, setQuantityOrder] = useState<number>(0);
  const listRef = useRef<(HTMLLIElement | null )[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to track the selected item
  const [selectedOrderListIndex, setSelectedIOrderListIndex] = useState<number | null>(null); // State to track the selected item
  const [ isItemselected, setIsItemselected ] = useState(false); 
  const tempList = useMemo<number[]>(() => [], []);
  const [ itemToDelete, setItemToDelete ] = useState();


  type KeyEntriesItem =   { id: string;
    quantity_in_hand: string;
    date: string;
    [key: string]: string; // Index signature
  };

  const keyMap :KeyEntriesItem = { 
    id: 'itemId', 
    quantity_in_hand: 'quantity_order', 
    date: 'orderDate'
  };

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
  console.log( "====getOrderSelectedItem==")
  console.log( itemId)
  setSelectedIOrderListIndex( itemId ) 
}


const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

        
  if (over?.id === 'droppable') {   
        const draggedItem = inventory.find(item => item.id === active.id );                 
        const storedItems = localStorage.getItem('items');        
          
    if (draggedItem) {   
      if( storedItems ){
          const storedItemsArr = JSON.parse( storedItems );
          for (let i = 0; i < storedItemsArr.length; i++) {
            if (storedItemsArr[i].itemId == draggedItem.id) {
              return; 
            }
          }
        }
        // if( tempList.length == 0 ){       
        //     tempList.push( draggedItem.id );
         
        
        // }
        // else{        
      //       let i = 0;
      //       while (i < tempList.length) {
      //         if (tempList[i] === draggedItem.id) {
      //           // if the item was found
      //           return; // Exit the loop early
      //         }
      //         i++;
      //       // }           
          
      //  }          
            
      // tempList.push(  draggedItem.id )  
      // console.log( draggedItem)

      //change keys 
      // const orderItem = Object.fromEntries(
      //   Object.entries(draggedItem).map(([key, value]) => [
      //     keyMap
      //     [key] || key, value])
      // );

      const orderItem = Object.fromEntries(
        Object.entries(draggedItem).map(([key, value]) => [keyMap[key] || key, value])
      );
      // console.log(orderItem)
      // console.log(updatedObject)
      // The code below do the same thing that two lines for code do. 
      // This code set the quantity of the orderlist itmes to zero
      // setOrderList( ( prevItems ) => [...prevItems, orderItem])

      setOrderList((prevItems) => [
        ...prevItems.map((item) =>  (item.quantity_order <= 0) ? ({ ...item,  quantity_order: 0 }):(item)
      ), 
        { ...orderItem,  quantity_order: 0 }
      ]);
      

   
      //two lines of code
      // setOrderList((prevItems) =>[...prevItems, orderItem]);             
      // setOrderList((prevOrderList) =>  prevOrderList.map((item) => ( { ...item, quantity_in_hand: 0 } )));


    } 
  } 


};

useEffect(() => {
         if( orderList.length > 0  ) {               
                  localStorage.setItem('items', JSON.stringify(orderList))
            }
                      
}, [orderList]);


useEffect(() => {  
  const storedItems = localStorage.getItem('items');   
  if( storedItems ){
    const storedItemsArr = JSON.parse( storedItems );
    setOrderList(storedItemsArr)  
  } 
},[!orderList]);


useEffect(()=> {
  if( quantityOrder < 0 ){
     setQuantityOrder( 0 )
  }
   
},[ quantityOrder ])


useEffect(()=>{
  console.log(selectedOrderListIndex)
  // saveQuatityToOrderList()
  readOrderQantityFromList()
  // setQuantityOrder( 0 )
},[selectedOrderListIndex])

//Deleting an item from the order list
// const deleteOrderItem = () => {
//   setOrderList((orderListItems) =>
//     orderListItems.filter((item, index) => item.id !== selectedOrderListIndex)
//   );
// };

const deleteOrderItem = () => {
  setOrderList((orderListItems) => {
    // Log the current length of the array


    // Check if the array has more than one item
    if (orderListItems.length > 1 ) {
      // Return the filtered array
      return orderListItems.filter((item) => item.itemId !== selectedOrderListIndex);
    }
    else{
      localStorage.clear()
      return [];
    }
    // If only one item is left, return an empty array
   
  });
};


  
  

  const saveQuatityToOrderList = () =>{
    setOrderList((prevOrderList) =>
      prevOrderList.map((item) => {
        if (item.itemId === selectedOrderListIndex) {         
          return { ...item, quantity_order: quantityOrder }; // Update quantity in hand immutably
        }
        return item; // Keep other items unchanged
      })
    );    
  }

const readOrderQantityFromList = ()=>{
  console.log( selectedOrderListIndex)
  const quantity = orderList.find( item => (item.itemId == selectedOrderListIndex ))?.quantity_order ?? 0;
  setQuantityOrder( quantity )
  console.log( "quantityOrder:" + quantityOrder)
}

//saving to orderlist  when changing the ordered quantity
useEffect(()=>{
  saveQuatityToOrderList();
},[quantityOrder])



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
                              deleteOrderItem = { deleteOrderItem }
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
                <div className="border-y-2 border-y-indigo-500 mt-2 py-2">
                  <h1><strong>Order Items Management</strong></h1><br/>
                  <div className="flex justify-between -mt-4">
                  <ul>
                  <li>
                    <label className="mx-2">Quantity in hand</label>
                    {(() => {
                     
                      const inventoryItem = inventory.find(item => item.id === Number(selectedOrderListIndex));
                  
                      return (
                        <input type="text" 
                          className="w-10 text-center rounded-sm" 
                          value= { inventoryItem ? JSON.stringify( inventoryItem.quantity_in_hand ): '0'}
                      />
                      );
                    })()}
                  </li>

                    <li>
                      {( selectedOrderListIndex !== null ) ? <ItemOrderForm 
                          orderList={ orderList }  
                          quantityOrder = { quantityOrder }
                          setQuantityOrder = { setQuantityOrder }
                          selectedOrderListIndex = { selectedOrderListIndex  }
                      
                      />:'' } 

                    </li>
                  </ul>
                     {/* <Link href={`/items/${selectedOrderListIndex}`} className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">View Item</Link>  
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Covert to Image</button>                                                            */}
                  </div>
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
