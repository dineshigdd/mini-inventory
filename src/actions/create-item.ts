'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

// interface Item {
//     name : string;
//     category_code : string;
//     quantity_in_hand: number;
// }

export async function createItem( 
   
    formData: FormData 
){
    try{

//check the user's inputs and make sure they are valid
 const name = formData.get('item') as string;
 let category_code = formData.get('category') as string ;

 if( category_code  == 'new_category'){
     category_code = formData.get('newCategory') as string ;
 }

 const quantity_in_hand = Number( formData.get('quantity') as string );


 //create a new record in the database
 const Item = await db.inventory.create({
    data:{
        name,
        category_code,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        quantity_in_hand
    }
 })

 
 revalidatePath('/')
//  redirect('/');
}catch( err : unknown ){
    if( err instanceof Error ){
        return {
            message: err.message
        }
    }
}
}

//get innventory Items