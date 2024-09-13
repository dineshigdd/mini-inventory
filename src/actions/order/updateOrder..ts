'use server'
import  { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateOrderItemQuantity(  
    id: number,
    formData: FormData){
    try{
                
        const quantity_order = Number(formData.get('quantityOrder ') as string );
       
        //update the record in the Item table
        await db.order.update({
            where: { id },
            data:{
                quantity_order
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