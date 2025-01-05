
'use server'
import { revalidatePath } from 'next/cache';
import  { db } from '@/db';
import { Order } from '@prisma/client';




export async function createOrder( orderList: Order[])
    {
    try{
    
                
        await db.order.createMany({
            data: orderList
        })
        
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