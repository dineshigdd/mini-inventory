
'use server'

import * as actions from '@/actions/index';
import EditItem from '@/components/editItemForm'
import { revalidatePath } from 'next/cache';

interface ItemEditProps{
    params:{
        id: string;
    }
}

interface Item{     
    id: number;
    name: string;
    quantity_in_hand: number;
    category_code: string;
    date: Date;
}

interface Category {     
    id: number,
    category_code: string;
    name: string;
    
}


export default async function ItemEditPage( props: ItemEditProps ){

    const selectedItem = await actions.fetchInventoryItem( parseInt(props.params.id )) ;
    const fetchedCategries = await actions.fetchCategories();
   
  

    // const inventory: Items[] = fetchedInventoryItems.map( ({ id, name , quantity_in_hand, category_code , date } )=>  ({
    //     id: id,
    //     name:name,
    //     quantity_in_hand: quantity_in_hand,
    //     category_code: category_code,
    //     date: date,
    // }
    // ));                                                                                                                                                                         

    const category: Category[] = fetchedCategries.map(( { id , category_code, name } )=>({
        id,
        category_code,
        name,
    }
));


 //get inventory items when loading the page
   
       
//add new category when the user select 'new category' from the category list

    
//    revalidatePath('/items/new/')
    // return <div><AddnewItem inventory={ inventory }/></div>;
    return <div><EditItem 
                    selectedItem = { selectedItem } 
                    category={ category }
                />
            </div>;
    
    
}