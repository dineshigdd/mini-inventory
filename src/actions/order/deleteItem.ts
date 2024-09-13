'use server'
import  { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function deleteOrderItem(id: number){
   try{
      await db.order.delete({
      where:{ id }
      });
      await db.$disconnect();
      revalidatePath('/')
     
   }catch( error : unknown ){
      console.log( error );
      await db.$disconnect()
     
   }
   redirect('/')
}