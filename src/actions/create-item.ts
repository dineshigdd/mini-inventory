'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function createItem( 
    fromState: { category_code: string },
    formData: FormData 
){
    try{

//check the user's inputs and make sure they are valid
 const name = formData.get('item') as string;
 const category_code = formData.get('category') as string;
 const quantity_in_hand = Number( formData.get('quantity') as string );


 //create a new record in the database
 const Item = await db.inventory.create({
    data:{
        name,
        category_code,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        quantity_in_hand
    }
 })

 

 redirect('/');
}catch( err : unknown ){
    if( err instanceof Error ){
        return {
            message: err.message
        }
    }
}
}

//get innventory Items