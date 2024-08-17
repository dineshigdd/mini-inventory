import  { db } from '@/db';
import { redirect } from 'next/navigation';

export async function fetchInventoryItem(id: number){
 
   try{
      const item = await db.item.findFirst({
      where:{ id }
      });   
      await db.$disconnect();
      return item;   
   }catch(error: unknown ){
      console.log( error );
      await db.$disconnect()
      redirect('/')
   }
}


