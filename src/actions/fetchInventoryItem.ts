import  { db } from '@/db';


export async function fetchInventoryItem(id: number){
   console.log( id )
   const item = await db.item.findFirst({
    where:{ id }
   });   
 console.log(item )

 return item;
}