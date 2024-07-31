
import { startTransition, useActionState, useEffect , useRef, useState } from "react";
import * as actions from '@/actions/index';
import AddnewItem from '@/components/new-items-form'


export default async function ItemCreatePage(){

//   const [ fromState, formAction ]= useActionState( actions.createItem ,  { category_code: '' });
    interface Inventory {     
            id: number;
            name: string;
            quantity_in_hand: number;
            category_code: string;
            date: Date;
        }
    
   
    const fetchInventoryItems= await actions.fetchInventoryItems();

    const inventory: Inventory[] = fetchInventoryItems.map( ({ id, name , quantity_in_hand, category_code , date } )=>  ({
        id: id,
        name:name,
        quantity_in_hand: quantity_in_hand,
        category_code: category_code,
        date: date,
    }
    ));

 //get inventory items when loading the page
   
       
//add new category when the user select 'new category' from the category list

    
   
    return <div><AddnewItem inventory={ inventory }/></div>;
    
    
}