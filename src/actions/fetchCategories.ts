import  { db } from '@/db';


export async function fetchCategories(){
   return  await db.category.findMany();
}