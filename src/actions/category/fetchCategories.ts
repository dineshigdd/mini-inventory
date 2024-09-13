import  { db } from '@/db';
import { redirect } from 'next/navigation';


export async function fetchCategories(){  

   try{
      const categories = await db.category.findMany();
      await db.$disconnect();
      return categories;
     
    }catch(error: unknown ){
      console.log( error );
      await db.$disconnect();
      redirect('/')
    }
}