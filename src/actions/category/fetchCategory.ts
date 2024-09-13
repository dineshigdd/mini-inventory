import  { db } from '@/db';
import { redirect } from 'next/navigation';


export async function fetchCategory(category_code: string){
  try{
    const category = await db.category.findFirst({
      where:{ category_code }
     });       

   db.$disconnect();
   return category;
  }catch(error: unknown ){
    console.log( error );
    await db.$disconnect();
    redirect('/')
  }


}