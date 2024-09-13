'use server'
import  { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function deleteInventoryItem(id: number){
   try{
      await db.item.delete({
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