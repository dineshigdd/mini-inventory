import  { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function fetchInventoryItems(){
   try{
      const items =  await db.item.findMany();
      db.$disconnect();
      return items;   
   }catch( error: unknown ){
      console.log( error );
      await db.$disconnect();
      redirect('/');
   }
   
   
}