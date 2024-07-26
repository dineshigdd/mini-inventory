

import { fetchInventoryItems } from "@/db/queries/category";


export default async function ItemCreatePage(){
  const inventory = await fetchInventoryItems()

    return(
     <form /*action={ actions.createItem }*/ className="flex flex-col items-center justify-center min-h-screen">
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
                <select className="border rounded p-2 w-full" name="category" id="category">
                 { inventory.map( items => ( items.category_code !== 'other' ? (        
                    <optgroup key={ items.category_code } label={ items.category_code }>
                        <option key={ items.name } value={ items.name }>{ items.name }</option>                        
                    </optgroup>
                 ):(
                    <option key={ items.name } value={ items.name }>{ items.name }</option>   
                 )))}          
                                     
                </select>       
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
    
    );
}