import { db } from '@/db';


export async function fetchInventoryItems(){
   return  await db.inventory.findMany();
}