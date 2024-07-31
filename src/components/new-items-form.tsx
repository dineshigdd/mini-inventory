'use client'

import { Inventory } from "@prisma/client"
import { useEffect, useRef, useState } from "react"



interface AddnewItemProps {
    inventory: Inventory[]
    
}

export default function AddnewItem({ inventory }: AddnewItemProps){

    const [ isDisabled, setIsDisabled ] = useState( true );
    const refSelectCategory = useRef<HTMLSelectElement>(null);
    const refInputCategory = useRef<HTMLInputElement>(null);

    const getCategory = () =>{
        
        if( refSelectCategory.current?.value == 'new_category'){
                setIsDisabled (false );
        }else{
            setIsDisabled (true );
        }
    }


    // useEffect(()=>{
        
    //     // if( refSelectCategory.current?.value == 'new_category'){
    //     //         setIsDisabled (false );
    //     // }else{
    //     //     setIsDisabled (true );
    //     // }

        
    // })

    return(
        <form /*action={ formAction }*/ className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="font-bold m-3">Add a new Item</h2>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-15" htmlFor="item">Item Name</label>
                <input 
                    name="item"
                    className="border rounded p-2 w-full"
                    id="item"
                />
            </div>       

            <div className="flex gap-4">
                <label className="w-15" htmlFor="category">Category</label>
                <select onChange = { getCategory } ref={ refSelectCategory } className="border rounded p-2 w-full" name="category" id="category">
                    <option key={ 'select category'} value='new categoty'>Select Category</option> 
                 
                    { 
                        inventory.map( items =>                      
                            <option key={ items.category_code }  value={ items.category_code }>{
                                     items.category_code }                            
                            </option>                        
                    
                    )}
                 
                 <option key={ 'new category'} value='new_category'>Enter new category +</option>    
                 {
                    
                 } 
                 {/* { inventory.map( items => ( items.category_code !== 'other' ? (        
                    <optgroup key={ items.category_code } label={ items.category_code }>
                        <option key={ items.name } value={ items.name }>{ items.name }</option>                        
                    </optgroup>
                 ):(
                    <option key={ items.name } value={ items.name }>{ items.name }</option>   
                 )))}           */}
                                     
                </select>       
            </div>   
            
            <div className="flex gap-4">                
                <input 
                    name="item"
                    disabled={ isDisabled }
                    className="border rounded p-2 w-full"
                    id="item"
                    ref= { refInputCategory }
                />
            </div>  

            <div className="flex gap-4">
                <label className="w-15" htmlFor="item">Quantity</label>
                    <input 
                        name="quantity"
                        className="border rounded p-2 w-1/4"
                        id="quantity"
                    />
            </div>   

            <div className="flex gap-4 justify-end">
                <button type="submit" className="bg-lime-500 w-fit px-5 py-2 rounded-full">
                    Add Item
                </button>
            </div>
            
        </div>
    </form>
    )
}