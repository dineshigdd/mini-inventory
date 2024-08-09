
'use server'

import * as actions from '@/actions/index';
import AddnewItem from '@/components/new-items-form'



export default async function ItemCreatePage(){

    // interface Items {     
    //         id: number;
    //         name: string;
    //         quantity_in_hand: number;
    //         category_code: string;
    //         date: Date;
    // }
    
    interface Category {     
            id: number,
            category_code: string;
            name: string;
            
    }

    // const fetchedInventoryItems = await actions.fetchInventoryItems();
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

    
   
    // return <div><AddnewItem inventory={ inventory }/></div>;
    return <div><AddnewItem category={ category }/></div>;
    
    
}