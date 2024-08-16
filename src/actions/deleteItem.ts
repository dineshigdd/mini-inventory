import  { db } from '@/db';


export async function deleteInventoryItem(id: number){
   await db.item.delete({
    where:{ id }
   });
   
}