import  { db } from '@/db';


export async function fetchInventoryItem(id: number){
 
   const item = await db.item.findFirst({
    where:{ id }
   });   


 return item;
}