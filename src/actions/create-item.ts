'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import  db from '@/db';
import { v4 as uuidv4 } from 'uuid';

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
            const category = formData.get('newCategory') as string ;
            
            //creata a new category
            category_code = uuidv4();

            await db.category.create({
            data:{
                category_code,
                name:category
            
            }
        })
        }

        const quantity_in_hand = Number( formData.get('quantity') as string );              
   
        
        
        //create a new record in the Item table
        const Item = await db.item.create({
            data:{
                name,
                category_code,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                quantity_in_hand
            }
        })

        
        await db.$disconnect();
        revalidatePath('/')
       
        }catch( err : unknown ){
            if( err instanceof Error ){
                await db.$disconnect()
                return {
                    message: err.message
                }
            }
        }

        redirect('/')
}

//get innventory Items