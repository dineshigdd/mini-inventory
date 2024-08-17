
'use server'

import * as actions from '@/actions/index';
import EditItem from '@/components/editItemForm'
import { revalidatePath } from 'next/cache';

interface ItemEditPageProps{
    params:{
        id: string;
    }
}

interface Category {     
    id: number,
    category_code: string;
    name: string;
    
}


export default async function ItemEditPage( props: ItemEditPageProps ){

    const selectedItem = await actions.fetchInventoryItem( parseInt(props.params.id )) ;
    const fetchedCategries = await actions.fetchCategories();
                                                                                                                                                                       

    const category: Category[] = fetchedCategries.map(( { id , category_code, name } )=>({
        id,
        category_code,
        name,
    }
));
 
    return <div><EditItem 
                    selectedItem = { selectedItem! } 
                    category={ category }
                />
            </div>;
    
    
}