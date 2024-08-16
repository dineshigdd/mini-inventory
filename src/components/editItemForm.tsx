'use client'

import {  Category , Item } from "@prisma/client"
import {  useEffect, useRef, useState  } from "react"
import { updateInventoryItem } from '@/actions'




interface EditItemPorps {
    category: Category[];
    selectedItem: Item;
}


export default function EditItem( { category, selectedItem } : EditItemPorps ) { 

    
    const refSelectCategory = useRef<HTMLSelectElement>(null);     
    // const [ selectedItemCategory, setSelectedItemCategory ] = useState<String>()
    const [inputItem, setInputItem ] = useState<string>();
    const [inputQuantity, setInputQuantity ] = useState<number>();
   
    
    // const refInputCategory = useRef<HTMLInputElement>(null);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await updateInventoryItem(selectedItem.id, formData);
    };

    useEffect(() => {       
        setInputItem(selectedItem?.name);
        setInputQuantity(selectedItem.quantity_in_hand);
      }, []);
//     useEffect(()=>{
//         const selectedCategory = category.find( category => category.category_code == selectedItem.category_code )?.name;
//         setSelectedItemCategory( selectedCategory )
//     },[])
       
//     const handleChange = () => {
//         setSelectedItemCategory(refSelectCategory.current?.value);
//   };
    /*you can also do 
    <form action={ ( formData )=>updateInventoryItem( selectedItem?.id! , formData )></form/>*/

    return(
        <form onSubmit={ handleSubmit }  className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="font-bold m-3">Edit Item</h2>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-15" htmlFor="item">Item Name</label>
                <input 
                    name="item"
                    className="border rounded p-2 w-full"
                    id="item"
                    value={ inputItem }
                    onChange={ event => setInputItem(event.target.value)}
                />
            </div>       

            <div className="flex gap-4">
                <label className="w-15" htmlFor="category">Category</label>
                <select ref={ refSelectCategory } className="border rounded p-2 w-full" name="category" id="category">
                    <option key={ 'select category'}>Select Category</option> 
            
                    { 
                        category.map( category => (  ( category.category_code == selectedItem.category_code ) ?               
                            (<option key={ category.id }  value={ category.category_code } selected>
                                { category.name }                            
                            </option>) :(
                                <option key={ category.id }  value={ category.category_code }>
                                { category.name }                            
                            </option> 
                            )                       
                        )
                    )}          
                                     
                </select>       
            </div>            
            

            <div className="flex gap-4">
                <label className="w-15" htmlFor="item">Quantity</label>
                    <input 
                        name="quantity"
                        className="border rounded p-2 w-1/4"
                        id="quantity"
                        value={ inputQuantity }                        
                        onChange={ event => setInputQuantity( Number( event.target.value ))}
                    />
            </div>   

            <div className="flex gap-4 justify-end">
                <button  type="submit" className="bg-lime-500 w-fit px-5 py-2 rounded-full">
                    Update Item
                </button>
            </div>
            
        </div>
    </form>
    )
}