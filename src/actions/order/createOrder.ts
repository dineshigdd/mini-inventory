
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import  { db } from '@/db';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@prisma/client';




export async function createOrder( orderList: Order[])
    {
    try{
    
             //check the user's inputs and make sure they are valid
        // const name = formData.get('quantity') as string;
        console.log( orderList)
        // let category_code = formData.get('category') as string ;

        // if( category_code  == 'new_category'){
        //     const category = formData.get('newCategory') as string ;
            
        //     //creata a new category
        //     category_code = uuidv4();

        //     await db.category.create({
        //     data:{
        //         category_code,
        //         name:category
            
        //     }
        // })
        // }

        // const quantity_in_hand = Number( formData.get('quantity') as string );              
        // db.order.createMany({
        //     data: orderList
        // })
        
        
        // //create a new record in the Item table
        // const Order = await db.item.create({
        //     data:{
        //         name,
        //         category_code,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        //         quantity_in_hand
        //     }
        // })

        
        await db.$disconnect();
        revalidatePath('/')
    }catch( err : unknown ){
        if( err instanceof Error ){
            await db.$disconnect();
            
            return {
                message: err.message
            }
        }
      
    }
}