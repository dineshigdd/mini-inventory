
'use server';

import  { db } from '@/db';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';




export async function updateInventoryItem(  
    id: number,
    orderList:Item[],
    formData: FormData){
    try{
                
        const name = formData.get('item') as string;
        const category_code = formData.get('category') as string ;
        const quantity_in_hand = Number( formData.get('quantity') as string );    

        //update the record in the Item table
        await db.item.update({
            where: { id },
            data:{
                name,
                category_code ,
                quantity_in_hand
            }
        });

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

    redirect('/')
}
