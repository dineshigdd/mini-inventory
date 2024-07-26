'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function createItem( formData: FormData ){

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
}

//get innventory Items